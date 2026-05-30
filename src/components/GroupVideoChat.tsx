import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, doc, onSnapshot, setDoc, addDoc, updateDoc, getDocs, deleteDoc, query, where, getDoc } from 'firebase/firestore';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Phone } from 'lucide-react';

interface GroupVideoChatProps {
  roomId: string;
  userEmail: string;
}

const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

export const GroupVideoChat: React.FC<GroupVideoChatProps> = ({ roomId, userEmail }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{ [id: string]: MediaStream }>({});
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnections = useRef<{ [id: string]: RTCPeerConnection }>({});
  const localEmailClean = userEmail.replace(/\./g, '_');

  // We need to listen to participants in the room who are in the call
  // For simplicity, we just establish a connection with everyone who signals us

  useEffect(() => {
    return () => {
      leaveCall();
    };
  }, []);

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
      return null;
    }
  };

  const joinCall = async () => {
    setIsInCall(true);
    const stream = await startLocalStream();
    if (!stream) {
        setIsInCall(false);
        return;
    }

    // Register presence in the call
    const roomRef = doc(db, 'liveRecallSessions', roomId);
    await updateDoc(roomRef, {
        [`callParticipants.${localEmailClean}`]: true
    });

    listenForOffers(stream);
    
    // Get current call participants and create offers to them
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
        const roomData = roomSnap.data();
        const callParticipants = roomData.callParticipants || {};
        
        for (const [peerEmail, inCall] of Object.entries(callParticipants)) {
            if (inCall && peerEmail !== localEmailClean) {
                createOffer(peerEmail, stream);
            }
        }
    }
  };

  const createPeerConnection = (peerEmail: string, stream: MediaStream) => {
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnections.current[peerEmail] = peerConnection;

    // Add local stream tracks to the connection
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });

    // Listen for remote tracks
    peerConnection.ontrack = event => {
      setRemoteStreams(prev => ({
        ...prev,
        [peerEmail]: event.streams[0]
      }));
    };

    return peerConnection;
  };

  const createOffer = async (peerEmail: string, stream: MediaStream) => {
    const peerConnection = createPeerConnection(peerEmail, stream);
    
    // Signaling path: liveRecallSessions/{roomId}/signals/{localEmailClean}_{peerEmail}
    const signalDocRef = doc(db, 'liveRecallSessions', roomId, 'signals', `${localEmailClean}_${peerEmail}`);
    
    // Collect ICE candidates
    const callerCandidatesCollection = collection(signalDocRef, 'callerCandidates');
    peerConnection.onicecandidate = event => {
      if (!event.candidate) return;
      addDoc(callerCandidatesCollection, event.candidate.toJSON());
    };

    // Create offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Save offer to Firestore
    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    };
    await setDoc(signalDocRef, roomWithOffer);

    // Listen for answer
    onSnapshot(signalDocRef, (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        peerConnection.setRemoteDescription(answerDescription);
      }
    });

    // Listen for remote ICE candidates
    onSnapshot(collection(signalDocRef, 'calleeCandidates'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.addIceCandidate(candidate);
        }
      });
    });
  };

  const listenForOffers = (stream: MediaStream) => {
    // Listen for signaling docs where we are the receiver: peerEmail_{localEmailClean}
    // Since we can't do a simple wildcard in document ID easily, we listen to the whole 'signals' subcollection
    const signalsRef = collection(db, 'liveRecallSessions', roomId, 'signals');
    
    onSnapshot(signalsRef, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added' || change.type === 'modified') {
           const id = change.doc.id;
           if (id.endsWith(`_${localEmailClean}`)) {
               const data = change.doc.data();
               const peerEmail = id.split('_')[0];
               
               if (data.offer && !data.answer) {
                   // Received an offer, create an answer
                   await answerOffer(peerEmail, change.doc.ref, data.offer, stream);
               }
           }
        }
      });
    });
  };

  const answerOffer = async (peerEmail: string, signalDocRef: any, offerData: any, stream: MediaStream) => {
    if (peerConnections.current[peerEmail]) {
        // We already have a connection
        return;
    }

    const peerConnection = createPeerConnection(peerEmail, stream);
    
    // Collect ICE candidates
    const calleeCandidatesCollection = collection(signalDocRef, 'calleeCandidates');
    peerConnection.onicecandidate = event => {
      if (!event.candidate) return;
      addDoc(calleeCandidatesCollection, event.candidate.toJSON());
    };

    // Set remote description
    const offerDescription = new RTCSessionDescription(offerData);
    await peerConnection.setRemoteDescription(offerDescription);

    // Create answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Save answer to Firestore
    const answerInfo = {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    };
    await updateDoc(signalDocRef, answerInfo);

    // Listen for remote ICE candidates
    onSnapshot(collection(signalDocRef, 'callerCandidates'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.addIceCandidate(candidate);
        }
      });
    });
  };

  const leaveCall = async () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    (Object.values(peerConnections.current) as RTCPeerConnection[]).forEach(pc => pc.close());
    peerConnections.current = {};
    setLocalStream(null);
    setRemoteStreams({});
    setIsInCall(false);

    try {
      const roomRef = doc(db, 'liveRecallSessions', roomId);
      await updateDoc(roomRef, {
          [`callParticipants.${localEmailClean}`]: null
      });
    } catch (e) {
      // Ignored
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4.5 shadow-sm space-y-3.5 mt-6">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <span className="text-[10px] uppercase font-black tracking-wider text-pine font-mono block">
          WebRTC Video Room
        </span>
        {!isInCall ? (
            <button onClick={joinCall} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition">
                <Video className="w-3.5 h-3.5" />
                Join Call
            </button>
        ) : (
            <div className="flex items-center gap-2">
                <button onClick={toggleAudio} className={`p-1.5 rounded-lg transition ${isAudioEnabled ? 'bg-pine-light/20 text-pine' : 'bg-rose-100 text-rose-600'}`}>
                    {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button onClick={toggleVideo} className={`p-1.5 rounded-lg transition ${isVideoEnabled ? 'bg-pine-light/20 text-pine' : 'bg-rose-100 text-rose-600'}`}>
                    {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
                <button onClick={leaveCall} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition ml-2">
                    <PhoneOff className="w-3.5 h-3.5" />
                    Leave Call
                </button>
            </div>
        )}
      </div>

      {isInCall && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* Local Video */}
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-200">
                    <video 
                        ref={localVideoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className={`w-full h-full object-cover ${!isVideoEnabled ? 'opacity-0' : ''}`}
                    />
                    {!isVideoEnabled && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <VideoOff className="w-8 h-8" />
                        </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono font-bold">
                        You {isAudioEnabled ? '' : '(Muted)'}
                    </div>
                </div>

                {/* Remote Videos */}
                {Object.entries(remoteStreams).map(([peerEmail, stream]) => (
                    <RemoteVideo key={peerEmail} peerEmail={peerEmail} stream={stream} />
                ))}
            </div>
      )}
    </div>
  );
};

const RemoteVideo: React.FC<{ peerEmail: string, stream: MediaStream }> = ({ peerEmail, stream }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-200">
            <video 
                ref={ref} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono font-bold truncate max-w-[90%]">
                {peerEmail.split('_')[0]}
            </div>
        </div>
    );
};

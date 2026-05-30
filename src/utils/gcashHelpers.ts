import { db, firestoreWithTimeout } from '../firebase';
import { collection, doc, setDoc, getDocs, getDoc, query, where, updateDoc } from 'firebase/firestore';
import { GCashPaymentRequest, UserProfile } from '../types';

const LOCAL_KEY = 'bp_gcash_requests';

// Get fallback requests from localStorage
function getLocalRequests(): GCashPaymentRequest[] {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Save requests to localStorage
function saveLocalRequests(reqs: GCashPaymentRequest[]) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(reqs));
  } catch (err) {
    console.warn('Failed to save payment requests locally:', err);
  }
}

// Submit GCash request
export async function submitGCashRequest(req: GCashPaymentRequest): Promise<void> {
  // Always log to local storage first for offline resilience
  const local = getLocalRequests();
  // Filter out any older records with same id
  const filtered = local.filter(r => r.id !== req.id);
  filtered.unshift(req);
  saveLocalRequests(filtered);

  // Sync to FirebaseFirestore if available
  try {
    const docRef = doc(db, 'gcash_requests', req.id);
    await setDoc(docRef, req);
  } catch (err) {
    console.warn('Firebase Firestore save bypassed for payments request (offline/fallback mode):', err);
  }
}

// Get requests for a specific reviewee/user email
export async function getGCashRequestsForUser(email: string): Promise<GCashPaymentRequest[]> {
  const normEmail = email.trim().toLowerCase();
  
  // Try Firebase Firestore first
  try {
    const q = query(collection(db, 'gcash_requests'), where('email', '==', normEmail));
    const snapshot = await firestoreWithTimeout(getDocs(q));
    if (!snapshot.empty) {
      const fbReqs: GCashPaymentRequest[] = [];
      snapshot.forEach(doc => {
        fbReqs.push(doc.data() as GCashPaymentRequest);
      });
      // Merge with local just in case
      const local = getLocalRequests().filter(r => r.email === normEmail);
      const combined = [...fbReqs];
      // Add local items not in combined
      local.forEach(l => {
        if (!combined.some(c => c.id === l.id)) {
          combined.push(l);
        }
      });
      return combined.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    }
  } catch (err) {
    console.warn('Could not query Firestore for GCash requests (offline mood):', err);
  }

  // Local storage fallback
  return getLocalRequests()
    .filter(r => r.email === normEmail)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

// Get all requests (for administrator)
export async function getAllGCashRequests(): Promise<GCashPaymentRequest[]> {
  try {
    const snapshot = await firestoreWithTimeout(getDocs(collection(db, 'gcash_requests')));
    if (!snapshot.empty) {
      const fbReqs: GCashPaymentRequest[] = [];
      snapshot.forEach(doc => {
        fbReqs.push(doc.data() as GCashPaymentRequest);
      });
      // Merge with local list to ensure all are visible
      const local = getLocalRequests();
      const combined = [...fbReqs];
      local.forEach(l => {
        if (!combined.some(c => c.id === l.id)) {
          combined.push(l);
        }
      });
      return combined.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    }
  } catch (err) {
    console.warn('Could not list GCash requests from Firestore (offline mode):', err);
  }

  return getLocalRequests().sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

// Approve GCash request
export async function approveGCashRequest(requestId: string): Promise<void> {
  // Update local storage requests
  const local = getLocalRequests();
  const reqIndex = local.findIndex(r => r.id === requestId);
  let updatedReq: GCashPaymentRequest | null = null;
  
  if (reqIndex !== -1) {
    local[reqIndex].status = 'approved';
    updatedReq = local[reqIndex];
    saveLocalRequests(local);
  }

  // Update in Firestore
  try {
    const docRef = doc(db, 'gcash_requests', requestId);
    if (!updatedReq) {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        updatedReq = snap.data() as GCashPaymentRequest;
        updatedReq.status = 'approved';
      }
    }
    if (updatedReq) {
      await setDoc(docRef, updatedReq);
    }
  } catch (err) {
    console.warn('Could not update Firestore for request approval:', err);
  }

  // Apply premium tier immediately to the target profile
  if (updatedReq) {
    const targetEmail = updatedReq.email.trim().toLowerCase();
    const targetTier = updatedReq.requestedTier;

    // Update in local profiles
    try {
      const savedProfile = localStorage.getItem(`bp_profile_${targetEmail}`);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        parsed.tier = targetTier;
        localStorage.setItem(`bp_profile_${targetEmail}`, JSON.stringify(parsed));
      }
    } catch (profileErr) {
      console.warn('Failed to apply tier in local storage profile:', profileErr);
    }

    // Update in Firestore profile
    try {
      const profileRef = doc(db, 'profiles', targetEmail);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        const profileData = profileSnap.data();
        profileData.tier = targetTier;
        await setDoc(profileRef, profileData);
      }
    } catch (fbProfileErr) {
      console.warn('Failed to apply tier in Firestore profile:', fbProfileErr);
    }
  }
}

// Reject GCash request
export async function rejectGCashRequest(requestId: string, reason: string): Promise<void> {
  const local = getLocalRequests();
  const reqIndex = local.findIndex(r => r.id === requestId);
  let updatedReq: GCashPaymentRequest | null = null;

  if (reqIndex !== -1) {
    local[reqIndex].status = 'rejected';
    local[reqIndex].rejectionReason = reason;
    updatedReq = local[reqIndex];
    saveLocalRequests(local);
  }

  // Update in Firestore
  try {
    const docRef = doc(db, 'gcash_requests', requestId);
    if (!updatedReq) {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        updatedReq = snap.data() as GCashPaymentRequest;
        updatedReq.status = 'rejected';
        updatedReq.rejectionReason = reason;
      }
    }
    if (updatedReq) {
      await setDoc(docRef, updatedReq);
    }
  } catch (err) {
    console.warn('Could not update Firestore for request rejection:', err);
  }
}

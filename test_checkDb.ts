import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAmmBwTiJ7mWIRGoD9nf8It842TLKgldGA",
  authDomain: "esoteric-iris-nsjh2.firebaseapp.com",
  projectId: "esoteric-iris-nsjh2",
  storageBucket: "esoteric-iris-nsjh2.firebasestorage.app",
  messagingSenderId: "659927092551",
  appId: "1:659927092551:web:514d4e8af548659380d062"
};

async function checkDbObj(dbInstance: any, name: string) {
    try {
      await getDocFromServer(doc(dbInstance, 'test', 'connection'));
      return name;
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (
        msg.includes('permission') || 
        msg.includes('Permission') || 
        msg.includes('rules') || 
        msg.includes('unauthenticated')
      ) {
        return name;
      }
      throw err;
    }
}

async function run() {
  const app = initializeApp(config);
  const db = getFirestore(app, "ai-studio-2c81636e-4a85-4f3b-a1e6-55a76cd78a3f");

  try {
     console.log("Checking customDb...");
     const r1 = await checkDbObj(db, 'custom');
     console.log("CustomDB result:", r1);
  } catch (err: any) {
     console.log("CustomDB error:", err);
  }
}
run();

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAmmBwTiJ7mWIRGoD9nf8It842TLKgldGA",
  authDomain: "esoteric-iris-nsjh2.firebaseapp.com",
  projectId: "esoteric-iris-nsjh2",
  storageBucket: "esoteric-iris-nsjh2.firebasestorage.app",
  messagingSenderId: "659927092551",
  appId: "1:659927092551:web:514d4e8af548659380d062"
};

async function run() {
  const app = initializeApp(config);
  const defaultDb = getFirestore(app);
  const customDb = getFirestore(app, "ai-studio-2c81636e-4a85-4f3b-a1e6-55a76cd78a3f");

  try {
      console.log('Testing custom DB setDoc');
      await setDoc(doc(customDb, 'test', 'timeout-check'), { a: 1 });
      console.log('custom DB setDoc ok');
  } catch(e) {
      console.error('custom DB error', e);
  }

  try {
      console.log('Testing default DB setDoc');
      await setDoc(doc(defaultDb, 'test', 'timeout-check'), { a: 1 });
      console.log('default DB setDoc ok');
  } catch(e) {
      console.error('default DB error', e);
  }
  process.exit(0);
}
run();

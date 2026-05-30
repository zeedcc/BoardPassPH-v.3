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
  const realDb = getFirestore(app, "ai-studio-2c81636e-4a85-4f3b-a1e6-55a76cd78a3f");
  const dbProxy = new Proxy(realDb, {
     get(target, prop, receiver) {
        return Reflect.get(realDb, prop, receiver);
     }
  });

  try {
     const ref = doc(dbProxy as any, "test", "proxy");
     console.log('Doc ref ok', ref.path);
     await setDoc(ref, { a: 1 });
     console.log('setDoc ok');
  } catch (e: any) {
     console.log('setDoc error:', e.message);
  }
  process.exit(0);
}
run();

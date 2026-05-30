import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAmmBwTiJ7mWIRGoD9nf8It842TLKgldGA",
  authDomain: "esoteric-iris-nsjh2.firebaseapp.com",
  projectId: "esoteric-iris-nsjh2",
  storageBucket: "esoteric-iris-nsjh2.firebasestorage.app",
  messagingSenderId: "659927092551",
  appId: "1:659927092551:web:514d4e8af548659380d062"
};

async function testQuery(db: any, colName: string): Promise<number | string> {
  return new Promise(async (resolve, reject) => {
    try {
      const timer = setTimeout(() => reject('timeout'), 5000);
      const snapshot = await getDocs(collection(db, colName));
      clearTimeout(timer);
      resolve(snapshot.size);
    } catch(e: any) {
      reject(e);
    }
  });
}

async function run() {
  const app = initializeApp(config);
  
  const dbs = [
      { name: 'default', db: getFirestore(app) },
      { name: 'boardpass', db: getFirestore(app, "boardpass") },
      { name: 'ai-studio', db: getFirestore(app, "ai-studio-2c81636e-4a85-4f3b-a1e6-55a76cd78a3f") },
      { name: 'esoteric-iris-nsjh2', db: getFirestore(app, "esoteric-iris-nsjh2") }
  ];

  for (const {name, db} of dbs) {
      console.log(`\nTesting DB instance: ${name}`);
      for (const col of ['profiles']) {
         try {
           const res = await testQuery(db, col);
           console.log(`  ${col} size:`, res);
         } catch (e: any) {
           console.log(`  ${col} error:`, e?.message || e);
         }
      }
  }
  process.exit(0);
}
run();

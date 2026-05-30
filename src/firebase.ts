import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInAnonymously,
} from 'firebase/auth';
import { doc, getDocFromServer, Firestore, initializeFirestore } from 'firebase/firestore';

import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

const customDb = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, (firebaseConfig as any).firestoreDatabaseId || undefined);

const defaultDb = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

let activeDb = customDb;

export const db = new Proxy(customDb, {
  get(target, prop, receiver) {
    return Reflect.get(activeDb, prop, receiver);
  },
  set(target, prop, value, receiver) {
    return Reflect.set(activeDb, prop, value, receiver);
  }
}) as Firestore;

export const auth = getAuth();

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
};

export const firebaseStatus = {
  authAnonymousDisabled: false,
  authOperationNotAllowed: false,
  firestoreDatabaseMissing: false,
  errorMessage: ''
};

export function initializeFirebase() {
  signInAnonymously(auth).catch((err) => {
    const msg = err instanceof Error ? err.message : String(err);
    firebaseStatus.authAnonymousDisabled = msg.includes('auth/admin-restricted-operation') || msg.includes('admin-restricted-operation');
    firebaseStatus.authOperationNotAllowed = msg.includes('auth/operation-not-allowed') || msg.includes('operation-not-allowed');
    firebaseStatus.errorMessage = msg;
    if (firebaseStatus.authOperationNotAllowed) {
      console.error('Firebase Auth anonymous login failed: operation-not-allowed. Enable Anonymous sign-in in the Firebase Console (Authentication → Sign-in method).', err);
    } else {
      console.warn('Firebase Auth anonymous login failed:', err);
    }
  });

  testConnection();
}

async function testConnection() {
  if (typeof window !== 'undefined' && window.sessionStorage?.getItem('bp_firestore_connected')) {
    const savedId = window.sessionStorage.getItem('bp_firestore_connected_id');
    if (savedId === 'default') {
      activeDb = defaultDb;
    } else {
      activeDb = customDb;
    }
    return;
  }

  console.log("Testing Firestore database connection discovery...");

  const checkDbObj = async (dbInstance: Firestore, name: string) => {
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
  };

  try {
    const winnerName = await Promise.race([
      checkDbObj(customDb, 'custom'),
      checkDbObj(defaultDb, 'default'),
      new Promise<string>((_, reject) => setTimeout(() => reject(new Error('Discovery timed out')), 2500))
    ]);

    if (winnerName === 'default') {
      activeDb = defaultDb;
      console.log("Dynamically fall back to '(default)' database container.");
    } else {
      activeDb = customDb;
      console.log(`Successfully connected to custom database: ${(firebaseConfig as any).firestoreDatabaseId}`);
    }

    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('bp_firestore_connected', 'true');
      window.sessionStorage.setItem('bp_firestore_connected_id', winnerName);
    }
  } catch (err: any) {
    // Sequentially try custom, then fallback to default
    try {
      await checkDbObj(customDb, 'custom');
      activeDb = customDb;
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('bp_firestore_connected', 'true');
        window.sessionStorage.setItem('bp_firestore_connected_id', 'custom');
      }
    } catch {
      try {
        await checkDbObj(defaultDb, 'default');
        activeDb = defaultDb;
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('bp_firestore_connected', 'true');
          window.sessionStorage.setItem('bp_firestore_connected_id', 'default');
        }
      } catch (finalErr: any) {
        const msg = finalErr?.message || String(finalErr);
        console.error("All database connections failed, defaulting to default instance:", msg);
        activeDb = defaultDb;
        firebaseStatus.errorMessage = msg;
      }
    }
  }
}

export async function firestoreWithTimeout<T>(operation: Promise<T>, timeoutMs = 12000): Promise<T> {
  return Promise.race([
    operation,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error(`Firestore operation timed out after ${timeoutMs}ms`)), timeoutMs))
  ]) as Promise<T>;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

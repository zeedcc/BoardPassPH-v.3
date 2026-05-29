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
import { getFirestore, doc, getDocFromServer, Firestore } from 'firebase/firestore';

import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

const customDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const defaultDb = getFirestore(app);

export let db: Firestore = customDb;

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
  // Prevent redundant connection tests during active session
  if (typeof window !== 'undefined' && window.sessionStorage?.getItem('bp_firestore_connected')) {
    const savedId = window.sessionStorage.getItem('bp_firestore_connected_id');
    if (savedId === 'default') {
      db = defaultDb;
    } else if (savedId === 'custom') {
      db = customDb;
    }
    return;
  }

  console.log("Starting Firestore database discovery testing...");

  const testDb = async (dbInstance: Firestore, name: string) => {
    try {
      await getDocFromServer(doc(dbInstance, 'test', 'connection'));
      return name;
    } catch (err: any) {
      const msg = err?.message || '';
      // If it's permission-denied or standard validation rule rejection, the DB exists and is responsive!
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

  const testCustom = testDb(customDb, 'custom')
    .then(() => {
      console.log(`Successfully reached custom database: ${firebaseConfig.firestoreDatabaseId}`);
      db = customDb;
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('bp_firestore_connected', 'true');
        window.sessionStorage.setItem('bp_firestore_connected_id', 'custom');
      }
      return 'custom';
    });

  const testDefault = testDb(defaultDb, 'default')
    .then(() => {
      console.log("Successfully reached default '(default)' database.");
      db = defaultDb;
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('bp_firestore_connected', 'true');
        window.sessionStorage.setItem('bp_firestore_connected_id', 'default');
      }
      return 'default';
    });

  try {
    // Race them. If one succeeds fast, select it.
    await Promise.race([
      testCustom,
      testDefault,
      new Promise<string>((_, reject) => setTimeout(() => reject(new Error('Discovery timed out')), 2500))
    ]);
  } catch (err) {
    // If racing timed out or failed, check sequential fallback:
    try {
      await testCustom;
    } catch {
      try {
        await testDefault;
      } catch (finalError: any) {
        const msg = finalError?.message || String(finalError);
        firebaseStatus.errorMessage = msg;
        console.error("All Firestore database connection attempts failed:", finalError);
        // Default back to custom as final fallback
        db = customDb;
      }
    }
  }
}

export async function firestoreWithTimeout<T>(operation: Promise<T>, timeoutMs = 4000): Promise<T> {
  return Promise.race([
    operation,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Firestore operation timed out')), timeoutMs))
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

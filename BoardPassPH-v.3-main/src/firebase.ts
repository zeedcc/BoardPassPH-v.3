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
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
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
  try {
    // Prevent redundant connection tests during active session
    if (typeof window !== 'undefined' && window.sessionStorage?.getItem('bp_firestore_connected')) {
      return;
    }
    await getDocFromServer(doc(db, 'test', 'connection'));
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('bp_firestore_connected', 'true');
    }
  } catch (error) {
    if (error instanceof Error) {
      const msg = error.message;
      firebaseStatus.errorMessage = msg;
      if (msg.includes("Database '(default)' not found")) {
        firebaseStatus.firestoreDatabaseMissing = true;
        console.error('Firestore default database not found. Please create a Firestore database in your Firebase project.');
      } else if (msg.includes('the client is offline')) {
        console.error('Please check your Firebase configuration or network status.');
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

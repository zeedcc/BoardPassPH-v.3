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



export const db = customDb;

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

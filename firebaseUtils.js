// Use these methods where you handle login/signup
import { app, auth, firestore } from './firebaseConfig';
import firebase from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Email/Password Sign-Up
export const signUpWithEmailPassword = async (auth, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// Email/Password Sign-In
export const signInWithEmailPassword = async (auth, email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// Google Sign-In
export const signInWithGoogle = async (auth) => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
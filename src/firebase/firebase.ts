import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, firebaseAdminConfig } from '~/config';

export const firebase = initializeApp(firebaseConfig);

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminConfig),
});

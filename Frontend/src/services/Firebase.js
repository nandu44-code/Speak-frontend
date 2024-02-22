// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBfVG2X29o8CvFuRNE3SLPMiyviwqHexMo",
  authDomain: "speak-b1e37.firebaseapp.com",
  projectId: "speak-b1e37",
  storageBucket: "speak-b1e37.appspot.com",
  messagingSenderId: "182169446971",
  appId: "1:182169446971:web:789a1bee37d13c4a4f4a1e",
  measurementId: "G-ERB6LMMKH9"
};

export const app = initializeApp(firebaseConfig);
export const firebasestore = getStorage(app)
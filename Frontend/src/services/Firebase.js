// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC91wbrD4FYkxYn41JUlkfkxLVvHtu1LeY",
  authDomain: "speakfiles-37868.firebaseapp.com",
  projectId: "speakfiles-37868",
  storageBucket: "speakfiles-37868.appspot.com",
  messagingSenderId: "10688100205",
  appId: "1:10688100205:web:33c79f96f0d2ff8d590c64",
  measurementId: "G-R8NQSC01QM"
};

export const app = initializeApp(firebaseConfig);
export const firebaseStore = getStorage(app)
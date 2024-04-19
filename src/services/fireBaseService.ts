import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "@/config/firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const onAuthChange = (callback: any) => {
  return onAuthStateChanged(auth, callback);
};

export const fireBaseLogout = () => {
  return signOut(auth);
};

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  console.log("user google sign in: ");
  console.log(result.user);
  const responseObject = {
    token: await result.user.getIdToken(),
    userId: result.user.uid,
    userName: result.user.displayName,
    userEmail: result.user.email,
  }

  return responseObject;
};


export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log("user facebook sign in: ");
  console.log(result.user);
  const responseObject = {
    token: await result.user.getIdToken(),
    userId: result.user.uid,
    userName: result.user.displayName,
    userEmail: result.user.email,
  }

  return responseObject;
}

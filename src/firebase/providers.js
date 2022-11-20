import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleAuthProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleAuthProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            success: true,
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            success: false,
            errorMessage,
        };
    }
};

export const registerWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = res.user;

        await updateProfile(FirebaseAuth.currentUser, { displayName, })

        return {
            success: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {
        return {
            success: false,
            errorMessage: error.message
        }
    }
}

export const singInWithEmailPassword = async ({ email, password }) => {

    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = result.user;
        return {
            success: true,
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        const errorMessage = error.message;
        return { success: false, errorMessage }
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}

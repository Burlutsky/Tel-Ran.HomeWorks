import {
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import type {LoginData} from "../utils/app-types.ts";
import {auth} from "../configurations/firebase-config.ts";


const loginWithEmail = async (data: LoginData) => {
    const result = await signInWithEmailAndPassword(auth, data.login, data.password);
    const user = result.user;
    return user.displayName !== '' ? user.displayName : user.email;
}
const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user.displayName !== '' ? user.displayName : user.email;
}
export const login = async (data?: LoginData) => {
    return data ? await loginWithEmail(data) : await loginWithGoogle();
}
export const logout = async () => {
    await signOut(auth);
}

export const registerWithEmailPass = async (data: LoginData) => {
    const result = await createUserWithEmailAndPassword(auth, data.login, data.password);
    const user = result.user;
    await setProfileData(data);
    return user.displayName !== '' ? user.displayName : user.email;
}

export const setProfileData = async (data: LoginData) => {
    if (auth.currentUser) {
        updateProfile(auth.currentUser, {
            displayName: data.name + " " + data.lastName
        }).then(() => {
            console.log('Profile updated!', data);
        }).catch((error) => {
            console.error("", error);
        })
    }
}

export const getProfileData = async () => {
    const user = auth.currentUser;

    return user !== null? user.providerData : null;
}
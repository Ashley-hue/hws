import { getAuth } from "firebase/auth";

export const isUserLoggedIn = () => {
    const auth = getAuth();
    return auth.currentUser !== null;
};
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthWrapper = ({ children }) => {
    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in:", user);
            }
            else {
                console.log("User is signed out.");
            }
        });

        const handleBeforeUnload = () => {
            signOut(auth).catch((error) => {
                console.error("Error signing out: ", error);
            });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            unsubscribe();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])
  return <>{children}</>;
}

export default AuthWrapper

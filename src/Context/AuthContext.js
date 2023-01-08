import { GoogleAuthProvider, signInWithPopup, getAuth, FacebookAuthProvider } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.js";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
   
    const [isLogIn, setIsLogIn] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading]  = useState(true)
    const [watchlist, setWatchList] = useState([])

    console.log(currentUser);

    // Watchlist
    useEffect(() => {
        if (currentUser) {
            const movieRef = doc(db, "watchlist", currentUser.uid);

            var unsubcribe = onSnapshot(movieRef, movie => {
                if (movie.exists()) {
                    console.log(movie.data().movie);
                    setWatchList(movie.data().movie);
                } else {
                    console.log("No movies");
                }
            })

            return () => {
                unsubcribe()
            }
        };    
    }, [currentUser])

    // Auth module to sign in a user
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // Auth module to log in a user
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        auth.signInWithPopup(provider)
    }

    function signInWithFacebook() {
        const provider = new FacebookAuthProvider();
        auth.signInWithPopup(provider)
    }

    useEffect(() => {
        const unsubcriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubcriber
    }, [])
    

    const value = {
        currentUser,
        signup,
        signInWithGoogle,
        signInWithFacebook,
        login,
        logout,
        watchlist
    }

    return ( 
        <AuthContext.Provider value={value}>
            {/* Chi render khi loading = false */}
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
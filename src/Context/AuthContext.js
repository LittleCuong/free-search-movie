import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
   
    const [isLogIn, setIsLogIn] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading]  = useState(true)

    // Auth module to sign in a user
    function signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
    }

    // Auth module to log in a user
    function login(email, password) {
        auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubcriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            console.log(user);
            setLoading(false)
        })

        return unsubcriber
    }, [])
    

    const value = {
        currentUser,
        signup,
        login,
    }

    return ( 
        <AuthContext.Provider value={value}>
            {/* Chi render khi loading = false */}
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
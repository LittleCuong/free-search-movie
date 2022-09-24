import { useAuth } from "~/Context/AuthContext";
import { Navigate } from "react-router-dom";

function Private({ children }) {
    const { currentUser } = useAuth()
    
    return currentUser ? children : <Navigate to='/login' />
}

export default Private;
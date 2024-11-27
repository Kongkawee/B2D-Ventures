import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { SIGN_IN_PATH, NOT_AUTH_PATH, ROLE } from "../constants";

function BusinessOnlyRoute({ children }) {
    const role = localStorage.getItem(ROLE);

    if (!role) {
        return <Navigate to={SIGN_IN_PATH} />;
    }


    // Check if the role is 'business'
    return role === 'business' ? children : <Navigate to={NOT_AUTH_PATH} />;
}

export default BusinessOnlyRoute;

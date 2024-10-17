import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ROLE } from "../constants";

function BusinessOnlyRoute({ children }) {
    const role = localStorage.getItem(ROLE);

    if (!role) {
        return <Navigate to="/sin" />;
    }


    // Check if the role is 'business'
    return role === 'business' ? children : <Navigate to="/not-authorized" />;
}

export default BusinessOnlyRoute;

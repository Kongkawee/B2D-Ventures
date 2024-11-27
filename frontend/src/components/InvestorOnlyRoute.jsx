import { Navigate } from "react-router-dom";
import { SIGN_IN_PATH, NOT_AUTH_PATH, ROLE } from "../constants";

function InvestorOnlyRoute({ children }) {
    const role = localStorage.getItem(ROLE);

    if (!role) {
        return <Navigate to={SIGN_IN_PATH} />;
    }


    // Check if the role is 'investor'
    return role === 'investor' ? children : <Navigate to={NOT_AUTH_PATH} />;
}

export default InvestorOnlyRoute;

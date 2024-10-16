import { Navigate } from "react-router-dom";
import { ROLE } from "../constants";

function InvestorOnlyRoute({ children }) {
    const role = localStorage.getItem(ROLE);

    if (!role) {
        return <Navigate to="/sin" />;
    }


    // Check if the role is 'investor'
    return role === 'investor' ? children : <Navigate to="/not-authorized" />;
}

export default InvestorOnlyRoute;

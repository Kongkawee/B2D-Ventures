import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home-page/Home";
import NotFound from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/sign-up-page/SignUp";
import SignIn from "./pages/sign-in-page/SignIn";
import Checkout from "./pages/checkout-page/Checkout";
import BusinessInfo from "./pages/business-info-page/Business";
import BusinessRegistration from "./pages/business-registration-page/BusinessRegistration";
import BusinessExplorationPage from "./pages/business-exploration-page/BusinessExploration";
import InvestorProfile from "./pages/profile-portfolio-investor-page/InvestorProfile";
import BusinessProfile from "./pages/profile-portfolio-business-page/BusinessProfile";
import NotAuthorized from "./pages/NotAuthorizedPage";
import InvestorOnlyRoute from "./components/InvestorOnlyRoute";
import BusinessOnlyRoute from "./components/BusinessOnlyRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/sin" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <SignUp />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />{" Home Page "}
        <Route path="/sin" element={<SignIn />} />{" Investor and Business Sign in page "}
        <Route path="/logout" element={<Logout />} />
        <Route path="/sup" element={<RegisterAndLogout />} />{" Investor Sign up Page "}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />{" Checkout Page "}
        
        <Route path="/bus/:id" element={<BusinessInfo />} />{" Business information Page "}
        <Route path="/bus-reg" element={<BusinessRegistration />} />{" Business Registration Page "}
        <Route path="/explore" element={<BusinessExplorationPage />} />{" Business Exploration Page "}
        <Route
          path="/inv-pro"
          element={
            <ProtectedRoute>
              <InvestorOnlyRoute>
                <InvestorProfile />
              </InvestorOnlyRoute>
            </ProtectedRoute>
          }
        />{" Investor Profile Page "}

        {/* <Route path="/inv-por" element={<ProtectedRoute><BusinessExplorationPage /></ProtectedRoute>} /> Investor Portfolio Page */}

        <Route
          path="/bus-pro"
          element={
            <ProtectedRoute>
              <BusinessOnlyRoute>
                <BusinessProfile />
              </BusinessOnlyRoute>
            </ProtectedRoute>
          }
        />{" Business Profile Page "}
        
        {/* <Route path="/bus-por" element={<ProtectedRoute><BusinessExplorationPage /></ProtectedRoute>} /> Business Portfolio Page */}
        <Route path="/not-authorized" element={<NotAuthorized />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

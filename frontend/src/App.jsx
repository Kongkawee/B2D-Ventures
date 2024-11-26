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
import RequestResetPasswordPage from "./pages/reset-password-page/RequestResetPassword";
import ResetPasswordPage from "./pages/reset-password-page/ResetPassword";
import { BUSINESS_PROFILE_PATH, BUSINESS_REGISTER_PATH, EXPLORATION_PAGE_PATH, HOME_PATH, INVESTOR_PROFILE_PATH, SIGN_IN_PATH, INVESTOR_SIGN_UP_PATH, LOG_OUT_PATH, NOT_AUTH_PATH, NOT_FOUND_PATH } from "./constants";

function Logout() {
  localStorage.clear();
  return <Navigate to={SIGN_IN_PATH} />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <SignUp />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PATH} element={<HomePage />} />
        {" Home Page "}
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        {" Investor and Business Sign in page "}
        <Route path={LOG_OUT_PATH} element={<Logout />} />
        <Route path={INVESTOR_SIGN_UP_PATH} element={<RegisterAndLogout />} />
        {" Investor Sign up Page "}
        <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute>
              <InvestorOnlyRoute>
                <Checkout />
              </InvestorOnlyRoute>
            </ProtectedRoute>
          }
        />
        {" Checkout Page "}

        <Route path="/bus/:id" element={<BusinessInfo />} />
        {" Business information Page "}
        <Route path={BUSINESS_REGISTER_PATH} element={<BusinessRegistration />} />
        {" Business Registration Page "}
        <Route path={EXPLORATION_PAGE_PATH} element={<BusinessExplorationPage />} />
        {" Business Exploration Page "}
        <Route
          path={INVESTOR_PROFILE_PATH}
          element={
            <ProtectedRoute>
              <InvestorOnlyRoute>
                <InvestorProfile />
              </InvestorOnlyRoute>
            </ProtectedRoute>
          }
        />
        {" Investor Profile Page "}

        <Route
          path={BUSINESS_PROFILE_PATH}
          element={
            <ProtectedRoute>
              <BusinessOnlyRoute>
                <BusinessProfile />
              </BusinessOnlyRoute>
            </ProtectedRoute>
          }
        />
        {" Business Profile Page "}

        <Route path="/request" element={<RequestResetPasswordPage />} />
        <Route path="/resetpass" element={<ResetPasswordPage />} />

        <Route path={NOT_AUTH_PATH} element={<NotAuthorized />}></Route>
        <Route path={NOT_FOUND_PATH} element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

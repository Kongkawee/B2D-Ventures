import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/home-page/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import SignUp from "./pages/sign-up-page/SignUp"
import SignInSide from "./pages/sign-in-page/SignInSide"
import Checkout from "./pages/checkout-page/Checkout"
import BusinessInfo from "./pages/business-info-page/Business"
import BusinessRegistration from "./pages/business-registration-page/BusinessRegistration"
import BusinessExplorationPage from "./pages/business-exploration-page/BusinessExploration"
import InvestorProfile from "./pages/profile-portfolio-investor-page/InvestorProfile"
// import BusinessProfile from "./pages/profile-portfolio-business-page/BusinessProfile"

function Logout() {
  localStorage.clear()
  return <Navigate to="/sin" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <SignUp />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/sin" element={<SignInSide />} /> Sign in page
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/sup" element={<RegisterAndLogout />} /> Sign up Page
        <Route path="/checkout" element={<Checkout/>} /> Checkout
        <Route path="/bus" element={<BusinessInfo />} /> Business info Page
        <Route path="/bus-reg" element={<BusinessRegistration />} /> Business Registration Page
        <Route path="/explore" element={<BusinessExplorationPage />} /> Business exploration Page
        <Route path="/inv-pro" element={<InvestorProfile />} /> Investor Profile Page
        {/* <Route path="/inv-por" element={<BusinessExplorationPage />} /> Investor Portfolio Page */}
        {/* <Route path="/bus-pro" element={<BusinessProfile />} /> Business Profile Page */}
        {/* <Route path="/bus-por" element={<BusinessExplorationPage />} /> Business Portfolio Page */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
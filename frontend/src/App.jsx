import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home-page/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import SignUp from "./pages/sign-up-page/SignUp"
import SignInSide from "./pages/sign-in-page/SignInSide"
import Checkout from "./pages/checkout-page/Checkout"
import BusinessInfo from "./pages/business-info-page/Business"

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
        <Route path="/" element={<Home />}/>
        <Route path="/sin" element={<SignInSide />} /> Sign in page
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/sup" element={<RegisterAndLogout />} /> Sign up Page
        <Route path="/checkout" element={<Checkout/>} /> Checkout
        <Route path="/bus" element={<BusinessInfo />} /> Business info Page
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
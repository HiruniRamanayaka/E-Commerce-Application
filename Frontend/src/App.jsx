import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/public/Home'
import Coffees from './pages/public/Coffees'
import AboutUs from './pages/public/AboutUs'
import Contact from './pages/public/Contact'
import Navbar from './components/public/Navbar'
import Footer from './components/public/Footer'
import Login from './pages/public/Login'
import SignUp from './pages/public/SignUp'
import Dashboard from "./pages/customer/Dashboard";

function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/signUp";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffees" element={<Coffees />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/customer/dashboard" element={<Dashboard />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  )
}

export default App

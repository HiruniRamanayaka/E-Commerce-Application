import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Coffees from './pages/Coffees'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

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
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  )
}

export default App

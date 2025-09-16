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
import ProductDetail from "./pages/customer/Products";
import PrivateRoute from "./utils/PrivateRoutes";
import Cart from "./pages/customer/Cart.jsx";

function App() {
  const location = useLocation();
  // normalize path check: hide navbar on login & signup
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
        <Route path="/signup" element={<SignUp />} />

        {/* Protected customer routes */}
        <Route
          path="/customer/dashboard"
          element={
            <PrivateRoute roles={["customer"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute roles={["customer"]}>
              <ProductDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/customer/cart"
          element={
            <PrivateRoute roles={["customer"]}>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  )
}

export default App

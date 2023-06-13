import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from './pages/Layout/Layout'
import Login from "./pages/Authentication/components/Login";
import Register from "./pages/Authentication/components/Register";
import Home from "./pages/products/components/Home";
import { ProtectedRoutes, UnprotectedRoutes } from "./pages/services/routes";
import CartProduct from "./pages/products/components/CartProduct";
import Checkout from "./pages/products/components/Checkout";
import Myorder from "./pages/profile/components/Myorder";
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route element={<UnprotectedRoutes />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/cartproduct" element={<CartProduct />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/myordersummary" element={< Myorder/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function MainLayout() {
  const location = useLocation();
  const { pathname } = location;

  // Check if the current route is either "/register" or "/login"
  const isRegisterOrLogin = pathname === "/register" || pathname === "/login";

  return (
    <Layout showHeader={!isRegisterOrLogin} showFooter={!isRegisterOrLogin}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/cartproduct" element={<CartProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myordersummary" element={< Myorder/>} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;

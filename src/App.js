import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/components/Login";
import Register from "./pages/Authentication/components/Register";
import Home from "./pages/products/components/Home";
import { ProtectedRoutes, UnprotectedRoutes } from "./pages/services/routes";
import CartProduct from "./pages/products/components/CartProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/addtocart" element={<CartProduct />} />
          </Route>
        </Routes>
        {/* <Register>
        </Register> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

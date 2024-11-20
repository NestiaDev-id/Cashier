import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/DashboardProducts";
import Products from "./pages/Products";
import ShowProduct from "./pages/ShowProduct";
import AddProduct from "./pages/addProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/addProduct" element={<AddProduct />} />{" "}
      <Route path="/products/detail/:id" element={<ShowProduct />} />{" "}
      <Route path="/products/edit/:id" element={<ShowProduct />} />{" "}
      {/* <Route path="" element={<Products />} /> */}
    </Routes>
  );
}

export default App;

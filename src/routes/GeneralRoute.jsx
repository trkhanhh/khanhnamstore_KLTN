import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../container/layout/homePage";
import Product from "../container/layout/product";
import ProductDetail from "../container/layout/product/product-detail";
import Login from "../container/layout/auth/login";
import ForgotPassword from "../container/layout/auth/forgot_password";
import Register from "../container/layout/auth/register";
import ForgotPassword2 from "../container/layout/auth/forgot_password_2";
import SuccessRegister from "../container/layout/auth/success_register";
import { CheckPayment } from "../container/layout/payment/check_payment";
import Search from "../container/layout/search";
export const GeneralRoute = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product" element={<Product />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/product" element={<Product />} />
        <Route path="/forgot-OTP/:email/:type" element={<ForgotPassword2 />} />
        {/* <Route path="/forgot-create-password" element={<ForgotPassword3 />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/success-register" element={<SuccessRegister />} />
        <Route path="/check-payment" element={<CheckPayment />} />
        <Route path="/search?query=:query" element={<Search />}></Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

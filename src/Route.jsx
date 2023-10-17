import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./container/layout/homePage";
import Product from "./container/layout/product";
import ProductDetail from "./container/layout/product/product-detail";
import Login from "./container/layout/auth/login";
import Payment from "./container/layout/payment";
import PaymentMethod from "./container/layout/payment/payment_method";
import UserProfile from "./container/layout/user/user_profile";
import Orders from "./container/layout/user/orders";
import ForgotPassword from "./container/layout/auth/forgot_password";
import { useEffect, useState } from "react";
import Header from "./container/layout/header";
import Footer from "./container/layout/footer";
import Register from "./container/layout/auth/register";
import ForgotPassword2 from "./container/layout/auth/forgot_password_2";
import ForgotPassword3 from "./container/layout/auth/forgot_password_3";
import SuccessRegister from "./container/layout/auth/success_register";
import AddressManager from "./container/layout/user/addressManager";

function Router() {
  const [accountUser, setAccountUser] = useState({});
  useEffect(() => {
    console.log(accountUser)
  }, [accountUser])
  return (
    <BrowserRouter>
      <Header accountUser={accountUser} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product" element={<Product />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/login" element={<Login setAccountUser={setAccountUser} />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/forgot-OTP" element={<ForgotPassword2 />} />
        <Route path="/forgot-create-password" element={<ForgotPassword3 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-method" element={<PaymentMethod />} /> 
        <Route path="/user-profile" element={<UserProfile setAccountUser={setAccountUser} />} />
        <Route path="/orders" element={<Orders  setAccountUser={setAccountUser} />} />
        <Route path="/success-register" element={<SuccessRegister />} />
        <Route path="/address-manager" element={<AddressManager setAccountUser={setAccountUser} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../container/layout/homePage";
import Product from "../container/layout/product";
import ProductDetail from "../container/layout/product/product-detail";
import Login from "../container/layout/auth/login";
import Payment from "../container/layout/payment";
import PaymentMethod from "../container/layout/payment/payment_method";
import UserProfile from "../container/layout/user/user_profile";
import Orders from "../container/layout/user/orders";
import ForgotPassword from "../container/layout/auth/forgot_password";
import Register from "../container/layout/auth/register";
import ForgotPassword2 from "../container/layout/auth/forgot_password_2";
import ForgotPassword3 from "../container/layout/auth/forgot_password_3";
import SuccessRegister from "../container/layout/auth/success_register";
import AddressManager from "../container/layout/user/addressManager";
import ProductManager from "../container/admin/product_manager/index";
import ProductCreate from "../container/admin/product_manager/create";
import UserManager from "../container/admin/user_manager/index";
import UserCreate from "../container/admin/user_manager/create";
import Dashboard from "../container/admin/dashboard";
import OrdersManager from "../container/admin/orders_manager/index";
import ProductUpdate from "../container/admin/product_manager/update";
import UserUpdate from "../container/admin/user_manager/update";
import { CheckPayment } from "../container/layout/payment/check_payment";
function Router() {
  const setAccountUser = () => {};
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product" element={<Product />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route
          path="/user-profile"
          element={<UserProfile setAccountUser={setAccountUser} />}
        />
        <Route
          path="/orders"
          element={<Orders setAccountUser={setAccountUser} />}
        />
        <Route path="/success-register" element={<SuccessRegister />} />
        <Route path="/check-payment" element={<CheckPayment />} />

        <Route
          path="/address-manager"
          element={<AddressManager setAccountUser={setAccountUser} />}
        />
        <Route path="/admin/product-manager" element={<ProductManager />} />
        <Route path="/admin/product-create" element={<ProductCreate />} />
        <Route path="/admin/user-manager" element={<UserManager />} />
        <Route path="/admin/user-create" element={<UserCreate />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/order-manager" element={<OrdersManager />} />
        <Route path="/admin/update-user" element={<UserUpdate />} />
        <Route path="/admin/update-product" element={<ProductUpdate />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../container/layout/homePage";
import Product from "../container/layout/product";
import ProductDetail from "../container/layout/product/product-detail";
import Payment from "../container/layout/payment";
import PaymentMethod from "../container/layout/payment/payment_method";
import UserProfile from "../container/layout/user/user_profile";
import Orders from "../container/layout/user/orders";
import SuccessRegister from "../container/layout/auth/success_register";
import AddressManager from "../container/layout/user/addressManager";
import ProductManager from "../container/admin/product_manager/index";
import ProductCreate from "../container/admin/product_manager/create";
import UserManager from "../container/admin/user_manager/index";
import UserCreate from "../container/admin/user_manager/create";
import OrdersManager from "../container/admin/orders_manager/index";
import ProductUpdate from "../container/admin/product_manager/update";
import UserUpdate from "../container/admin/user_manager/update";
import { CheckPayment } from "../container/layout/payment/check_payment";
import CategoryManager from "../container/admin/category-manager";
import CategoryCreate from "../container/admin/category-manager/create";
import CategoryUpdate from "../container/admin/category-manager/update";
import Search from "../container/layout/search";
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
        <Route path="/search?query=:query" element={<Search />}></Route>
        <Route path="/admin/product-manager" element={<ProductManager />} />
        <Route path="/admin/product-create" element={<ProductCreate />} />
        <Route path="/admin/user-manager" element={<UserManager />} />
        <Route path="/admin/user-create" element={<UserCreate />} />
        <Route path="/admin/order-manager" element={<OrdersManager />} />
        <Route path="/admin/update-user" element={<UserUpdate />} />
        <Route path="/admin/update-product/:id" element={<ProductUpdate />} />
        <Route path="/admin/category-manager" element={<CategoryManager />} />
        <Route path="/admin/category-create" element={<CategoryCreate />} />
        <Route path="/admin/category-edit/:id" element={<CategoryUpdate />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

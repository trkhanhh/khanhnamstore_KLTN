import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NavAdmin() {
  const [activeLink, setActiveLink] = useState(""); // Sử dụng useState để theo dõi liên kết được chọn
  const [t] = useTranslation("app");

  // Hàm này được gọi khi người dùng nhấp vào một liên kết
  const handleLinkClick = (link) => {
    setActiveLink(link); // Đặt liên kết được chọn thành liên kết mà người dùng vừa nhấp vào
  };
  return (
    <div className="w-2/12 relative">
      <aside className=" fixed top-0 bottom-0  bg-slate-800 h-screen w-2/12 hidden sm:block shadow-xl ">
        <div className="p-6">
          <Link
            to="/admin"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </Link>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <Link
            to="/admin/category-manager"
            onClick={() => handleLinkClick("/admin/product-manager")} // Gọi hàm khi người dùng nhấp vào liên kết
            className={`flex items-center text-white py-4 pl-6 nav-item px-3 ${
              activeLink === "/admin/product-manager" ? "active" : "" // Áp dụng lớp "active" nếu liên kết được chọn
            }`}
          >
            {t("Category Manager")}
          </Link>
          <Link
            to="/admin/product-manager"
            onClick={() => handleLinkClick("/admin/product-manager")} // Gọi hàm khi người dùng nhấp vào liên kết
            className={`flex items-center text-white py-4 pl-6 nav-item px-3 ${
              activeLink === "/admin/product-manager" ? "active" : "" // Áp dụng lớp "active" nếu liên kết được chọn
            }`}
          >
            {t("product_manager")}
          </Link>
          <Link
            to="/admin/order-manager"
            onClick={() => handleLinkClick("/admin/order-manager")} // Gọi hàm khi người dùng nhấp vào liên kết
            className={`flex items-center text-white py-4 pl-6 nav-item px-3 ${
              activeLink === "/admin/order-manager" ? "active" : "" // Áp dụng lớp "active" nếu liên kết được chọn
            }`}
          >
            {t("order_manager")}
          </Link>
          <Link
            to="/admin/user-manager"
            onClick={() => handleLinkClick("/admin/user-manager")} // Gọi hàm khi người dùng nhấp vào liên kết
            className={`flex items-center text-white py-4 pl-6 nav-item px-3 ${
              activeLink === "/admin/user-manager" ? "active" : "" // Áp dụng lớp "active" nếu liên kết được chọn
            }`}
          >
            {t("user_manager")}
          </Link>
        </nav>
        <Link
          to="/"
          className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4"
        >
          <i className="fas fa-arrow-circle-up mr-3"></i>
          Upgrade to Pro!
        </Link>
      </aside>
    </div>
  );
}

export default NavAdmin;

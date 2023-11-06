import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function HeaderAdmin() {
  const [t, i18n] = useTranslation("app");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-full bg-slate-800 text-black px-6 left-0 top-0 ">
      <div className="flex items-end text-right justify-end md:order-2 relative py-2">
        <button
          type="button"
          className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            className="w-8 h-8 rounded-full"
            src="https://cce.edu.vn/wp-content/uploads/2023/06/hinh-anh-hoat-hinh-de-thuong-1-600x600.jpg"
            alt="user photo"
          />
        </button>
        <div
          className={`z-50 ${
            isOpen ? "hidden" : "block"
          } my-4 text-base px-3 list-none absolute top-9 bg-white divide-y divide-gray-100 rounded shadow `}
          id="user-dropdown"
        >
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <button
                 onClick={() => {
                  i18n.changeLanguage(i18n.language === "en" ? "vi" : "en");
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              >
                {i18n.language === "en" ? "Tiếng Việt" : "Tiếng Anh"}
              </button>
            </li>
            <li>
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              >
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;

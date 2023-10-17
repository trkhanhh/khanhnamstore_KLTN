import { Link } from "react-router-dom";
import Logo from "../../../asset/images/Logo.png";
import iconCart from "../../../asset/images/bag.png";
import iconUser from "../../../asset/images/user.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Header({ accountUser }) {
  const [t, i18n] = useTranslation("app");
  const [userLogin, setUserLogin] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed z-50 right-0 left-0 top-0 shadow-lg px-0 sm:px-4 py-2 bg-white">
      <nav className="flex justify-between">
        <div className="grid  xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 items-center gap-3 justify-between w-full">
          <div
            className={`navLinks duration-500 z-40 ${
              menuOpen
                ? "lg:static lg:w-auto w-full absolute"
                : "hidden  lg:block xl:block "
            }  lg:h-auto bg-white flex md:items-center gap-[1.5vw] ${
              menuOpen ? "top-[100%] left-0" : "top-[-100%] left-[-100%]"
            } lg:px-5 lg:py-0 py-5 px-5 `}
          >
            <ul className="flex lg:flex-row flex-col lg:items-center lg:gap-[2vw] gap-3">
              <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                <Link to="/">{t("shop")}</Link>
              </li>
              <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                <Link to="/product">{t("category")}</Link>
              </li>
              <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                <Link to="">{t("about_us")}</Link>
              </li>
              <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                <Link to="">{t("contact")}</Link>
              </li>
            </ul>
          </div>
          <div className="w-[130px] md:w-[200px] flex items-center mx-auto">
            <img src={Logo} alt="LOGO" srcSet="" />
          </div>

          <div className="flex gap-0 justify-end sm:col-span-2 lg:col-span-1">
            <form className="lg:w-8/12 mx-2">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                {t("search")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full outline-0 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t("search")}
                  required
                />
              </div>
            </form>
            {Object.keys(accountUser).length !== 0 ? (
              <Link
                to="/login"
                type="button"
                style={{ backgroundColor: "black" }}
                className="font-medium text-white px-2 py-2 mx-0 rounded active:bg-black hover:bg-gray-500 text-sm sm:text-base my-auto"
              >
                {t("login")}
              </Link>
            ) : (
              <>
                <Link
                  to="/user-profile"
                  type="button"
                  className="inline-flex items-center px-2 text-sm font-medium text-gray-900 bg-white border-0 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                >
                  <div className="w-8 h-8  rounded-full bg-black p-2">
                    <img src={iconUser} alt="iconUser" />
                  </div>
                </Link>
                <Link
                  to="/orders"
                  className="inline-flex items-center px-2 text-sm font-medium text-gray-900  border-0 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                >
                  <div className="w-8 h-8  rounded-full bg-black p-2">
                    <img src={iconCart} alt="iconCart" />
                  </div>
                </Link>
              </>
            )}

            <button onClick={toggleMenu} className="px-2 block lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                // hàm change lang
                i18n.changeLanguage(i18n.language === "en" ? "vi" : "en");
              }}
              className="pl-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

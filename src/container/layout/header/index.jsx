import { Link } from "react-router-dom";
import Logo from "../../../asset/images/Logo.png";
import { useTranslation } from "react-i18next";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../thunks/CategoryThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCartShopping,
  faGlobe,
  faSignIn,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { loadCart } from "../../../slices/CartSlice";
function Header() {
  const [t, i18n] = useTranslation("app");
  const { newCollection } = useSelector((state) => state.productReducer);
  const [menuOpen, setMenuOpen] = useState(false);
  const { logged } = useSelector((state) => state.authReducer);
  const { categories } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useLayoutEffect(() => {
    dispatch(getAllCategories());
    dispatch(loadCart());
  }, []);
  return (
    <header className="fixed z-50 right-0 left-0 top-0 px-0 sm:px-4 py-2 lg:py-0 bg-white">
      <nav className="flex justify-between">
        <div className="grid mx-auto xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 items-center gap-3 justify-between lg:w-full">
          <div
            className={`navLinks duration-500 z-40 ${
              menuOpen
                ? "lg:static lg:w-auto w-full absolute"
                : "hidden lg:block xl:block "
            }  lg:h-auto bg-white flex md:items-center gap-[1.5vw] ${
              menuOpen ? "top-[100%] left-0" : "top-[-100%] left-[-100%]"
            }  lg:px-0 py-5 xl:px-5 lg:col-span-1 lg:min-w-[380px] px-5   xl:w-full `}
          >
            <ul className="flex lg:flex-row flex-col lg:items-center lg:gap-[1vw] w-full lg:w-auto">
              <li className="group inline-block">
                <button className="outline-none focus:outline-none text-start py-1 bg-white rounded-sm flex items-center">
                  <span className="hover:font-semibold flex-1">
                    {t("shop")}
                  </span>
                </button>
                <ul
                  className="bg-white border rounded-sm transform z-10 scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32"
                  style={{ minWidth: "250px" }}
                >
                  {categories.map((category, index) => {
                    if (category.isPrimary == true) {
                      return (
                        <li
                          className="rounded-sm px-3 relative py-2 hover:bg-gray-100"
                          key={index}
                        >
                          <button className="w-full text-left flex items-center outline-none focus:outline-none">
                            <span className="pr-1 flex-1">{category.name}</span>
                          </button>
                          <ul
                            className="bg-white border px-3 py-2 rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32"
                            style={{ minWidth: "250px" }}
                          >
                            {category.categories.map((val, index) => {
                              return (
                                <li
                                  className="px-3 py-1 hover:bg-gray-100"
                                  key={index}
                                >
                                  <Link to={`/product?category=${val.id}`}>
                                    {val.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    }
                  })}
                </ul>
              </li>
              {newCollection.length > 0 && (
                <li className="relative max-w-fit pr-3 md:pr-0 py-1 hover:font-semibold">
                  <a href="#new-collection">{t("New Collection")}</a>
                </li>
              )}
              <li className="relative max-w-fit pr-3 md:pr-0 py-1 hover:font-semibold">
                <Link to="">{t("about_us")}</Link>
              </li>
              <li className="relative max-w-fit pr-3 md:pr-0 py-1 hover:font-semibold">
                <Link to="">{t("contact")}</Link>
              </li>
            </ul>
          </div>
          <div className=" flex items-center mx-auto lg:items-left xl:items-center">
            <Link to={"/"}>
              <img src={Logo} alt="LOGO" srcSet="" />
            </Link>
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
            <div className="flex justify-center items-center">
              {!logged ? (
                <Link
                  to="/login"
                  className="bg-black font-medium text-white px-2 w-8 sm:w-9 lg:w-9 xl:w-9 md:w-9 min-w-8 my-auto  text-center py-2 mx-0 rounded-full active:bg-black hover:bg-gray-500 text-xs sm:text-sm "
                >
                  <button>
                    <FontAwesomeIcon icon={faSignIn} />
                  </button>
                </Link>
              ) : (
                <>
                  <Link
                    to="/user-profile"
                    className=" bg-white font-medium text-white px-2 w-8 sm:w-9 lg:w-9 xl:w-9 md:w-9 min-w-8 my-auto  text-center py-2 mx-2 rounded-full"
                  >
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      className="text-black mx-auto text-xl"
                    />
                  </Link>
                  <Link
                    to="/orders"
                    className="bg-white font-medium text-white px-2 w-8 sm:w-9 lg:w-9 xl:w-9 md:w-9 min-w-8 my-auto  text-center py-2  rounded-full"
                  >
                    <FontAwesomeIcon
                      icon={faCartArrowDown}
                      className="text-black mx-auto text-xl"
                    />
                  </Link>
                  <Link to={"/payment"}>
                    <button className=" ms-2 bg-white px-2 w-8 sm:w-9 lg:w-9 xl:w-9 md:w-9 min-w-8  text-center rounded-full my-auto h-8 md:h-9 text-xs sm:text-sm">
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="text-black text-xl"
                      />
                    </button>
                  </Link>
                </>
              )}

              <button
                onClick={() => {
                  i18n.changeLanguage(i18n.language === "en" ? "vi" : "en");
                }}
                className="mx-2 bg-white px-2 w-8 sm:w-9 lg:w-9 xl:w-9 md:w-9 min-w-8  text-center rounded-full my-auto h-8 md:h-9"
              >
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-black text-xl"
                />
              </button>
              <button onClick={toggleMenu} className="pe-2 block lg:hidden ">
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
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

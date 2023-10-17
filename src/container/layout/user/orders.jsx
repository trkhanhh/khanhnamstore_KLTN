import { useState } from "react";
import no_Order from "../../../asset/images/E-Commerce.png";
import product from "../../../asset/images/product-item.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import NavbarMini from "../component/nav_mini";
function Orders({ setAccountUser }) {
  const [t] = useTranslation("app");
  const [orderProduct, setOrderProduct] = useState([]);
  const handLogout = () => {
    setAccountUser({});
  };
  return (
    <div className="pt-20 lg:px-8 px-4">
      <div className="lg:w-5/6 w-full mx-auto">
        <div className="history">
          <Link to="/" className="uppercase text-xs px-1">
            {t("home")}
          </Link>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
          <Link to="/" className="uppercase text-xs px-1">
            {t("orders")}
          </Link>
        </div>
        <div className="grid  md:grid-cols-4 grid-cols-1 gap-2 py-4">
          <div>
            <NavbarMini handLogout={handLogout} />
          </div>
          <div className="col-span-3">
            <div className="orders p-3 w-11/12">
              <h2 className="text-3xl py-2">{t("orders")}</h2>
              <p className="text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              {orderProduct.length === 0 ? (
                <div className="order-detail text-center ">
                  <img src={no_Order} alt="product" className="mx-auto" />
                  <p>Your orders is empty. Place a few items.</p>
                </div>
              ) : (
                <div className="order-detail py-5">
                  <div className="product-item border border-black">
                    <div className="grid lg:grid-cols-5 grid-cols-1 gap-0 p-3">
                      <div>
                        <img src={product} alt="product" height="170px" />
                      </div>
                      <div className="col-span-3 ">
                        <p className="text-xs">ORDER21345 - 09:41 13/13/2023</p>
                        <p className="product-name text-xl py-2">
                          Lorem Ipsum is simply dummy text of the printing
                        </p>
                        <div className="product-size py-1">
                          <span>{t("size")} : </span>
                          <span>XXS</span>
                        </div>
                        <div className="product-size py-1">
                          <span>{t("price")} : </span>
                          <span>$130.00</span>
                        </div>
                      </div>
                      <div className=" my-auto">
                        <div className="grid grid-cols-4 gap-3">
                          <div className="w-6 h-6 border border-black rounded-2xl flex align-center ">
                            <div className="w-4 h-4 bg-black rounded-xl m-auto my-auto"></div>
                          </div>
                          <div className="col-span-3 text-sm">
                            {t("ordered")}
                          </div>
                        </div>
                        <div className="line w-0.5 h-4 bg-black"></div>
                        <div className="grid grid-cols-4 gap-3 ">
                          <div className="w-6 h-6 border border-black rounded-2xl flex align-center ">
                            <div className="w-4 h-4 bg-black rounded-xl m-auto my-auto"></div>
                          </div>
                          <div className="col-span-3 text-sm">
                            {t("confirmed")}
                          </div>
                        </div>
                        <div className="line w-0.5 h-4 bg-black"></div>
                        <div className="grid grid-cols-4 gap-3 ">
                          <div className="w-6 h-6 border border-black rounded-2xl flex align-center "></div>
                          <div className="col-span-3 text-sm">
                            {t("out_delivery")}
                          </div>
                        </div>
                        <div className="line w-0.5 h-4 bg-black"></div>
                        <div className="grid grid-cols-4 gap-3 ">
                          <div className="w-6 h-6 border border-black rounded-2xl flex align-center "></div>
                          <div className="col-span-3 text-sm">
                            {t("delivered")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;

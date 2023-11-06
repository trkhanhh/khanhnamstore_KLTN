import { useLayoutEffect, useState } from "react";
import no_Order from "../../../asset/images/E-Commerce.png";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import NavbarMini from "../component/nav_mini";
import { Layout } from "..";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  confirmGetOrder,
  getOrderByUser,
} from "../../../thunks/PaymentThunk";
function Orders({ setAccountUser }) {
  const [t] = useTranslation("app");
  const { orders } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getOrderByUser());
  }, []);
  useLayoutEffect(() => {
    console.log(orders);
  }, [orders]);
  const handleConfirmOrder = (id) => {
    if (window.confirm("Du u want confirm?")) {
      dispatch(confirmGetOrder(id));
    }
  };
  const handleCancelOrder = (id) => {
    if (window.confirm("Du u want cancel?")) {
      dispatch(cancelOrder(id));
    }
  };
  return (
    <Layout>
      <div className="pt-20 mt-5 sm:mt-0 px-4 min-h-screen">
        <div className="lg:w-5/6 w-full h-full mx-auto mt-12">
          <div className="history">
            <Link to="/" className="uppercase text-xs pe-1">
              {t("home")}
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "10px" }}
            />
            <Link to="/orders" className="uppercase text-xs px-1">
              {t("orders")}
            </Link>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4 py-4">
            <div>
              <NavbarMini />
            </div>
            <div className="col-span-3">
              <div
                className="orders p-3 md:w-11/12 w-full"
                style={{ maxHeight: "100vh", overflowY: "auto" }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-3xl py-2">
                  {t("orders")}
                </h2>
                <p className="text-sm sm:text-base">{t("subtitle_orders")}</p>
                {orders.length == 0 ? (
                  <div className="order-detail text-center ">
                    <img src={no_Order} alt="product" className="mx-auto" />
                    <p>{t("Your orders is empty")}</p>
                  </div>
                ) : (
                  orders.map((order, index) => {
                    return (
                      <div key={index} className="order-detail py-5">
                        <div className="product-item border  border-black">
                          <div className="grid lg:grid-cols-5 sm:grid-cols-4 grid-cols-1  gap-3 sm:p-1 p-3 lg:p-3">
                            <div className="col-span-5 sm:col-span-1">
                              <img
                                className="object-fit-cover"
                                src={order.detail[0].linkImage}
                                alt="product"
                                height="170px"
                              />
                            </div>
                            <div className="col-span-5 lg:col-span-3 sm:col-span-2 ">
                              <p className="text-xs">
                                ORDER {order.id} - {order.createdDate} -{" "}
                                {order.createdTime}
                              </p>
                              <p className=" font-semibold text-base sm:text-base lg:text-xl py-2">
                                {order.detail[0].productName}
                              </p>
                              <div className="text-sm  lg:text-base py-1">
                                <span>{t("size")} : </span>
                                <span>
                                  {order.detail[0].productSize.sizeName}
                                </span>
                              </div>
                              <div className="text-sm  lg:text-base py-1">
                                <span>{t("price")} : </span>
                                <span>
                                  {order.totalAmount.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                              </div>
                              {order.status.id == 2 && (
                                <div className="text-sm  lg:text-base py-1">
                                  <button
                                    onClick={() => {
                                      handleConfirmOrder(order.id);
                                    }}
                                    className="btn bg-black text-white px-4 py-2 rounded"
                                  >
                                    {t("Confirm Product")}{" "}
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleCancelOrder(order.id);
                                    }}
                                    className="btn bg-red-600 mx-2 text-white px-4 py-2 rounded"
                                  >
                                    {t("Cancel Product")}{" "}
                                  </button>
                                </div>
                              )}
                            </div>
                            {order.status.id == 6 ? (
                              <p className="text-rose-400 text-center">
                                Order cancel
                              </p>
                            ) : (
                              <div className="my-auto">
                                <div className="grid grid-cols-4 gap-3">
                                  <div className="w-6 h-6 border border-black rounded-2xl flex align-center ">
                                    <div className="w-4 h-4 bg-black rounded-xl m-auto my-auto"></div>
                                  </div>
                                  <div className="col-span-3 text-sm sm:text-xs lg:text-sm">
                                    {t("ordered")}
                                  </div>
                                </div>
                                <div className="line w-0.5 h-4 bg-black"></div>
                                <div className="grid grid-cols-4 gap-3 ">
                                  <div className="w-6 h-6 border border-black rounded-2xl flex align-center ">
                                    {order.status.id >= 2 && (
                                      <div className="w-4 h-4 bg-black rounded-xl m-auto my-auto"></div>
                                    )}
                                  </div>
                                  <div className="col-span-3 text-sm sm:text-xs lg:text-sm">
                                    {t("confirmed")}
                                  </div>
                                </div>
                                <div className="line w-0.5 h-4 bg-black"></div>
                                <div className="grid grid-cols-4 gap-3 ">
                                  <div className="w-6 h-6 border border-black rounded-2xl flex align-center ">
                                    {order.status.id >= 3 && (
                                      <div className="w-4 h-4 bg-black rounded-xl m-auto my-auto"></div>
                                    )}
                                  </div>
                                  <div className="col-span-3 text-sm sm:text-xs lg:text-sm">
                                    {t("out_delivery")}
                                  </div>
                                </div>
                                <div className="line w-0.5 h-4 bg-black"></div>
                                <div className="grid grid-cols-4 gap-3 ">
                                  <div className="w-6 h-6 border border-black rounded-2xl flex align-center ">
                                    {order.status.id >= 4 && (
                                      <div className="w-4 h-4 bg-black rounded-xl m-auto my-auto"></div>
                                    )}
                                  </div>
                                  <div className="col-span-3 text-sm sm:text-xs lg:text-sm">
                                    {t("delivered")}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;

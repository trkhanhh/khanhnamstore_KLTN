import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import empty_cart from "../../../asset/images/empty-cart.png";
import { Layout } from "..";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateProduct } from "../../../slices/CartSlice";
import { useLayoutEffect, useState } from "react";
import cloth from "../../../asset/images/cloth_1.png";
function Payment() {
  const { products } = useSelector((state) => state.cartReducer);
  const [amount, setAmount] = useState(0);
  const [t] = useTranslation("app");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleDecrease = (id, quan, sizeId) => {
    dispatch(updateProduct({ id, quantity: quan - 1, sizeId }));
  };
  const handleIncrease = (id, quan, sizeId) => {
    dispatch(updateProduct({ id, quantity: quan + 1, sizeId }));
  };
  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };
  useLayoutEffect(() => {
    let am = 0;
    products.map((pro) => {
      am += pro.quantity * pro.price;
    });
    setAmount(am);
  }, [products]);
  const handlePay = () => {
    nav("/payment-method");
  };
  return (
    <Layout>
      <div className="pt-20 mt-8 px-4" style={{ minHeight: "100vh" }}>
        <div className="lg:w-5/6 w-full px-3 mx-auto">
          <div className="history">
            <Link to="/" className="uppercase text-xs px-1">
              {t("home")}
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "10px" }}
            />
            <Link to="/" className="uppercase text-xs px-1">
              {t("product")}
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "10px" }}
            />
            <Link to="/" className="uppercase text-xs px-1">
              {t("payment")}
            </Link>
          </div>
          {products.length > 0 && (
            <div>
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="col-span-3 border-black">
                  <table class="text-left w-full border-collapse text-black border">
                    <thead>
                      <tr>
                        <th
                          class="py-4 px-3 bg-grey-lightest uppercase text-sm text-grey-dark "
                          style={{ width: "60%" }}
                        >
                          {t("product")}
                        </th>
                        <th class="py-4 px-3 bg-grey-lightest uppercase text-sm text-grey-dark ">
                          {t("quality")}
                        </th>
                        <th class="py-4 px-3 bg-grey-lightest uppercase text-sm text-grey-dark ">
                          {t("sum_money")}
                        </th>
                        <th class="py-4 px-3 bg-grey-lightest uppercase text-sm text-grey-dark text-end">
                          {t("delete")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => {
                        return (
                          <tr key={index} class="hover:bg-grey-lighter">
                            <td class="py-4 px-3">
                              <div className="flex flex-col sm:grid grid-cols-4 gap-5 ">
                                <div className="">
                                  <img
                                    src={product.imageBanner}
                                    alt=""
                                    height="170px"
                                    className="w-full rounded object-cover"
                                  />
                                </div>
                                <div className="col-span-3 my-auto">
                                  <p className="text-sm  md:text-xl mt-0">
                                    {product.name}
                                  </p>
                                  <div className="product-size py-1">
                                    <span className="text-xs md:text-sm lg:text-base">
                                      {t("size")} :{" "}
                                    </span>
                                    <span className="text-xs md:text-sm lg:text-base">
                                      {product.selectedSize.sizeName}
                                    </span>
                                  </div>
                                  <div className="product-size py-1">
                                    <span className="text-xs md:text-sm lg:text-base">
                                      {t("price")} :{" "}
                                    </span>
                                    <span className="text-xs md:text-sm lg:text-base">
                                      {product.price.toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="py-4 px-3">
                              <div className="flex items-center ">
                                <button
                                  className="sm:px-2 px-1 py-1 border border-gray-300 text-black text-xs sm:text-sm  "
                                  onClick={() => {
                                    if (product.quantity - 1 >= 1) {
                                      handleDecrease(
                                        product.id,
                                        product.quantity,
                                        product.selectedSize.id
                                      );
                                    }
                                  }}
                                >
                                  -
                                </button>
                                <input
                                  className="md:w-8 w-7 text-center border border-gray-300 py-1 text-xs sm:text-sm "
                                  type="number"
                                  value={product.quantity}
                                />
                                <button
                                  className="sm:px-2 px-1 py-1 border border-gray-300 text-black text-xs sm:text-sm "
                                  onClick={() => {
                                    handleIncrease(
                                      product.id,
                                      product.quantity,
                                      product.selectedSize.id
                                    );
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className=" my-auto text-xs md:text-sm">
                              {(
                                product.quantity * product.price
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td className=" text-end pe-4">
                              <button
                                className=" border p-2 border-zinc-400"
                                onClick={() => {
                                  handleRemoveProduct(product.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="text-xs sm:text-base"
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="payment-bill flex justify-end">
                <div className="payment-bill-detail border border-black p-3 w-full sm:w-4/12">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="title">
                      <p className="text-base font-medium"> {t("sum_money")}</p>
                    </div>
                    <div className="text-end">
                      <p className="text-base">
                        {amount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="w-full text-center ">
                    <button
                      className="bg-black text-white uppercase py-3 px-5 mt-4 text-xs mx-auto min-w-32"
                      onClick={handlePay}
                    >
                      {t("pay")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {products.length === 0 && (
            <div className="text-center py-20 ">
              <img src={empty_cart} alt="empty_cart" className="mx-auto" />
              {t("empty_cart")}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Payment;

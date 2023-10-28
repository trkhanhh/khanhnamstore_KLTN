import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "..";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { getAllAddressByUser } from "../../../thunks/AddressThunk.js";
import { createOrder, createPayment } from "../../../thunks/PaymentThunk";
import { setAlert } from "../../../slices/AlertSlice";
function PaymentMethod() {
  const { addresses } = useSelector((state) => state.addressReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { products } = useSelector((state) => state.cartReducer);
  const [payType, setPayType] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const [t] = useTranslation("app");
  const nav = useNavigate();
  const [address, setAddress] = useState();
  useLayoutEffect(() => {
    if (addresses.length <= 0) {
      dispatch(getAllAddressByUser());
    }
  }, []);

  useLayoutEffect(() => {
    if (addresses.length > 0) {
      setAddress(addresses[0].id);
    }
  }, [addresses]);
  useLayoutEffect(() => {
    let amount_ = 0;
    products.map((pro) => {
      amount_ += pro.price * pro.quantity;
    });
    setAmount(amount_);
  }, [products]);
  const handlePay = () => {
    if (payType === "") {
      dispatch(setAlert({ type: "error", content: "select a pay type" }));
    }
    if (payType === "PAYMENT_MOMO") {
      dispatch(
        createPayment({
          req: {
            content: "thanh toán đơn hàng",
            returnUrl: "http://localhost:3000/check-payment",
            notifyUrl: "https://www.google.com/",
            listProductSize: products.map((pro) => {
              return {
                idProductSize: pro.selectedSize.id,
                quantity: pro.quantity,
              };
            }),
          },
          addressId: address,
        })
      );
      // nav("/orders");
    }
    if (payType === "PAYMENT_DELIVERY") {
      dispatch(
        createOrder({
          payType: "PAYMENT_DELIVERY",
          userAddressId: address,
          listProductSize: products.map((pro) => {
            return {
              idProductSize: pro.selectedSize.id,
              quantity: pro.quantity,
            };
          }),
        })
      );
      nav("/orders");
    }
  };
  return (
    <Layout>
      <div className="pt-20 mt-8 px-4">
        <div className="lg:w-4/6 w-full mx-auto">
          <div className="history">
            <Link to="/" className="uppercase text-xs pe-1">
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
              LOREMIPSUM PRODUCTS
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "10px" }}
            />
            <Link to="/" className="uppercase text-xs px-1">
              {t("payment")}
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "10px" }}
            />
            <Link to="/" className="uppercase text-xs px-1">
              {t("payment_methods")}
            </Link>
          </div>
          <div className="mt-4 my-4">
            <div className="grid grid-cols-2 gap-2  mx-auto">
              <div className="mx-auto sm:col-span-1 col-span-2 w-full px-3 border border-black my-2">
                <h2 className="text-lg md:text-2xl py-3">
                  {t("receiving_information")}
                </h2>
                <div className="py-2">
                  <span className="px-0 text-sm text-gray-600">
                    {t("your_name")}
                  </span>
                  <input
                    defaultValue={user.fullname}
                    placeholder={t("enter_your_name")}
                    type="text"
                    className="w-full px-2 py-2 text-sm sm:text-base border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                  />
                </div>
                <div className="py-2">
                  <span className="px-0 text-sm text-gray-600">
                    {t("phone")}
                  </span>
                  <input
                    defaultValue={user.phone}
                    placeholder={t("enter_phone")}
                    type="text"
                    className="w-full px-2 py-2 text-sm sm:text-base  border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                  />
                </div>
                <div className="py-2">
                  <span className="px-0 text-sm text-gray-600">
                    {t("address")}
                  </span>
                  <select
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="w-full px-2 py-2 text-sm sm:text-base  border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                  >
                    {addresses.map((address, index) => {
                      return (
                        <option key={index} value={address.id}>
                          {address.streetName +
                            "," +
                            address.wards.name +
                            "," +
                            address.wards.districts.name +
                            "," +
                            address.wards.districts.province.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="py-2">
                  <span className="px-0 text-sm text-gray-600">
                    {t("note")}
                  </span>
                  <input
                    placeholder={t("enter_note")}
                    type="text"
                    className="w-full px-2 py-2 ttext-sm sm:text-base  border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                  />
                </div>
              </div>
              <div className="mx-auto sm:col-span-1 col-span-2 w-full md:px-3 my-2 ">
                <div className="payment-bill p-3 border border-black">
                  <div className="payment-bill-detail">
                    <div className="grid grid-cols-2 gap-4 py-1">
                      <div className="title">
                        <p className="text-base font-medium">{t("subtotal")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-normal">$10.00</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-1">
                      <div className="title">
                        <p className="text-base font-medium">{t("ship")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-normal">
                          Calculated at next step
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-1">
                      <div className="title">
                        <p className="text-base font-medium">
                          {t("order_information")}
                        </p>
                        <p className="text-xs">Including $10.00 in taxes</p>
                      </div>
                      <div>
                        <p className="text-sm font-normal">${amount + 10}</p>
                      </div>
                    </div>
                  </div>
                  <div className="payment-information py-4">
                    <h2 className="text-xl md:text-2xl py-2">
                      {t("payment_methods")}
                    </h2>
                    <div className="mx-auto max-w-lg my-4">
                      <div className="py-1">
                        <input
                          onChange={(e) => {
                            setPayType("PAYMENT_MOMO");
                          }}
                          type="radio"
                          name="payment_method"
                        />
                        <label className="px-2">Momo</label>
                      </div>
                      <div className="py-1">
                        <input
                          onChange={(e) => {
                            setPayType("PAYMENT_DELIVERY");
                          }}
                          type="radio"
                          name="payment_method"
                        />
                        <label className="px-2">{t("delivery")}</label>
                      </div>
                    </div>
                    <button
                      onClick={handlePay}
                      className="bg-black text-white uppercase py-3 px-7 mt-4 text-xs"
                    >
                      {t("pay")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentMethod;

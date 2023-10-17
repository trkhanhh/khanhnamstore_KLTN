import { useState } from "react";
import visa from "../../../asset/images/visa.png";
import master from "../../../asset/images/master.png";
import pay from "../../../asset/images/pay.png";
import applePay from "../../../asset/images/applepay.png";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
function PaymentMethod() {
  const [t] = useTranslation("app");
  return (
    <div className="pt-20 mt-5 sm:mt-0 px-8">
      <div className="sm:w-4/6 w-full mx-auto">
        <div className="history">
          <Link to="/" className="uppercase text-xs px-1">
            {t("home")}
          </Link>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
          <Link to="/" className="uppercase text-xs px-1">
            {t("product")}
          </Link>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
          <Link to="/" className="uppercase text-xs px-1">
            LOREMIPSUM PRODUCTS
          </Link>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
          <Link to="/" className="uppercase text-xs px-1">
            {t("payment")}
          </Link>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
          <Link to="/" className="uppercase text-xs px-1">
          {t("payment_methods")}
          </Link>
        </div>
        <form className="mt-4 my-4">
          <div className="grid grid-cols-2 gap-2 sm:w-5/6 w-full mx-auto">
            <div className="mx-auto sm:col-span-1 col-span-2 w-full px-3 border border-black my-2">
              <h2 className="text-xl py-3"> {t("receiving_information")}</h2>
              <div className="py-2">
                <span className="px-0 text-sm text-gray-600">
                  {" "}
                  {t("your_name")}
                </span>
                <input
                  placeholder={t("enter_your_name")}
                  type="text"
                  className="w-full px-2 py-2 text-base border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
              <div className="py-2">
                <span className="px-0 text-sm text-gray-600">{t("phone")}</span>
                <input
                  placeholder={t("enter_phone")}
                  type="text"
                  className="w-full px-2 py-2 text-base border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
              <div className="py-2">
                <span className="px-0 text-sm text-gray-600">
                  {t("address")}
                </span>
                <input
                  placeholder={t("enter_address")}
                  type="text"
                  className="w-full px-2 py-2 text-base border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
              <div className="py-2">
                <span className="px-0 text-sm text-gray-600">
                  {t("province_city")}
                </span>
                <select className="w-full px-2 py-2 text-base border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1">
                  <option value="1">Hà Nội</option>
                  <option value="1">Hưng Yên</option>
                </select>
              </div>
              <div className="py-2">
                <span className="px-0 text-sm text-gray-600">
                  {t("districts_towns")}
                </span>
                <select className="w-full px-2 py-2 text-base border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1">
                  <option value="1">Thanh Xuân</option>
                </select>
              </div>
              <div className="py-2">
                <span className="px-0 text-sm text-gray-600">
                  {" "}
                  {t("wards")}
                </span>
                <select className="w-full px-2 py-2 text-base border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1">
                  <option value="1">Hạ Đình</option>
                </select>
              </div>
              <div className="py-2">
                <span className="px-0 text-sm text-gray-600"> {t("note")}</span>
                <input
                  placeholder={t("enter_note")}
                  type="text"
                  className="w-full px-2 py-2 text-base border border-gray-700 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
            </div>
            <div className="mx-auto sm:col-span-1 col-span-2 w-full px-3 my-2 ">
              <div className="payment-bill p-3 border border-black">
                <div className="payment-bill-detail">
                  <div className="grid grid-cols-2 gap-4 py-1">
                    <div className="title">
                      <p className="text-base font-medium">{t("subtotal")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-normal">$123.00</p>
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
                      <p className="text-xs">Including $22.27 in taxes</p>
                    </div>
                    <div>
                      <p className="text-sm font-normal">$123.00</p>
                    </div>
                  </div>
                </div>
                <div className="payment-information py-4">
                  <h2 className="text-2xl py-2">{t("payment_methods")}</h2>
                  <div className="mx-auto max-w-lg my-4">
                    <div className="py-1">
                      <input type="radio" />
                      <label className="px-2">Momo</label>
                    </div>
                    <div className="py-1">
                      <input type="radio" />
                      <label className="px-2">{t("delivery")}</label>
                    </div>
                  </div>
                  <button className="bg-black text-white uppercase py-3 px-7 mt-4 text-xs">
                    {t("total")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentMethod;

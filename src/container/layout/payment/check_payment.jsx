import { useEffect, useLayoutEffect } from "react";
import { Layout } from "..";
import { useDispatch } from "react-redux";
import { checkPayment } from "../../../thunks/PaymentThunk";
import verify from "../../../asset/images/verify.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const CheckPayment = () => {
  const [t, i18n] = useTranslation("app");
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(checkPayment());
  }, []);
  return (
    <Layout>
      <div className="w-screen h-screen bg-white flex justify-center items-center flex-col">
        <img src={verify} />
        <p className="my-3">{t("wait_checking")}</p>
        <Link to={"/orders"}>{t("back_to_order")}</Link>
      </div>
    </Layout>
  );
};

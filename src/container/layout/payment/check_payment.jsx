import { useEffect, useLayoutEffect } from "react";
import { Layout } from "..";
import { useDispatch } from "react-redux";
import { checkPayment } from "../../../thunks/PaymentThunk";
import verify from "../../../asset/images/verify.svg";
import { Link } from "react-router-dom";
export const CheckPayment = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(checkPayment());
  }, []);
  return (
    <Layout>
      <div className="w-screen h-screen bg-white flex justify-center items-center flex-col">
        <img src={verify} />
        <p className="my-3">Checking order , please wait ...</p>
        <Link to={"/orders"}>Back to order</Link>
      </div>
    </Layout>
  );
};

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setAlert } from "../../../slices/AlertSlice";
import { activeAccount } from "../../../thunks/AuthThunk";
import { OTP_TYPE } from "../../../constants/enum";
import { Layout } from "..";

function ForgotPassword2() {
  const { email, type } = useParams();
  const [t] = useTranslation("app");
  const [code, setCode] = useState("");

  const BoxSplit = ({ index }) => {
    return (
      <div className="flex justify-center item-center px-4 py-3 mx-2 text-xl text-center border border-black rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1">
        {code[index] ? code[index] : 0}
      </div>
    );
  };
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleVerifyAccount = () => {
    switch (type) {
      case OTP_TYPE.FORGOT_PASSWORD:
        break;
      case OTP_TYPE.VERIFY_ACCOUNT:
        if (code.trim === "" || code.length != 6) {
          dispatch(setAlert({ type: "error", content: t("content_input_code") }));
          return;
        }
        dispatch(activeAccount({ email, code })).then((resp) => {
          if (!resp?.error) {
            nav("/login");
          }
        });
        break;
    }
  };

  return (
   <Layout>
     <div className="mt-10 pt-10 sm-pt-0">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 gap-2 mx-2 py-20">
        <div className="xl:col-start-3 md:col-start-2 lg:col-start-2 col-span-2 border p-5">
          <h2 className="text-3xl">{t("confirm_otp")}</h2>
          <p className="text-base py-3">
            {t("subtitle_opt")}
            <span className="text-rose-500"> {email}</span>. {t("subtitle_opt_input")}
          </p>
          <form className="mt-4">
            <div className="mx-auto max-w-lg relative">
              <input
                className="w-full bg-white py-4 absolute opacity-0"
                type={"text"}
                inputMode="numeric"
                maxLength={6}
                pattern="\d{6}"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <div className="grid grid-cols-6 gap-1 justify-center">
                {new Array(6).fill(0).map((val, index) => {
                  return <BoxSplit index={index} />;
                })}
              </div>
              <div className="submit w-full">
                <button
                  type="button"
                  className="w-full uppercase py-3 mt-4"
                  onClick={handleVerifyAccount}
                >
                  <p className="bg-black text-white text-center my-4 py-3 w-full">
                    {t("confirm")}
                  </p>
                </button>
              </div>

              <div className="text-center pt-2">
                <Link to="/login">{t("back_to_login")}</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
   </Layout>
  );
}

export default ForgotPassword2;

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../../../slices/AlertSlice";
import { OTP_TYPE } from "../../../constants/enum";
import { forgotPassword } from "../../../thunks/AuthThunk";
import { Layout } from "..";

function ForgotPassword() {
  const [t] = useTranslation("app");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleForgot = () => {
    if (email.length <= 0) {
      dispatch(
        setAlert({ type: "error", content: t("notify_valid_email") })
      );
      return;
    }
    dispatch(forgotPassword(email)).then((resp) => {
      if (!resp?.error) {
        nav("/login");
      }
    });
  };

  return (
   <Layout>
     <div className="mt-10 pt-10 sm-pt-0">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 gap-2 mx-2 py-20">
        <div className="xl:col-start-3 md:col-start-2 lg:col-start-2 col-span-2 border p-5">
          <h2 className="text-3xl">{t("forgot_password")}</h2>
          <p className="text-base py-2">
            Hãy nhập email của bạn , chúng tôi sẽ gửi đến mail một mã khôi phục
            tài khoản
            {t("subtitle_forget_password")}
          </p>
          <div className="mt-3">
            <div className="mx-auto max-w-lg">
              <div className="py-2">
                <span className="px-1 text-sm text-gray-600">Email</span>
                <input
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder={t("enter_email")}
                  type="email"
                  className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
              <button
                onClick={handleForgot}
                className=" uppercase py-3 mt-4 w-full"
              >
                <p className="bg-black text-white text-center my-4 py-3 w-full">
                  {t("confirm")}
                </p>
              </button>
              <div className="text-center pt-2">
                <Link to="/login">{t("back_to_login")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </Layout>
  );
}

export default ForgotPassword;

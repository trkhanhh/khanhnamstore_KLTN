import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ForgotPassword2() {
  const [t] = useTranslation("app");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function togglePasswordConfirm() {
    setIsPasswordConfirm((prevState) => !prevState);
  }
  return (
    <div className="mt-10 pt-10 sm-pt-0">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 gap-2 mx-2 py-20">
        <div className="xl:col-start-3 md:col-start-2 lg:col-start-2 col-span-2 border p-5">
          <h2 className="text-3xl">{t("confirm_otp")}</h2>
          <p className="text-base py-3">
            An OTP code has been sent to email
            <span className="text-rose-500">uyscott.work@gmail.com</span>.
            Please enter in the box below.
          </p>
          <form className="mt-4">
            <div className="mx-auto max-w-lg ">
              <div className="grid grid-cols-6 gap-1 justify-center">
                <input
                  type="text"
                  className="w-12 mx-2 px-4 py-2 text-base  border border-black rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <input
                  type="text"
                  className="w-12 mx-2 px-4 py-2 text-base  border border-black rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <input
                  type="text"
                  className="w-12 mx-2 px-4 py-2  text-base  border border-black rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <input
                  type="text"
                  className="w-12 mx-2 px-4 py-2  text-base  border border-black rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <input
                  type="text"
                  className="w-12 mx-2 px-4 py-2  text-base  border border-black rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <input
                  type="text"
                  className="w-12 mx-2 px-4 py-2  text-base  border border-black rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
              <div className="submit w-full">
                <Link
                  to="/forgot-create-password"
                  className=" uppercase py-3 mt-4"
                >
                  <p className="bg-black text-white text-center my-4 py-3 w-full">
                    {t("confirm")}
                  </p>
                </Link>
              </div>

              <div className="text-center pt-2">
                <Link to="/login">{t("back_to_login")}</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword2;

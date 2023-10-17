import { useState } from "react";
import iconEyeClose from "../../../asset/images/eye-closed.png";
import iconEye from "../../../asset/images/eye.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ForgotPassword3() {
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
          <h2 className="text-3xl">{t("create_new_password")}</h2>
          <p className="text-base py-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form className="mt-4">
            <div className="mx-auto max-w-lg">
              <div className="py-2 relative">
                <span className="px-1 text-sm text-gray-600">
                  {t("password")}
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder={t("enter_password")}
                  className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-4 mt-6 text-gray-600"
                  onClick={togglePasswordVisibility}
                  type="button"
                >
                  {isPasswordVisible ? (
                    <img src={iconEye} alt="iconEye" />
                  ) : (
                    <img src={iconEyeClose} alt="iconEyeClose" />
                  )}
                </button>
              </div>
              <div className="py-2 relative">
                <span className="px-1 text-sm text-gray-600">
                  {t("confirm_password")}
                </span>
                <input
                  type={isPasswordConfirm ? "text" : "password"}
                  placeholder={t("enter_confirm_password")}
                  className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-4 mt-6 text-gray-600"
                  onClick={togglePasswordConfirm}
                  type="button"
                >
                  {isPasswordConfirm ? (
                    <img src={iconEye} alt="iconEye" />
                  ) : (
                    <img src={iconEyeClose} alt="iconEyeClose" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="bg-black text-white uppercase w-full py-3 mt-4"
                style={{ backgroundColor: "black" }}
              >
                {t("confirm")}
              </button>
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

export default ForgotPassword3;

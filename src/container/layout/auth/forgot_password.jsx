import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [t] = useTranslation("app");
  return (
    <div className="mt-10 pt-10 sm-pt-0">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 gap-2 mx-2 py-20">
        <div className="xl:col-start-3 md:col-start-2 lg:col-start-2 col-span-2 border p-5">
          <h2 className="text-3xl">{t("forgot_password")}</h2>
          <p className="text-base py-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form className="mt-4">
            <div className="mx-auto max-w-lg">
              <div className="py-2">
                <span className="px-1 text-sm text-gray-600">Email</span>
                <input
                  placeholder={t("enter_email")}
                  type="email"
                  className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
              <Link to="/forgot-OTP" className=" uppercase py-3 mt-4">
                <p className="bg-black text-white text-center my-4 py-3 w-full">
                  {t("confirm")}
                </p>
              </Link>
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

export default ForgotPassword;

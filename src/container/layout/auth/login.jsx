import { useState } from "react";
import iconEyeClose from "../../../asset/images/eye-closed.png";
import iconEye from "../../../asset/images/eye.png";
import { account } from "../../../data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login({ setAccountUser }) {
  const [t] = useTranslation("app");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [accounts, setAccount] = useState(account);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const foundAccount = accounts.find(
      (item) => item.email === email && item.password === password
    );

    if (foundAccount) {
      setAccountUser(foundAccount);
      setLoggedIn(true);
    } else {
      alert(
        "Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu."
      );
    }
  };
  return (
    <div className="mt-10 pt-10 sm-pt-0">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 gap-2 mx-2 py-20">
        {loggedIn ? <></> : <></>}
        <div className="xl:col-start-3 md:col-start-2 lg:col-start-2 col-span-2 border p-5">
          <h2 className="text-3xl">{t("login")}</h2>
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
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
              <div className="py-2 relative">
                <span className="px-1 text-sm text-gray-600">
                  {t("password")}
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder={t("enter_password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <div className="text-end">
                <Link to="/forgot" className="underline">
                  {t("forgot_password")}?
                </Link>
              </div>
              <button
                type="reset"
                className="bg-black text-white uppercase w-full py-3 mt-4"
                style={{ backgroundColor: "black" }}
                onClick={handleLogin}
              >
                {t("login")}
              </button>
              <div className="text-center pt-2">
                {t("not_have_account")}?{" "}
                <Link to="/register" className="underline">
                  {t("register")}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

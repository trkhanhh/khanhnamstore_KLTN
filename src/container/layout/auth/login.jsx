import { useState } from "react";
import iconEyeClose from "../../../asset/images/eye-closed.png";
import iconEye from "../../../asset/images/eye.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../thunks/AuthThunk";
import { setAlert } from "../../../slices/AlertSlice";
import { Layout } from "..";
function Login() {
  const [t] = useTranslation("app");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { logged } = useSelector((state) => state.authReducer);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogin = () => {
    if (validate()) {
      dispatch(login({ username: email, password })).then((resp) => {
        if (!resp?.error) {
          nav("/");
        }
      });
    }
  };
  const validate = () => {
    if (password === "") {
      dispatch(
        setAlert({ type: t("error"), content: "Mật khẩu không được để trống" })
      );
      return false;
    }
    if (email === "") {
      dispatch(
        setAlert({ type: t("error"), content: t("notify_valid_email") })
      );
      return false;
    }
    return true;
  };
  return (
   <Layout>
     <div className="mt-10 pt-10 sm-pt-0">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 gap-2 mx-2 py-20">
        {logged ? <></> : <></>}
        <div className="xl:col-start-3 md:col-start-2 lg:col-start-2 col-span-2 border p-5">
          <h2 className="text-3xl">{t("login")}</h2>
          <p className="text-base py-3">
            {t('subtitle_login')}
          </p>
          <form className="mt-4">
            <div className="mx-auto max-w-lg">
              <div className="py-2">
                <span className="px-1 text-sm text-gray-600">Email</span>
                <input
                  required
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
                  required
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
   </Layout>
  );
}

export default Login;

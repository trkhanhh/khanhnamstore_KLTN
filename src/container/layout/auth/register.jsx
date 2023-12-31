import { useState } from "react";
import iconEyeClose from "../../../asset/images/eye-closed.png";
import iconEye from "../../../asset/images/eye.png";
import styled from "styled-components";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { register } from "../../../thunks/AuthThunk";
import { OTP_TYPE } from "../../../constants/enum";
import { Layout } from "..";
const ErrorText = styled.div`
  color: red;
  text-align: start;
`;
function Register() {
  const [t] = useTranslation("app");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function togglePasswordConfirm() {
    setIsPasswordConfirm((prevState) => !prevState);
  }
  const nav = useNavigate();
  const initError = {
    isErrorUserName: false,
    isErrorPassword: false,
    isErrorEmail: false,

    messageErrorUserName: "",
    messageErrorEmail: "",
    messageErrorPassword: "",
  };
  const [error, setError] = useState(initError);
  const onClickRegister = () => {
    if (name.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorUserName: true,
            messageErrorUserName: t("not_empty"),
          })
      );
    }
    if (email.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorEmail: true,
            messageErrorEmail: t("not_empty"),
          })
      );
    }
    if (password.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorPassword: true,
            messageErrorPassword: t("not_empty"),
          })
      );
    }
    if (password !== confirmPassword) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorPassword: true,
            messageErrorPassword: t("same_password"),
          })
      );
    }

    if (!validator.isEmail(email)) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorEmail: true,
            messageErrorEmail: t("notify_format_email"),
          })
      );
    }
    setError(initError);
    dispatch(register({ name, email, password })).then((resp) => {
      if (!resp?.error) {
        nav(`/forgot-OTP/${email}/${OTP_TYPE.VERIFY_ACCOUNT}`);
      }
    });
  };

  return (
    <Layout>
      <div className="mt-10 pt-10 sm-pt-0">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4  gap-2 mx-2 py-20">
        <div className="xl:col-start-3 md:col-start-2 lg:col-start-2 col-span-2 border p-5">
          <h2 className="text-3xl">{t("register")}</h2>
          <p className="text-base py-3">
          {t('subtitle_register')}
          </p>
          <form className="mt-4">
            <div className="mx-auto max-w-lg">
              <div className="py-2">
                <label className="px-1 text-base text-gray-600">
                  {t("your_name")}
                </label>
                <input
                  placeholder={t("enter_your_name")}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2  text-sm  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                {error.isErrorUserName && (
                  <ErrorText className="form-text danger">
                    {error.messageErrorUserName}
                  </ErrorText>
                )}
              </div>
              <div className="py-2">
                <lab4 className="px-1 text-base text-gray-600">Email</lab4>
                <input
                  placeholder={t("enter_email")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2  text-sm  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                {error.isErrorEmail && (
                  <ErrorText className="form-text danger">
                    {error.messageErrorEmail}
                  </ErrorText>
                )}
              </div>
              <div className="py-2 relative">
                <label className="px-1 text-base text-gray-600">
                  {t("password")}
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder={t("enter_password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2  text-sm  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                {error.isErrorPassword && (
                  <ErrorText className="form-text danger">
                    {error.messageErrorPassword}
                  </ErrorText>
                )}
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
                <label className="px-1 text-base text-gray-600">
                  {t("confirm_password")}
                </label>
                <input
                  type={isPasswordConfirm ? "text" : "password"}
                  placeholder={t("enter_confirm_password")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2  text-sm  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
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
                className="bg-black text-white uppercase w-full py-3 mt-4"
                type="button"
                style={{ backgroundColor: "black" }}
                onClick={onClickRegister}
              >
                {t("register")}
              </button>
              <div className="text-center pt-2">
                {t("already_account")}?{" "}
                <Link to="/login" className="underline">
                  {t("login")}
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

export default Register;

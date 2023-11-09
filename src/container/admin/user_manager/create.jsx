import { useTranslation } from "react-i18next";
import HeaderAdmin from "../component/header";
import HomeAdmin from "..";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../slices/AlertSlice";
import { addUser } from "../../../thunks/UserThunk";

function UserCreate() {
  const [t] = useTranslation("app");
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const handleCreateUser = () => {
    dispatch(addUser(user));
  };
  return (
    <HomeAdmin>
      <div className="w-10/12 bg-slate-700 text-white h-screen  flex flex-col overflow-y-hidden ">
        <HeaderAdmin />
        <div className="w-full overflow-x-hidden">
          <main className="w-full flex-grow p-6">
            <h1 className="w-full text-3xl pb-6">{t("add_user")}</h1>

            <div className="flex flex-wrap">
              <div className="w-full  my-6 pr-0 lg:pr-2">
                <div className="leading-loose">
                  <div className="p-10 bg-white rounded shadow-xl">
                    <div>
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="name"
                      >
                        {t("your_name")}
                      </label>
                      <input
                        onChange={(e) => {
                          setUser({ ...user, fullname: e.target.value });
                        }}
                        className="w-full px-5 py-2 text-sm  text-gray-700 bg-gray-200 rounded"
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder={t("enter_your_name")}
                        aria-label="Name"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="Email"
                      >
                        Email
                      </label>
                      <input
                        onChange={(e) => {
                          setUser({ ...user, email: e.target.value });
                        }}
                        className="w-full px-5 py-2 text-sm  text-gray-700 bg-gray-200 rounded"
                        id="Email"
                        name="Email"
                        type="email"
                        required
                        placeholder={t("enter_email")}
                        aria-label="Email"
                      />
                    </div>

                    <div className="mt-2">
                      <label className="block text-base text-gray-600">
                        {t("Phone")}
                      </label>
                      <input
                        onChange={(e) => {
                          setUser({ ...user, phone: e.target.value });
                        }}
                        className="w-full px-5 py-2 text-sm  text-gray-700 bg-gray-200 rounded"
                        type="text"
                        required
                        placeholder={t("enter_phone")}
                        aria-label="confirmPhone"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="password"
                      >
                        {t("password")}
                      </label>
                      <input
                        onChange={(e) => {
                          setUser({ ...user, password: e.target.value });
                        }}
                        className="w-full px-5 py-2 text-sm  text-gray-700 bg-gray-200 rounded"
                        id="password"
                        name="password"
                        type="text"
                        required
                        placeholder={t("enter_password")}
                        aria-label="password"
                      />
                    </div>
                    <div className="mt-6 text-right">
                      <Link
                        to={"/admin/user-manager"}
                        type="button"
                        className="px-4 py-1 text-white font-light tracking-wider mx-3 rounded"
                        style={{ backgroundColor: "black" }}
                      >
                        {t("come_back")}
                      </Link>
                      <button
                        onClick={handleCreateUser}
                        className="px-4 py-1 text-white font-light tracking-wider  rounded"
                        style={{ backgroundColor: "black" }}
                      >
                        {t("save_update")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </HomeAdmin>
  );
}

export default UserCreate;

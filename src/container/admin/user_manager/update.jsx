import { useTranslation } from "react-i18next";
import HeaderAdmin from "../component/header";
import HomeAdmin from "..";

function UserUpdate() {
  const [t] = useTranslation("app");
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
                  <form className="p-10 bg-white rounded shadow-xl">
                    <div>
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="name"
                      >
                        {t("your_name")}
                      </label>
                      <input
                        className="w-full px-5 py-2 text-sm text-gray-700 bg-gray-200 rounded"
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
                        className="w-full px-5 py-2 text-sm text-gray-700 bg-gray-200 rounded"
                        id="Email"
                        name="Email"
                        type="text"
                        required
                        placeholder={t("enter_email")}
                        aria-label="Email"
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
                        className="w-full px-5 py-2 text-sm text-gray-700 bg-gray-200 rounded"
                        id="password"
                        name="password"
                        type="text"
                        required
                        placeholder={t("enter_email")}
                        aria-label="password"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="confirmPassword"
                      >
                        {t("confirm_password")}
                      </label>
                      <input
                        className="w-full px-5 py-2 text-sm text-gray-700 bg-gray-200 rounded"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="text"
                        required
                        placeholder={t("enter_confirm_password")}
                        aria-label="confirmPassword"
                      />
                    </div>
                    <div className="mt-6 text-right">
                      <button
                        className="px-4 py-1 text-white font-light tracking-wider mx-3 rounded"
                        style={{ backgroundColor: "black" }}
                        type="submit"
                      >
                        {t("come_back")}
                      </button>
                      <button
                        className="px-4 py-1 text-white font-light tracking-wider  rounded"
                        style={{ backgroundColor: "black" }}
                        type="submit"
                      >
                        {t("save_update")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </HomeAdmin>
  );
}

export default UserUpdate;

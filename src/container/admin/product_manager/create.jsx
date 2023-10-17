import { useTranslation } from "react-i18next";
import HeaderAdmin from "../component/header";

function ProductCreate() {
  const [t] = useTranslation("app");
  return (
    <div className="w-10/12 bg-slate-700 text-white h-screen flex flex-col overflow-y-hidden ">
      <HeaderAdmin />
      <div className="w-full overflow-x-hidden ">
        <main className="w-full flex-grow p-6">
          <h1 className="w-full text-3xl pb-6">{t("add_product")}</h1>

          <div className="flex flex-wrap">
            <div className="w-full  my-6 pr-0 lg:pr-2">
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl">
                  <div>
                    <label
                      className="block text-sm text-gray-600"
                      htmlhtmlFor="txtCode"
                    >
                      {t("code_orders")}
                    </label>
                    <input
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded outline-0"
                      id="txtCode"
                      name="txtCode"
                      type="text"
                      required
                      placeholder={t("enter_code_product")}
                      aria-label="txtCode"
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      className="block text-sm text-gray-600"
                      htmlhtmlFor="txtName"
                    >
                      {t("name_product")}
                    </label>
                    <input
                      className="w-full px-5  py-1 text-gray-700 bg-gray-200 rounded outline-0"
                      id="txtName"
                      name="txtName"
                      type="text"
                      required
                      placeholder={t("enter_name_product")}
                      aria-label="txtName"
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      className="block text-sm text-gray-600"
                      htmlhtmlFor="txtPrice"
                    >
                      {t("price")}
                    </label>
                    <input
                      className="w-full px-5  py-1 text-gray-700 bg-gray-200 rounded outline-0"
                      id="txtPrice"
                      name="txtPrice"
                      type="text"
                      required
                      placeholder={t("enter_price_product")}
                      aria-label="txtPrice"
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      className="block text-sm text-gray-600"
                      htmlhtmlFor="price"
                    >
                      {t("color")}
                    </label>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white sm:flex ">
                      <li className="w-full ">
                        <div className="flex items-center pl-3">
                          <input
                            id="vue-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="vue-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            Blue
                          </label>
                        </div>
                      </li>
                      <li className="w-full ">
                        <div className="flex items-center pl-3">
                          <input
                            id="react-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="react-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            Green
                          </label>
                        </div>
                      </li>
                      <li className="w-full ">
                        <div className="flex items-center pl-3">
                          <input
                            id="angular-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="angular-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            White
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            Brown
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            Black
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            Pink
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            Orange
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            Red
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            Purple
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <label
                      className="block text-sm text-gray-600"
                      htmlhtmlFor="price"
                    >
                      {t("size")}
                    </label>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white sm:flex ">
                      <li className="w-full ">
                        <div className="flex items-center pl-3">
                          <input
                            id="vue-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="vue-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            S
                          </label>
                        </div>
                      </li>
                      <li className="w-full ">
                        <div className="flex items-center pl-3">
                          <input
                            id="react-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="react-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            M
                          </label>
                        </div>
                      </li>
                      <li className="w-full ">
                        <div className="flex items-center pl-3">
                          <input
                            id="angular-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="angular-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            L
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            XL
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            XXL
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="laravel-checkbox-list"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 "
                          />
                          <label
                            htmlhtmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                          >
                            3XL
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <label
                      className=" block text-sm text-gray-600"
                      htmlhtmlFor="message"
                    >
                      {t("describe")}
                    </label>
                    <textarea
                      className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded outline-0"
                      id="message"
                      name="message"
                      rows="6"
                      required
                      placeholder={t("enter_describe")}
                      aria-label="message"
                    ></textarea>
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
  );
}

export default ProductCreate;

import HeaderAdmin from "../component/header";
import { useTranslation } from "react-i18next";
import Pagination from "../component/pagination";
import { PAGINATION } from "../../../contanst";
import { useEffect, useLayoutEffect, useState } from "react";
import HomeAdmin from "..";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder, getOrderList } from "../../../thunks/PaymentThunk";

function OrdersManager() {
  const [t] = useTranslation("app");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const { manager } = useSelector((state) => state.orderReducer);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderList());
  }, []);
  useLayoutEffect(() => {
    setSearch(manager.orders);
    setTotalPage(Math.ceil(manager.orders.length / 10));
  }, [manager.orders]);

  useLayoutEffect(() => {
    let rs = [];
    for (let od of manager.orders) {
      if (od.receiverName.includes(query) || od.id == query) {
        rs.push(od);
      }
    }
    if (query.trim() == "") {
      rs = manager.orders;
    }
    setSearch(rs);
  }, [query]);
  useLayoutEffect(() => {
    setTotalPage(Math.ceil(search.length / 10));
  }, [search]);
  const handleConfirmOrder = (id) => {
    dispatch(confirmOrder(id));
  };

  return (
    <HomeAdmin>
      <div className="w-10/12 h-screen bg-slate-700 text-white  flex flex-col overflow-y-hidden ">
        <HeaderAdmin />
        <div className="w-full overflow-x-hidden">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl  pb-6">{t("order_manager")}</h1>
            <div className="flex justify-end">
              <form className="lg:w-4/12 mx-2 pt-3 ">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only "
                >
                  {t("search")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    id="default-search"
                    className="block w-full outline-0 p-2  pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("search")}
                    required
                  />
                </div>
              </form>
            </div>

            <div className="w-full mt-12">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i>
                {t("statistical_tables")}
              </p>
              <div className="bg-white overflow-auto">
                <table className="text-left w-full border-collapse text-black">
                  <thead>
                    <tr>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        {t("code_orders")}
                      </th>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        {t("buyer")}
                      </th>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        {t("Amount")}
                      </th>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        {t("Status")}
                      </th>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        {t("purchase_date")}
                      </th>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        {t("action")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {search.slice((page - 1) * 10, page * 10).map((od) => {
                      return (
                        <tr className="hover:bg-grey-lighter">
                          <td className="py-4 px-6 border-b border-grey-light">
                            {od.id}
                          </td>
                          <td className="py-4 px-6 border-b border-grey-light">
                            {od.receiverName}
                          </td>
                          <td className="py-4 px-6 border-b border-grey-light">
                            {od.totalAmount.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td className="py-4 px-6 border-b border-grey-light">
                            {od.status.name}
                          </td>
                          <td className="py-4 px-6 border-b border-grey-light">
                            {od.createdDate}
                          </td>
                          <td className="py-4 px-6 border-b border-grey-light">
                            {od.status.id == 1 && (
                              <button
                                onClick={() => {
                                  handleConfirmOrder(od.id);
                                }}
                                className="border border-blue-600 text-white uppercase py-2 px-3 bg-blue-600 rounded-lg mt-3 mx-1 text-xs"
                              >
                                {t("confirm_order")}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <Pagination
                  totalPage={totalPage}
                  setPage={setPage}
                ></Pagination>
              </div>
            </div>
          </main>
        </div>
      </div>
    </HomeAdmin>
  );
}

export default OrdersManager;

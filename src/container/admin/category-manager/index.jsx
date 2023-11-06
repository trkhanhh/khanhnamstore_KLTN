import { Link } from "react-router-dom";
import HeaderAdmin from "../component/header";
import { useTranslation } from "react-i18next";
import Pagination from "../component/pagination";
import { useEffect, useLayoutEffect, useState } from "react";
import HomeAdmin from "..";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, lockOrUnLockUser } from "../../../thunks/UserThunk";
import { setSearch } from "../../../slices/UserSlice";
import {
  deleteCategory,
  getAllCategories,
} from "../../../thunks/CategoryThunk";

function CategoryManager() {
  const [t] = useTranslation("app");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const { categories } = useSelector((state) => state.categoryReducer);
  useLayoutEffect(() => {
    if (categories.length == 0) {
      dispatch(getAllCategories());
    }
  }, []);
  useLayoutEffect(() => {
    setSearch(categories);
    setTotalPage(Math.ceil(categories.length / 10));
  }, [categories]);
  useLayoutEffect(() => {
    setTotalPage(Math.ceil(search.length / 10));
  }, [search]);

  useLayoutEffect(() => {
    let cat_search = [];
    for (let cat of categories) {
      if (cat.name.includes(query) || cat.id == query) {
        cat_search.push(cat);
      }
    }
    if (query == "") {
      cat_search = [...categories];
    }
    setSearch(cat_search);
  }, [query]);

  const handleDelete = (id) => {
    if (window.confirm("Do u want delete?")) {
      dispatch(deleteCategory(id));
    }
  };
  return (
    <HomeAdmin>
      <div className="w-10/12 bg-slate-700 text-white h-screen  flex flex-col overflow-y-hidden ">
        <HeaderAdmin />
        <div className="w-full overflow-x-hidden">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl  pb-6">{t("Category Manager")}</h1>
            <div className="flex justify-between">
              <Link
                to="/admin/category-create"
                className="border border-sky-600 text-white uppercase py-2 text-base px-10 bg-sky-600 rounded-full mt-3"
              >
                {t("add")}
              </Link>
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
                        STT
                      </th>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        {t("Category Name")}
                      </th>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        Image
                      </th>
                      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        {t("operate")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {search
                      .slice((page - 1) * 10, page * 10)
                      .map((cat, index) => {
                        return (
                          <tr key={index} className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">
                              {cat.id}
                            </td>
                            <td className="py-4 px-6 border-b border-grey-light">
                              {cat.name}
                            </td>
                            <td className="py-4 px-6 border-b border-grey-light">
                              <img
                                src={cat.imageBanner}
                                style={{
                                  maxWidth: "64px",
                                  maxHeight: "64px",
                                  borderRadius: 4,
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td className="py-4 px-6 border-b border-grey-light">
                              <Link
                                to={`/admin/category-edit/${cat.id}`}
                                className="border border-yellow-400 text-white uppercase py-2 px-3 bg-yellow-400 rounded-lg mt-3 mx-1 text-xs"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => {
                                  handleDelete(cat.id);
                                }}
                                className="border border-rose-600 text-white uppercase py-2 px-3 bg-rose-600 rounded-lg mt-3 mx-1 text-xs"
                              >
                                DELETE
                              </button>
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

export default CategoryManager;

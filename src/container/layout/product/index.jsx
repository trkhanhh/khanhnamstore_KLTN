import { useLayoutEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Pagination from "../component/pagination";
import { Layout } from "..";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct } from "../../../thunks/ProductThunk";
import { setPage } from "../../../slices/ProductSlice";

function Product() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [t] = useTranslation("app");
  const { categories } = useSelector((state) => state.categoryReducer);
  const { products, totalPage, page } = useSelector(
    (state) => state.productReducer
  );
  const [price, setPrice] = useState({});
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const data = {};
    let ct = searchParams.get("category");
    if (ct) {
      data.category_id = ct;
    }
    dispatch(filterProduct({ page: 0, ...data }));
  }, []);

  const handleFilterProduct = () => {
    const data = { page: 0 };
    if (price.smallPrice && price.largePrice) {
      data.price = price;
    }
    if (searchParams.get("category") != -1) {
      data.category_id = searchParams.get("category");
    }
    dispatch(filterProduct(data));
  };

  useLayoutEffect(() => {
    dispatch(filterProduct({ page: page }));
  }, [page]);

  return (
    <Layout>
      <div className="pt-20 mt-8 px-4">
        <div className="sm:w-5/6 w-full mx-auto sm:mt-10 px-6 lg:px-0">
          <div className="history">
            <Link to="/" className="uppercase text-xs px-1">
              {t("home")}
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "10px" }}
            />
            <Link to="/" className="uppercase text-xs px-1">
              {t("product")}
            </Link>
          </div>
          <h3 className="uppercase sm:text-xl md:text-2xl lg:text-3xl my-6">
            {t("Product Filter")}
          </h3>
          <div className="grid mt-12 sm:mt-0 lg:grid-cols-6 xl:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-2 h-12 items-center">
            <select
              onChange={(e) => {
                searchParams.set("category", e.target.value);
                window.history.pushState(
                  null,
                  "",
                  "?category=" + e.target.value
                );
              }}
              id="small"
              className="block w-30 py-2 text-xs sm:text-sm text-gray-900 border border-black  focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={-1}>{t("categories")}</option>
              {categories
                .filter((val) => val.isPrimary == null || !val.isPrimary)
                .map((category, index) => {
                  return (
                    <option
                      key={index}
                      selected={
                        searchParams.get("category") == category.id
                          ? "selected"
                          : ""
                      }
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  );
                })}
            </select>
            <input
              type="number"
              placeholder="Min price"
              className="border border-black font-light text-sm py-2 px-2 h-10"
              onChange={(e) => {
                setPrice({ ...price, smallPrice: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Max price"
              className="border border-black font-light text-sm py-2 px-2 h-10"
              onChange={(e) => {
                setPrice({ ...price, largePrice: e.target.value });
              }}
            />
            <button
              onClick={handleFilterProduct}
              className="w-full bg-black py-2 h-10 text-white"
            >
              Filter
            </button>
          </div>
          <div className="grid mt-12 lg:mt-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3">
            {products.map((item) => (
              <div className="product-item py-2">
                <Link to={`/product-detail/${item.id}`}>
                  <div className="product_item-img rounded overflow-hidden">
                    <img
                      src={item.imageBanner}
                      alt="product"
                      style={{ height: "350px" }}
                      className="w-full object-cover"
                    />
                  </div>
                </Link>
                <div className="product_item-name my-2 max-h-16 overflow-hidden">
                  <Link
                    to="/product-detail"
                    className="text-sm sm:text-base lg:text-xl  text-overflow overflow-ellipsis line-clamp-2 font-medium text-gray-700"
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="product_item-pride">
                  <p className="text-xs sm:text-sm lg:text-base">
                    {item.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {products.length == 0 && (
              <div className="flex w-full">
                <p className="text-center">{t("empty_product")}</p>
              </div>
            )}
          </div>
          <nav aria-label="Page navigation example" className=" text-end py-3">
            <Pagination totalPage={totalPage} setPage={setPage}></Pagination>
          </nav>
        </div>
      </div>
    </Layout>
  );
}

export default Product;

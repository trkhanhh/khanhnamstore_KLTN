import { useEffect, useState } from "react";
import { listProduct } from "../../../data";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { PAGINATION } from "../../../contanst";
import Pagination from "../component/pagination";
function Product() {
  const [t] = useTranslation("app");
  const [products, setProducts] = useState([...listProduct]);
  const [productsPage, setProductsPage] = useState(listProduct.slice(0, PAGINATION.LIMIT));
  const [numberPagination, setNumberPagination] = useState({
    totalPage: 10,
    currentPage: PAGINATION.CURRENT_PAGE,
  });

  useEffect(() => {
    setNumberPagination({
      ...numberPagination,
      totalPage: Math.ceil(products.length / PAGINATION.LIMIT),
    });
  }, [numberPagination.currentPage]);

  const onChangePage = (page) => {
    console.log(productsPage)
    setNumberPagination((pre) => ({
      ...pre,
      currentPage: page,
    }));
  };

  useEffect(() => {
    const newProduct = [...products].slice(
      (numberPagination.currentPage - 1) * PAGINATION.LIMIT,
      numberPagination.currentPage * PAGINATION.LIMIT
    );
    console.log('newProduct', newProduct)
    setProductsPage((pre) => (pre = newProduct));
  }, [numberPagination.currentPage, numberPagination.totalPage])

  return (
    <div className="pt-20 mt-5 sm:mt-0 px-8">
      <div className="sm:w-5/6 w-full mx-auto">
        <div className="history">
          <Link to="/" className="uppercase text-xs px-1">
          {t("home")}
          </Link>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
          <Link to="/" className="uppercase text-xs px-1">
          {t("product")}
          </Link>
        </div>
        <h3 className="uppercase text-4xl my-6">{t("price_level")}</h3>
        <div className="grid lg:grid-cols-6 xl:grid-cols-6 md:grid-cols-5 grid-cols-3  gap-2">
          <select
            id="small"
            className="block w-30 py-2 mb-6 text-sm text-gray-900 border border-black  focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected>{t("filter")}</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
          <select
            id="small"
            className="block w-30 py-2 mb-6 text-sm text-gray-900 border border-black  focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected>{t("size")}</option>
            <option value="US">S</option>
            <option value="CA">M</option>
            <option value="FR">L</option>
            <option value="DE">XL</option>
            <option value="DE">XXL</option>
          </select>
          <select
            id="small"
            className="block w-30 py-2 mb-6 text-sm text-gray-900 border border-black  focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected>{t("color")}</option>
            <option value="US">Green</option>
            <option value="CA">Blue</option>
            <option value="FR">Yellow</option>
            <option value="DE">Pink</option>
          </select>
          <select
            id="small"
            className="block w-30 py-2 mb-6 text-sm mr-2 text-gray-900 border border-black  focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected>{t("type_text")}</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
          <select
            id="small"
            className="block w-50 py-2 mb-6 text-sm text-gray-900 border border-black  focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected>{t("price_from_low_to_high")}</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <div className="grid  xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3">
          {productsPage.map((item, index) => (
            <div className="product-item py-2">
              <Link to="/product-detail">
                <div className="product_item-img rounded overflow-hidden">
                  <img
                    src={item.image}
                    alt="product"
                    style={{ height: "350px" }}
                    className="w-full object-cover"
                  />
                </div>
              </Link>

              <div className="product_item-name max-h-16 overflow-hidden">
                <Link
                  to="/product-detail"
                  className="text-xl text-overflow overflow-ellipsis line-clamp-2 font-medium text-gray-700"
                >
                  {item.name}
                </Link>
              </div>
              <div className="product_item-pride">
                <p className="text-base">$ {item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <nav aria-label="Page navigation example" className=" text-end py-3">
        <Pagination
                totalPage={numberPagination.totalPage}
                setPage={onChangePage}
              ></Pagination>
        </nav>
      </div>
    </div>
  );
}

export default Product;

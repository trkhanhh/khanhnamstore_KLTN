import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Layout } from "..";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../component/pagination";
import { useSelector } from "react-redux";

function Search() {
    const [t] = useTranslation("app");
    const { totalPage } = useSelector(
        (state) => state.productReducer
      );
    const [resultProduct, setResultProduct] = useState([])
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
                {t("result_search")}
              </Link>
            </div>
            <h3 className="uppercase sm:text-xl md:text-2xl lg:text-3xl my-6">
              {t("result_search")}
            </h3>
           
            <div className="grid mt-12 lg:mt-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3">
              {resultProduct.map((item) => (
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
                    <p className="text-xs sm:text-sm lg:text-base">$ {item.price}</p>
                  </div>
                </div>
              ))}
              {resultProduct.length == 0 && (
                <div className="flex w-full">
                  <p className="text-center">Không có tìm được sản phẩm bạn muốn</p>
                </div>
              )}
            </div>
            <nav aria-label="Page navigation example" className=" text-end py-3">
              <Pagination totalPage={totalPage}></Pagination>
            </nav>
          </div>
        </div>
      </Layout>
     );
}

export default Search;
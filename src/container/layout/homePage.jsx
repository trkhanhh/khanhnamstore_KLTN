import { useTranslation } from "react-i18next";
import { useLayoutEffect, useState } from "react";
import poster from "../../asset/images/slide.png";
import cloth from "../../asset/images/cloth_1.png";
import cloth_1 from "../../asset/images/cloth_1.png";
import cloth_2 from "../../asset/images/cloth_2.png";
import logoipsum from "../../asset/images/logoipsum.png";
import logoipsum_1 from "../../asset/images/logoipsum_1.png";
import logoipsum_2 from "../../asset/images/logoipsum_2.png";
import logoipsum_3 from "../../asset/images/logoipsum_3.png";
import { Link } from "react-router-dom";
import SlideProduct from "./component/slide_product";
import { comments } from "../../data";
import { Layout } from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewCollection,
  getNewProduct,
  getProductComment,
  sendFeedBack,
} from "../../thunks/ProductThunk";
import { setAlert } from "../../slices/AlertSlice";

function HomePage() {
  const [t] = useTranslation("app");
  const [email, setEmail] = useState("");
  window.history.pushState(null, "", "http://localhost:3000/");
  const { newProduct, newCollection, productComment } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getNewProduct());
    dispatch(getNewCollection());
    dispatch(getProductComment());
  }, []);
  const handleSendFeedBack = () => {
    if (email.trim() == "") {
      dispatch(setAlert({ type: "error", content: t("notify_valid_email") }));
      return;
    }
    dispatch(sendFeedBack());
    setEmail("");
  };
  return (
    <Layout>
      <article className="mt-20 sm:mt-0">
        <div className="poster relative overflow-hidden">
          <img src={poster} alt="poster" />
          <div className="absolute poster-info w-full">
            <h4 className="lg:text-8xl text-2xl sm:text-4xl xl:text-8xl md:text-6xl text-center text-white ">
              {t("welcome")}
            </h4>
            <p className="text-white lg:text-lg text-xs sm:text-sm md:text-md italic mt-2">
              {t("subtitle_slide_home")}
            </p>
          </div>
          <div className="absolute poster-content text-center m-auto w-full flex justify-center">
            <p className="text-white sm:w-10/12 md:w-10/12 lg:w-2/4 hidden sm:block sm:text-xs md:text-base ">
              {t("subtitle_home")}
            </p>
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <div className="about-us py-8">
            <div className="grid lg:grid-cols-5 grid-cols-1  gap-7">
              <div className="sm:col-span-2 col-span-5">
                <h4 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold uppercase">
                  {t("about_us")}
                </h4>
                <p className="py-5 leading-7 text-sm">{t("about_text")}</p>
                <button className="bg-black border border-black text-white uppercase py-3 w-3/6 mt-4 text-xs sm:text-sm md:text-base">
                  {t("explode_more")}
                </button>
              </div>
              <div className="sm:col-span-3 col-span-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="cloth-item">
                    <img src={cloth} alt="product" className="h-4/5 w-full" />
                  </div>
                  <div className="cloth-item">
                    <img
                      src={cloth_1}
                      alt="product"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="cloth-item">
                    <img src={cloth_2} alt="product" className="h-4/5 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="new_product py-8">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl pt-20 pb-2 text-center font-bold uppercase">
              {t("new_product")}
            </h2>
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              {newProduct.map((pro, index) => {
                return (
                  <div key={index} className="product-item py-5">
                    <div className="product_item-img rounded overflow-hidden">
                      <Link to={`/product-detail/${pro.id}`}>
                        <img
                          src={pro.imageBanner}
                          alt="product"
                          style={{ height: "350px" }}
                          className="object-cover w-full "
                        />
                      </Link>
                    </div>
                    <div className="product_item-name max-h-16 mt-2 overflow-hidden">
                      <Link
                        to={`/product-detail/${pro.id}`}
                        className="text-sm sm:text-base lg:text-xl text-overflow overflow-ellipsis line-clamp-2 font-medium "
                      >
                        {pro.name}
                      </Link>
                    </div>
                    <div className="product_item-pride">
                      <p className="text-xs sm:text-sm lg:text-base">
                        {pro.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full text-center">
              <Link
                to={"/product"}
                className="bg-black border border-black text-white uppercase py-3 mt-4 px-10 text-xs"
              >
                {t("see_more")}
              </Link>
            </div>
          </div>
          {newCollection.length > 0 && (
            <div className="new_collections py-8" id="new-collection">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl pt-20 text-center font-bold uppercase">
                {t("new_collection")}
              </h2>
              <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3">
                {newCollection.map((pro, index) => {
                  return (
                    <div key={index} className="product-item py-5">
                      <div className="product_item-img rounded overflow-hidden">
                        <Link to={`/product-detail/${pro.id}`}>
                          <img
                            src={pro.imageBanner}
                            alt="product"
                            style={{ height: "350px" }}
                            className="object-cover w-full "
                          />
                        </Link>
                      </div>
                      <div className="product_item-name max-h-16 overflow-hidden">
                        <Link
                          to={`/product-detail/${pro.id}`}
                          className="text-sm sm:text-base lg:text-xl text-overflow overflow-ellipsis line-clamp-2 font-medium "
                        >
                          {pro.name}
                        </Link>
                      </div>
                      <div className="product_item-pride">
                        <p className="text-xs sm:text-sm lg:text-base">
                          {pro.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full text-center">
                <Link
                  to={"/product"}
                  className="bg-black border border-black text-white uppercase py-3 mt-4 px-10 text-xs"
                >
                  {t("see_more")}
                </Link>
              </div>
            </div>
          )}

          <div className="new_collections text-center py-4 ">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl pt-20 text-center font-bold uppercase">
              {t("our_partners")}
            </h2>
            <p className="lg:w-2/4 text-center py-3 mx-auto text-sm sm:text-base">
              {t("our_partners_text")}
            </p>
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 gap-3 sm:grid-cols-2">
              <div className="product-item py-5 my-auto">
                <img
                  src={logoipsum}
                  alt="our_partners"
                  className="w-3/5 mx-auto sm:w-4/5"
                />
              </div>
              <div className="product-item py-5 my-auto">
                <img
                  src={logoipsum_1}
                  alt="our_partners"
                  className="w-3/5 mx-auto sm:w-4/5"
                />
              </div>
              <div className="product-item py-5 my-auto">
                <img
                  src={logoipsum_2}
                  alt="our_partners"
                  className="w-3/5 mx-auto sm:w-4/5"
                />
              </div>
              <div className="product-item py-5 my-auto">
                <img
                  src={logoipsum_3}
                  alt="our_partners"
                  className="w-3/5 mx-auto sm:w-4/5"
                />
              </div>
            </div>
          </div>
          <div className="new_feedbacks text-center pt-20">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl py-2 text-center font-bold uppercase">
              {t("our_feedbacks")}
            </h2>
            <p className="lg:w-2/4 text-center py-5 mx-auto text-sm sm:text-base">
              {t("feedbacks_text")}
            </p>
            <SlideProduct comments={productComment} />
          </div>
          <div className="new_feedbacks text-center py-20">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl py-3 text-center font-bold uppercase">
              {t("contact_to_us")}
            </h2>
            <p className="lg:w-2/4 text-center py-3 mx-auto text-sm sm:text-base">
              {t("contact_email_text")}
            </p>
            <div className="lg:w-2/4  mx-auto">
              <div className="mt-4">
                <div className="mx-auto max-w-lg">
                  <div className="py-2 flex">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      placeholder={t("enter_email")}
                      type="text"
                      className="w-full px-4 py-2  text-base  border border-gray-300 outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                    />
                    <button
                      onClick={handleSendFeedBack}
                      className="bg-black text-white uppercase py-3  px-5 text-sm"
                    >
                      {t("send")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export default HomePage;

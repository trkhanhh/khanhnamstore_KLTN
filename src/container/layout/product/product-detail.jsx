import Slideshow from "../component/slideshow";
import product_1 from "../../../asset/images/product_1.png";
import product_2 from "../../../asset/images/product_2.png";
import product_3 from "../../../asset/images/product_3.png";
import product_4 from "../../../asset/images/product_4.png";
import { useState } from "react";
import SlideProduct from "../component/slide_product";
import { comments } from "../../../data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faLeftRight,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function ProductDetail() {
  const [t] = useTranslation("app");
  const images = [product_1, product_2, product_3, product_2];
  const [quantity, setQuantity] = useState(1);
  const [commentUser, setCommentUser] = useState(comments);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10)); // Chuyển đổi giá trị thành số nguyên
  };

  const handComment = () => {
    // Sử dụng giá trị rating và comment tại đây
    console.log("Rating:", rating);
    console.log("Comment:", comment);
  };

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
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
          <Link to="/" className="uppercase text-xs px-1">
            LOREMIPSUM PRODUCTS
          </Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-2  py-10">
          <div className="xl:col-span-4">
            <Slideshow images={images} />
          </div>
          <div className="xl:col-span-3 px-2">
            <div className="product-title">
              <h1 className="xl:text-3xl text-3xl font-normal pb-1 h-20 overflow-hidden line-clamp-2">
                Lorem Ipsum is simply dummy text of the printing
              </h1>
            </div>
            <div className="product-information py-1">
              <div className="product-information-title text-base">
                <h4 className="text-base uppercase py-3 font-medium">
                  {t("information")}
                </h4>
                <ul className="text-sm">
                  <li className="leading-6 list-disc mx-6">
                    Material: <span>Cotton</span>.
                  </li>
                  <li className="leading-6 list-disc mx-6">Relaxed Fit.</li>
                  <li className="leading-6 list-disc mx-6">
                    The print on the front and back of the shirt uses
                    silk-screen printing technology.
                  </li>
                </ul>
              </div>
            </div>
            <div className="product-color py-1">
              <h4 className="text-base uppercase py-3 font-medium">
                {t("color")}
              </h4>
              <div className="grid grid-cols-3 xl:grid-cols-6 lg:grid-cols-7 md:grid-cols-6 gap-2">
                <button className="text-xs font-medium bg-slate-900 text-white py-2 px-3 mx-1 border uppercase">
                  Blue
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  Green
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  White
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  Brown
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  Black
                </button>
              </div>
            </div>
            <div className="product-size py-1">
              <h4 className="text-base uppercase py-3 font-medium">
                {t("size")}
              </h4>
              <div className="grid grid-cols-6 xl:grid-cols-7 lg:grid-cols-7 md:grid-cols-9 gap-1">
                <button className="text-xs font-medium bg-slate-900 text-white py-1 px-3 mx-1 border uppercase">
                  S
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  M
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  L
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  XL
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  XXL
                </button>
                <button className="text-xs font-medium bg-white hover:bg-slate-900 hover:text-white text-black py-2 px-3 mx-1 border uppercase">
                  3XL
                </button>
              </div>
            </div>
            <div className="product-quantity py-1">
              <h4 className="text-base uppercase py-3 font-medium">
                {t("quality")}
              </h4>
              <div className="flex items-center ">
                <button
                  className="px-3 py-1 border border-gray-300 text-black "
                  onClick={handleDecrease}
                >
                  -
                </button>
                <input
                  className="w-14 pl-3 text-center border border-gray-300 py-1"
                  type="number"
                  value={quantity}
                  readOnly
                />
                <button
                  className="px-3 py-1 border border-gray-300 text-black "
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
            </div>
            <div className="product-btn flex justify-between pt-5 sm:pt-2">
              <div className="w-3/6 pe-3">
                <button className="bg-black text-white py-2 w-full px-5 border ">
                  {t("buy_now")}
                </button>
              </div>
              <div className="w-3/6 pl-3">
                <button className=" py-2 w-full px-5 border">
                  {t("add_cart")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="review">
          <h1 className="text-4xl my-5 py-3"> {t("review")}</h1>
          <div className="flex">
            <div className="avatar">
              <img
                src={product_1}
                className="rounded-full w-10 h-10"
                alt="product"
              />
            </div>
            <div className="info px-3">
              <h6 className="font-medium">Duy Scott</h6>
              <p className="text-xs font-normal">UX/UI Design</p>
            </div>
          </div>
          <div className="thinks-product">
            <div className="thinks-product-title">
              <h5 className="text-xl font-medium my-3 pt-2 ">
                {t("about_think")}
              </h5>
              <div className="comment">
                <form action="">
                  <div
                    className="flex flex-row-reverse"
                    style={{ justifyContent: "left" }}
                  >
                    <input
                      className="star star-1"
                      id="star-1"
                      type="radio"
                      name="star"
                      value={1}
                      checked={rating === 1}
                      onChange={handleRatingChange}
                    />
                    <label className="star star-1" htmlhtmlFor="star-1"></label>
                    <input
                      className="star star-2"
                      id="star-2"
                      type="radio"
                      name="star"
                      value={2}
                      checked={rating === 2}
                      onChange={handleRatingChange}
                    />
                    <label className="star star-2" htmlhtmlFor="star-2"></label>
                    <input
                      className="star star-3"
                      id="star-3"
                      type="radio"
                      name="star"
                      value={3}
                      checked={rating === 3}
                      onChange={handleRatingChange}
                    />
                    <label className="star star-3" htmlhtmlFor="star-3"></label>
                    <input
                      className="star star-4"
                      id="star-4"
                      type="radio"
                      name="star"
                      value={4}
                      checked={rating === 4}
                      onChange={handleRatingChange}
                    />
                    <label className="star star-4" htmlhtmlFor="star-4"></label>
                    <input
                      className="star star-5"
                      id="star-5"
                      type="radio"
                      name="star"
                      value={5}
                      checked={rating === 5}
                      onChange={handleRatingChange}
                    />
                    <label className="star star-5" htmlhtmlFor="star-5"></label>
                  </div>
                  <textarea
                    name=""
                    id=""
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border border-black w-full p-3"
                  ></textarea>
                  <button
                    type="button"
                    style={{ backgroundColor: "black" }}
                    onClick={handComment}
                    className="bg-black border border-black text-white uppercase py-3 px-5 mt-4 text-xs"
                  >
                    {t("send")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="customer-talk py-3">
          <h5 className="text-xl font-medium my-3 ">
            {t("custom_about_think")}
          </h5>
          <SlideProduct comments={commentUser} />
        </div>
        <h2 className="text-4xl pt-3"> {t("other_product")}</h2>
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 gap-4">
          <div className="product-item py-5">
            <div className="product_item-img rounded overflow-hidden">
              <Link to="/product-detail">
                <img
                  src={product_1}
                  alt="product"
                  style={{ height: "350px" }}
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="product_item-name h-16 overflow-hidden">
              <Link to="/product-detail">
                <p className="text-xl text-overflow overflow-ellipsis line-clamp-2 font-medium">
                  adsadsv Lorem ipsum is simply dummy text...
                </p>
              </Link>
            </div>
            <div className="product_item-pride">
              <p className="text-base">$ 420.000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

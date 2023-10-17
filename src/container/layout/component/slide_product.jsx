import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function SlideProduct({ comments }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [commentsPerPage, setCommentsPerPage] = useState(4);

  const totalSlides = Math.ceil(comments.length / commentsPerPage);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 576) {
        setCommentsPerPage(1);
      } else if (windowWidth < 768) {
        setCommentsPerPage(2);
      } else if (windowWidth < 1024) {
        setCommentsPerPage(3);
      } else {
        setCommentsPerPage(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const commentsToShow = comments.slice(
    currentSlide * commentsPerPage,
    currentSlide * commentsPerPage + commentsPerPage
  );
  return (
    <div className="product-slideshow">
      <div className="product-slide grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 gap-5 w-full">
        {commentsToShow.map((comment, index) => (
          <div className="border py-0 px-4">
            <div className="flex border-bottom py-2 ">
              <div className="avatar my-auto">
                <img
                  src={comment.image}
                  className="rounded-full w-12 h-12 "
                  alt="avatar"
                />
              </div>
              <div className="info px-3 py-1">
                <h6 className="font-medium text-left">{comment.name}</h6>

                <div className="info-star text-xs ">
                  <label className="info-star-item mr-1 star_yell"></label>
                  <label className="info-star-item mr-1 star_yell"></label>
                  <label className="info-star-item mr-1 "></label>
                  <label className="info-star-item mr-1 "></label>
                  <label className="info-star-item mr-1 "></label>
                </div>
                <p className="text-xs font-normal text-start">UX/UI Design</p>
              </div>
            </div>
            <hr></hr>
            <div className="comment py-3">
              <p className="text-sm text-slate-500 text-justify">
                {comment.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="product-controls w-full flex justify-between">
        <button
          onClick={prevSlide}
          className="product-controls-previous"
        >
           <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={nextSlide}
          className="product-controls-next"
        >
        <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default SlideProduct;

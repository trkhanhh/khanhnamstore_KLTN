import React, { useState } from "react";
import Slide from "./slide";
import Thumbnail from "./thumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-5 overflow-hidden ">
        <div className="mySlides">
          <a className="prev" onClick={prevSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>
          <div className="flex flex-col ">
            {images.map((image, index) => (
              <Thumbnail
                key={index}
                image={image}
                index={index}
                currentIndex={currentImageIndex}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>

          <a className="next" onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </div>
        <div className="col-span-3">
          {images.map((image, index) => (
            <Slide
              key={index}
              image={image}
              currentIndex={currentImageIndex}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../utilities/styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { carouselImages } from "../utilities";

const Carousel = () => {
  return (
    <div className="w-[100vw] md:px-3 lg:px-6 xl:p-0 xl:w-[1024px] 2xl:w-[1536px] max-w-[1536px] lg:mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className=""
      >
        {carouselImages.map((carouselImage) => {
          return (
            <SwiperSlide
              className="h-[calc(100vh-60vh)] md:h-[calc(100vh-55vh)] xl:h-[calc(100vh-25vh)] "
              key={carouselImage.id}
            >
              <img
                src={carouselImage.image}
                alt={carouselImage.name}
                className="w-full h-full object-fill 2xl:object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;

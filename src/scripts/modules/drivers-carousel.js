import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export function driversCarousel() {
  if (document.querySelector(".drivers-carousel")) {
    const driversCarousel = new Swiper(".drivers-carousel", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 40,
      centeredSlides: false,
      breakpoints: {
        1024: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true, 
         dynamicBullets: true,
      },
    });
  }
}

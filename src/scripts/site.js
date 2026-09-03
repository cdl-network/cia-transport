import "glightbox/dist/css/glightbox.css";
import { stickyHeader } from "./modules/sticky-header";
import { mainNavigation } from "./modules/main-navigation";
import { driversCarousel } from "./modules/drivers-carousel";
import { tabs } from "./modules/tabs";
import { parallax } from "./modules/parallax";
import { scrollToSection } from "./modules/scroll-to-section";
import { glightbox } from "./modules/glightbox";
import { initModals } from "./modules/modals";
import { prequalification } from "./modules/prequalification";
import { counter } from "./modules/counter";
import { forms } from "./modules/forms";


document.addEventListener('DOMContentLoaded', () => {

   stickyHeader();
   mainNavigation();
   driversCarousel();
   tabs();
   parallax();
   scrollToSection();
   glightbox();
   initModals();
   prequalification();
   counter();
   forms();

  });

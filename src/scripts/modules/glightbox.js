import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';


export function glightbox() {
  
  const lightbox = GLightbox({
  selector: '.lightbox',
  loop: true,
  zoomable: true,
  draggable: true
});

}
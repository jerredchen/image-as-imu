window.HELP_IMPROVE_VIDEOJS = false;

var ANIMATION_BASE = "./static/images/animation_frames";
var NUM_ANIMATION_FRAMES = 175;

var interp_images = [];
function preloadAnimationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(4, '0') + '.png';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setAnimationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#animation-image-wrapper').empty().append(image);
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 24000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    preloadAnimationImages();

    $('#animation-slider').on('input', function(event) {
      setAnimationImage(this.value);
    });
    setAnimationImage(0);
    $('#animation-slider').prop('max', NUM_ANIMATION_FRAMES - 1);

    bulmaSlider.attach();

})

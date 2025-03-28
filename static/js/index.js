window.HELP_IMPROVE_VIDEOJS = false;

var ANIMATION_BASE = "./static/images/slider_frames";
var NUM_ANIMATION_FRAMES = 175;

var animation_images = [];
function preloadAnimationImages() {
  for (var i = 0; i < NUM_ANIMATION_FRAMES; i++) {
    var path = ANIMATION_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    animation_images[i] = new Image();
    animation_images[i].src = path;
  }
}

function setAnimationImage(i) {
  var image = animation_images[i];
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
  
    let interval;
    let autoplayTimeout;

    function autoplaySlider() {
        interval = setInterval(() => {
            let value =  parseInt($('#animation-slider').prop('value'));
            let max = NUM_ANIMATION_FRAMES - 1;
            let step = 25;

            // Increment or reset
            if (value + step <= max) {
                $('#animation-slider').prop('value', value + step);
                setAnimationImage(value + step);
            } else {
                $('#animation-slider').prop('value', 0);
                setAnimationImage(0);
            }
        }, 2500);
    }

    autoplaySlider(); // Start autoplay

    // Stop autoplay on user interaction
    $('#animation-slider').on('input', function () {
      clearInterval(interval);
      // Also clear any pending autoplay resumption
      clearTimeout(autoplayTimeout);
  });

  // Resume autoplay after a delay when user finishes interaction
  $('#animation-slider').on('change', function () {
      clearTimeout(autoplayTimeout); // Clear any existing timeout
      autoplayTimeout = setTimeout(autoplaySlider, 10000);
  });

})

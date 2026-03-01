// Shared navigation transition (index page)
const navTransitionLinks = document.querySelectorAll('.nav_transition_link');
const transitionLayer = document.getElementById('pageTransition');
const transitionVideo = document.getElementById('transitionVideo');

if (navTransitionLinks.length > 0 && transitionLayer) {
  navTransitionLinks.forEach(function (transitionLink) {
    transitionLink.addEventListener('click', function (event) {
      event.preventDefault();

      const targetPage = this.getAttribute('href');
      const selectedVideo = this.getAttribute('data-transition-video');

      transitionLayer.classList.remove('is_closing');
      transitionLayer.classList.add('is_active');

      if (transitionVideo) {
        if (selectedVideo) {
          transitionVideo.src = selectedVideo;
          transitionVideo.load();
        }

        transitionVideo.currentTime = 0;
        transitionVideo.muted = false;

        const fallbackTimer = setTimeout(function () {
          transitionLayer.classList.add('is_closing');
          setTimeout(function () {
            window.location.href = targetPage;
          }, 500);
        }, 5000);

        transitionVideo.onended = function () {
          clearTimeout(fallbackTimer);
          transitionLayer.classList.add('is_closing');
          setTimeout(function () {
            window.location.href = targetPage;
          }, 500);
        };

        transitionVideo.play().catch(function () {
          clearTimeout(fallbackTimer);
          transitionLayer.classList.add('is_closing');
          setTimeout(function () {
            window.location.href = targetPage;
          }, 500);
        });

        return;
      }

      setTimeout(function () {
        transitionLayer.classList.add('is_closing');
        setTimeout(function () {
          window.location.href = targetPage;
        }, 500);
      }, 1000);
    });
  });
}

// Work page slideshow (cycles every 2 seconds using all images in img/components)
const workSlideshowImage = document.querySelector('.work_page .work_center_context .personal_picture');

if (workSlideshowImage) {
  const slideshowImages = [
    'img/components/Property 1=Default.png',
    'img/components/Property 1=Variant2.png',
    'img/components/Property 1=Variant3.png',
    'img/components/Property 1=Variant4.png',
    'img/components/Property 1=Variant5.png',
    'img/components/Property 1=Variant6.png',
  ];

  let imageIndex = slideshowImages.indexOf(workSlideshowImage.getAttribute('src') || '');
  if (imageIndex === -1) {
    imageIndex = 0;
    workSlideshowImage.src = slideshowImages[0];
  }

  setInterval(function () {
    imageIndex = (imageIndex + 1) % slideshowImages.length;
    workSlideshowImage.src = slideshowImages[imageIndex];
  }, 2000);
}

import "../sass/index.scss";
import $ from "jquery";
import Swiper, { Pagination, Navigation, Scrollbar, Mousewheel, FreeMode } from "swiper";

export { Swiper, Pagination };
export { $ };

function customerGallery() {
  if (document.querySelector(".customerSlider")) {
    new Swiper(".customerSlider", {
      modules: [Scrollbar, FreeMode, Mousewheel],
      loop: false,
      slidesPerView: 1.2,
      spaceBetween: 0,
      freeMode: true,
      grabCursor: true,
      breakpoints: {
        1023: {
          slidesPerView: 1.5,
          spaceBetween: 0
        }
      },
      scrollbar: {
        el: '.customer .swiper-scrollbar',
        hide: false,
        draggable: true
      },
      mousewheel: {
        sensitivity: 1,
        forceToAxis: true, // Bắt buộc cuộn theo trục chính
        releaseOnEdges: true, // Tiếp tục cuộn khi đến cuối
      },
      on: {
        init: function (swiper) { },
        transitionStart: function () {
        },
        transitionEnd: function () { },
      },
    });
  }

}

function discoverGallery() {
  if (document.querySelector(".discoverSlider")) {
    new Swiper(".discoverSlider", {
      modules: [Scrollbar, FreeMode, Mousewheel],
      loop: false,
      slidesPerView: 1.2,
      spaceBetween: 0,
      freeMode: true,
      grabCursor: true,
      breakpoints: {
        1023: {
          slidesPerView: 2.6,
          spaceBetween: 0
        }
      },
      scrollbar: {
        el: '.discover .swiper-scrollbar',
        hide: false,
        draggable: true
      },
      mousewheel: {
        sensitivity: 1,
        forceToAxis: true, // Bắt buộc cuộn theo trục chính
        releaseOnEdges: true, // Tiếp tục cuộn khi đến cuối
      },
      on: {
        init: function (swiper) { },
        transitionStart: function () {
        },
        transitionEnd: function () { },
      },
    });
  }

}

function wheretobuyGallery() {
  if (document.querySelector(".wheretobuySlider")) {
    new Swiper(".wheretobuySlider", {
      modules: [Scrollbar, FreeMode, Mousewheel],
      loop: false,
      slidesPerView: 'auto',
      //slidesPerView: 5.5,
      spaceBetween: 0,
      freeMode: true,
      grabCursor: true,
      // breakpoints: {
      //   1023: {
      //     slidesPerView: 2.6,
      //     spaceBetween: 0
      //   }
      // },
      scrollbar: {
        el: '.wheretobuy .swiper-scrollbar',
        hide: false,
        draggable: true
      },
      mousewheel: {
        sensitivity: 1,
        forceToAxis: true,
        releaseOnEdges: true,
      },
      on: {
        init: function (swiper) { },
        transitionStart: function () {
        },
        transitionEnd: function () { },
      },
    });
  }

}

function leaderGallery() {
  if (document.querySelector(".leaderSlider")) {
    new Swiper(".leaderSlider", {
      modules: [Scrollbar, FreeMode, Mousewheel],
      loop: false,
      slidesPerView: 'auto',
      //slidesPerView: 5.5,
      spaceBetween: 0,
      freeMode: true,
      grabCursor: true,
      // breakpoints: {
      //   1023: {
      //     slidesPerView: 2.6,
      //     spaceBetween: 0
      //   }
      // },
      scrollbar: {
        el: '.wheretobuy .swiper-scrollbar',
        hide: false,
        draggable: true
      },
      mousewheel: {
        sensitivity: 1,
        forceToAxis: true,
        releaseOnEdges: true,
      },
      on: {
        init: function (swiper) { },
        transitionStart: function () {
        },
        transitionEnd: function () { },
      },
    });
  }

}

function onScroll() {
  var windowH = 0;
  // Function to add/remove class on scroll
  var lastScrollTop = 0;
  function toggleClassOnView() {
    setTimeout(() => {
      const items = `.banner__img, .banner__txt h1, .essence__txt h2, .essence__brief,
        .essence__img, .banner__full--img, .people__img, .people__img--sub, .people__txt h2,
        .people__brief, .hand__cate, .hand__img, .hand__txt h2, .hand__brief, .leader__txt h2,
        .leader__brief, .leader__action, .leader__item, .leader__gallery--img, .banner__full--txt h2,
        .banner__full--brief, .customer__txt h2, .customer__brief, .customer__gallery, .contact__form h2,
        .contact__brief, .from__group, .form__action, .contact__img, .discover__txt h2, .discover__brief,
        .discover__gallery, .wheretobuy__txt h2, .wheretobuy__brief, .wheretobuy__gallery, .faq__txt h2,
        .faq__brief, .faq__item, .faq__main, .footer`;
      $(items).each(function () {
        if ($(this).length) {
          var elementTop = $(this).offset().top;
          var elementBottom = elementTop + $(this).outerHeight();
          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();

          // inview
          if (elementTop < viewportBottom && elementBottom > viewportTop) {
            $(this).addClass('in-view');
          }

          // outview
          if (elementBottom <= viewportTop || elementTop >= viewportBottom) {
            $(this).removeClass('in-view');
          }

        }

      });
      var scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop) {
        $('.header').removeClass('sticky');
      } else if (scrollTop < lastScrollTop) {
        if (scrollTop <= $('.banner__box').height()/2) {
          $('.header').removeClass('sticky');
        } else {
          $('.header').addClass('sticky');
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 50);
  }

  //$(window).on('scroll resize', toggleClassOnView);
  $(window).on('scroll', toggleClassOnView);
  $(window).on('resize', function () {
    toggleClassOnView();
    setTimeout(() => {
      windowH = $(window).innerHeight();
      $('.page').attr({ 'style': `--height:${windowH}px` });
    }, 10);
  });

  toggleClassOnView();

}

(function () {
  customerGallery();
  discoverGallery();
  wheretobuyGallery();
  leaderGallery();
  onScroll();
  setTimeout(function(){
    var winH = $(window).innerHeight();
    $('.page').attr({ 'style': `--height:${winH}px` });
  }, 350);
})();

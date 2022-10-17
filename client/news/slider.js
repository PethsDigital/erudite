/* Owl Carousel 2 All Settings. See the bottom for how to use equal heights with matchHeight  plugin */

jQuery(document).ready(function ($) {
  let owl = $("#owl-demo-2");
  let owl1 = $("#owl-demo-1");

  function slider(el) {
    el.owlCarousel({
      autoplay: true,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,

      items: 3,
      loop: true,
      center: false,
      rewind: false,

      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      freeDrag: false,

      margin: 0,
      stagePadding: 0,

      merge: false,
      mergeFit: true,
      autoWidth: false,

      startPosition: 0,
      rtl: false,
      nav: true,
      navText: [
        '<div class="nav-btn prev-slide"></div>',
        '<div class="nav-btn next-slide"></div>',
      ],

      smartSpeed: 250,
      fluidSpeed: false,
      dragEndSpeed: false,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
        },
        700: {
          items: 2,
        },
        992: {
          items: el === owl ? 4 : 2,
        },
      },
      responsiveRefreshRate: 200,
      responsiveBaseElement: window,

      fallbackEasing: "swing",

      info: false,

      nestedItemSelector: false,
      itemElement: "div",
      stageElement: "div",

      refreshClass: "owl-refresh",
      loadedClass: "owl-loaded",
      loadingClass: "owl-loading",
      rtlClass: "owl-rtl",
      responsiveClass: "owl-responsive",
      dragClass: "owl-drag",
      itemClass: "owl-item",
      stageClass: "owl-stage",
      stageOuterClass: "owl-stage-outer",
      grabClass: "owl-grab",
      autoHeight: false,
      lazyLoad: false,
    });
  }

  $(".next").click(function () {
    owl.trigger("owl.next");
  });
  $(".prev").click(function () {
    owl.trigger("owl.prev");
  });

  slider(owl1);
  slider(owl);
  /* Equal Heights using javascript */
  // $('.latest-blog-posts .thumbnail.item').matchHeight();
});

$(document).ready(function () {
  $(".banner-home__list").slick({
    inifinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow,
    nextArrow,
    rows: 0,
    dots: true,
    customPaging,
  });
  /**Banner brands */
  $(".banner_brands").slick({
    inifinite: false,
    autoplay: false,
    autoplaySpeed: 4500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow,
    nextArrow,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 678,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ]
  });
});
var elementoLeftSide = $(".md-chat-widget-wrapper.LeftSide");

if (elementoLeftSide.length > 0) {
    var iframeAoLado = elementoLeftSide.next("iframe");

    if (iframeAoLado.length > 0) {
        iframeAoLado.remove();
    }
}
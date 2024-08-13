$(document).ready(function () {
  if ($(".segmentation").length > 0) {
    $(".segmentation .segmentation__list").slick({
      slidesToShow: 8,
      slidesToScroll: 1,
      slide: "li",
      rows: 0,
      arrows: true,
      prevArrow,
      nextArrow,
      infinite: false,
      dots: false,
      customPaging,
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
      ],
    });
  }

  $(".segmentation__link").on("mouseenter", function(){
    $(this).find("> .segmentation__figure__behind").addClass("behindOn")
  });


  $(".segmentation__link").on("mouseleave", function(){
    $(this).find("> .segmentation__figure__behind").removeClass("behindOn")
  })
  if ($(".home__banner-information").length > 0) {
    $(".home__banner-information").slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      rows: 0,
      arrows: false,
      infinite: true,
      dots: false,
      customPaging,
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
      ],
    });
  }

});

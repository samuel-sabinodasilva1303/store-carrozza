if ($(".page-product").length > 0) {
  $(".products-related").length > 0 &&
    $(".products-related .showcase__list--related").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      rows: 0,
      nextArrow,
      prevArrow,
      dots: true,
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

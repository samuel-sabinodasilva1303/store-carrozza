$(".reviews").length > 0 &&
  $(".reviews .dep_lista").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    slide: ".dep_item",
    rows: 0,
    prevArrow,
    nextArrow,
    infinite: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 678,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

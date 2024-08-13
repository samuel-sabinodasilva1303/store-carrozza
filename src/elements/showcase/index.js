if ($(".showcase").length > 0 && !window.matchMedia("(max-width: 767px)").matches) {
  $('.showcase[data-carousel="true"] .showcase__list').each(function () {
    var itemCount = $(this).find('.showcase__item').length;
    if (itemCount > 4) {
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        rows: 0,
        nextArrow: false,
        prevArrow: false ,
        dots: false,
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
}else{
  console.log('teste')
  if ($(".showcase").length > 0) {
    $('.showcase[data-carousel="true"] .showcase__list').each(function () {
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        rows: 0,
        nextArrow: false,
        prevArrow: false ,
        dots: false,
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
    });
  }
}

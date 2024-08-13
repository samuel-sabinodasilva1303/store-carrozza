if ($(".news").length > 0) {
  $(".news__content").load("/noticias .noticias", function (data, status) {
    if (status === "success") {
      $(this)
        .find(".noticias")
        .slick({
          arrows: false,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          rows: 0,
          customPaging,
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
                slidesToScroll: 1,
                slidesToShow: 1,
              },
            },
          ],
        });
    }
  });
}

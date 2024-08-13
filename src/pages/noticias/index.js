if ($(".page-noticia").length > 0 && $("#noticiaProdutos").length > 0) {
  $("#noticiaProdutos")
    .find("img")
    .each(function () {
      let $src = $(this).attr("src").replace("/90_", "/180_");

      $(this).attr("src", $src);
    });

  function slickInit() {
    $("#noticiaProdutos #listaNoticiaProdutos").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      rows: 0,
      nextArrow,
      prevArrow,
      dots: false,
      customPaging,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 678,
          settings: {
            slidesToScroll: 2,
            slidesToShow: 2,
          },
        },
      ],
    });
  }

  function slickDestroy() {
    $("#noticiaProdutos #listaNoticiaProdutos").slick("unslick");
  }

  isMobile && slickInit();

  let slickOn = false;

  $(window).on("resize", function () {
    if ($(window).width() < 992) {
      !slickOn && slickInit();
      slickOn = true;
    } else {
      slickOn && slickDestroy();
      slickOn = false;
    }
  });
}

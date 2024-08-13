if ($(".page-catalog, .page-search").length > 0) {
  if ($(".page-catalog__description").length > 0) {
    let $desc = $(".page-catalog__description--text"),
      maxH = isMobile ? 72 : 40,
      descH = $desc.height();

    function setReadMoreOrLessBtn() {
      let btn =
        '<span class="page-catalog__description--btn" data-action="more" role="button">Ler mais</span>';

      $desc.append(btn);

      $(".page-catalog__description--btn").on("click", function () {
        let action = $(this).attr("data-action");

        action === "more" &&
          $(this)
            .text("Ler menos")
            .attr("data-action", "less")
            .parent()
            .css({
              transition: "all 333ms linear",
              "max-height": descH + 20 + "px",
            });

        action === "less" &&
          $(this)
            .text("Ler mais")
            .attr("data-action", "more")
            .parent()
            .css("max-height", "");
      });
    }

    descH > maxH && setReadMoreOrLessBtn();
  }

  $(".page-catalog__btn--filter, .page-search__btn--filter").on("click", function (e) {
    e.preventDefault();
    $(".page-catalog__filter, .page-search__filter").css({ left: 0 });
  });

  $(".page-catalog__filter-btn, .page-search__filter-btn").on("click", function (e) {
    e.preventDefault();
    $(".page-catalog__filter, .page-search__filter").css({ left: "-100%" });
  });
}

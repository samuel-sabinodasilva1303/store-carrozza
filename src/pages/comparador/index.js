if ($(".page-comparador").length > 0) {
  $(".comparator .comparsionFoto img").each(function () {
    var src = $(this).attr("src");
    src = src.replace("/90_", "/180_");
    $(this).attr("src", src);
  });
}

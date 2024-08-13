if ($(".page-search #vitrine-catalogo").length > 0) {
  var $inputImg = $('input[name="imageField"]').get(0);
  var $button = $("<button />");

  $.each($inputImg.attributes, function (i, attribute) {
    if (attribute.name !== "src") {
      return $button.attr(attribute.name, attribute.value);
    }
  });

  $($inputImg).replaceWith($button.text("Enviar"));
}

if ($(".tagcloud").length > 0) {
  var fontWeight = [300, 400, 700];
  var fontStyle = ["normal", "italic"];

  $(".tagcloud a").each(function () {
    $(this).css({
      "font-style": `${fontStyle[randomNumber(0, fontStyle.length - 1)]}`,
      "font-weight": `${fontWeight[randomNumber(0, fontWeight.length - 1)]}`,
      color: `rgba(${randomNumber(0, 255)},${randomNumber(
        0,
        255
      )},${randomNumber(0, 255)})`,
    });
  });

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

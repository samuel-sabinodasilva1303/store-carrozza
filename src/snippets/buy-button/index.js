if ($(".buy-button").length > 0) {
  window.process = function (quant) {
    var value = parseInt(document.getElementById("quant").value);
    value += quant;
    if (value < 1) {
      document.getElementById("quant").value = 1;
    } else {
      document.getElementById("quant").value = value;
    }
  };
}

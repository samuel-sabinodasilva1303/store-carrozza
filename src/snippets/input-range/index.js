if ($(".input-range").length > 0) {
  let $parent = $(".input-range");

  function rangeInfo() {
    let a = Number($parent.find("input")[0].value),
      b = Number($parent.find("input")[1].value),
      max = $parent.data("max"),
      min = $parent.data("min"),
      currV = Math.abs(a - b),
      currM = Math.abs(min - max),
      minV = a < b ? a : b,
      setL = (100 - ((currM - (minV - min)) * 100) / currM),
      setW = (currV * 100) / currM;

    $parent.css({ "--max": setW.toFixed(2), "--min": setL.toFixed(2) });
  }

  $(".input-range__input").on("change input", () => rangeInfo());

  rangeInfo(); 
}
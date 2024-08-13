if ($(".filtered").length > 0) {
  let $parent = $(".filtered"),
    $filter = $("form.filter__form"),
    $filtered = $parent.find("[data-filtered]");

  $filtered.on("click", function () {
    let dataItem = $(this).data("filtered"),
      valueItem = $(this).data("value"),
      $section = $filter.find('[data-filter="' + dataItem + '"]');

    function unChecked(section, target) {
      $(section)
        .find("input:checked")
        .each(function () {
          let value = $(this).val();
          value === target && $(this).prop("checked", false).closest('form').submit();
        });
    }


    dataItem === "price"
      ? $section.find('input[type="hidden"]').val("").attr('disabled',true).closest('form').submit()
      : unChecked($section, valueItem);
  });
}
if ($(".product .compare").length > 0) {
  $(".compare .compare__link").on("click", function () {
    const id = $(this).closest(".product").attr("itemid"),
      action = $(this).attr("data-compare"),
      target = $(this).closest(".product");
    checkAction(action, id);

    function checkAction(action, id) {
      if (!action) {
        return;
      }
      $('.product[itemid="' + id + '"]').each(function () {
        if (!$(this).is(target)) {
          $(this)
            .find(
              '.compare-hidden[data-compare="' +
                (action === "add" ? "remove" : "add") +
                '"]'
            )
            .removeClass("compare-hidden")
            .find("input")
            .prop("checked", action === "add" ? true : false);

          $(this)
            .find(
              '[data-compare="' + (action === "add" ? "add" : "remove") + '"]'
            )
            .addClass("compare-hidden")
            .find("input")
            .prop("checked", false)
            .removeAttr("checked");
        } else if (action === "add") {
          $(this).find('[data-compare="remove"] input').prop("checked", true);
        }
      });
    }
  });
}

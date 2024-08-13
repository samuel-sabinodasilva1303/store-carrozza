if ($(".page-search").length > 0 || $(".page-catalog").length > 0) {
  $('.filter__item').on('click', function(e) {
    if ($(e.target).is('.filter__input')) {
    } else {
      $(this).find('.filter__input').click();
    }
  });

  $('.filter__input').on('click', function(e) {
    e.stopPropagation();
  });

  $('.filter__input.filter__input--propertie').on('change', function() {
    var $filterLabel = $(this).closest('.filter__item').find('.filter__name');

    if ($(this).prop('checked')) {
      $filterLabel.trigger('click');
    }
  });


  $(".filter__btn--clean").on("click", function (e) {
    e.preventDefault();
    $("section.filter__block").each(function () {
      $(this).find('input[type="checkbox"]').removeAttr("checked");
    });
    $(".filtered").slideToggle();
    $("form.filter__form").submit();
  });

  $(".filter .filter__title").each(function () {
    $(this).on("click", function () {
      $(this).closest(".filter__fake-select").toggleClass("open");
      $(this).siblings(".filter__list, .filter__price").slideToggle(300);
    });
  });

  $(".filter .filter__list").each(function () {
    let $list = $(this),
      lastIndex = $list.find(" > li").length - 1,
      title = $list.siblings("h4").text().toLowerCase(),
      template = (label) =>
        '<li class="filter__item filter__item--btn">' +
        arrowUp + 
        "<span>Ver " +
        label +
        " " +
        title +
        "</span></li>";

    $list.is(":empty") && $(this).closest(".filter__block").hide();

    $list.find("> li").each(function (index) {
      let $item = $(this);
      index > 4 && $item.hide();
      index === 5 && $item.before(template("mais"));
      index > 4 && index == lastIndex && $item.after(template("menos"));
    });
  });

  $(".filter__category-btn").on("click", function () {
    $(this).toggleClass("show").next().slideToggle("slow");
  });

  $(document).on("click", ".filter__item--btn", function () {
    $(this).slideToggle(333);
    $(this).nextAll().length > 0
      ? $(this).nextUntil(".filter__item--btn").slideToggle()
      : $(this).prevUntil(".filter__item--btn").slideToggle();
    $(this)
      .siblings(".filter__item--btn")
      .slideToggle()
      .css({ display: "flex" });
    // $(this).prevAll().length > 0 && $(this).prevUntil('.filter__item--btn').hide();
  });

  if ($(".filter__price").length > 0) {
    let $parent = $(".filter__price"),
      showMin = $parent.find('input[name="min"]'),
      showMax = $parent.find('input[name="max"]'),
      ranges = $parent.find(".input-range__input");

    function stringCurrency(number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(number);
    }

    !isMobile &&
      $(".filter input[name]").on("input change", function () {
        $(".filter__form").submit();
      });

    const submitPrices = debounce((min, max) => {
      $parent
        .find('input[type="hidden"]')
        .prop("disabled", false)
        .val(min + "," + max)
        .trigger("change");
    }, 1000);

    $(".input-range__input").on("change input", function () {
      let a = Number(ranges[0].value),
        b = Number(ranges[1].value),
        min = a < b ? a : b,
        max = a > b ? a : b;

      showMin.val(stringCurrency(min));
      showMax.val(stringCurrency(max));
      submitPrices(min, max);
    });
  }
}


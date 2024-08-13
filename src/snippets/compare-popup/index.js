{
  let idsUnique = [];

  let template = (src, name, id) => {
    return `<li data-compare-id="${id}" class="compare-popup__item"><div class="compare-popup__info"><figure><img src="${src}" height="65" width="65" alt="mini_thumb"></figure><p>${name}</p></div><button data-remove-id="${id}" class="compare-popup__remove""><i class="compare-popup__icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" width="12" height="14" viewBox="0 0 12 14"><path fill="" d="M9.738 13.469H2.044A1.233 1.233 0 0 1 .84 12.206V3.885h.842v8.32a.391.391 0 0 0 .362.422h7.694a.39.39 0 0 0 .362-.421V3.885h.842v8.32a1.234 1.234 0 0 1-1.204 1.264ZM0 2.946h11.755v-.842H0v.842Z"/><path fill="" d="M7.156 4.63h.842v6.313h-.842V4.63ZM3.788 4.63h.842v6.313h-.842V4.63ZM7.997 1.625h-.8V.842h-2.61v.783h-.799V.842a.842.842 0 0 1 .8-.842h2.61a.842.842 0 0 1 .799.842v.783Z"/></svg></i><span>Remover</span></button></li>`;
  };

  function expandedCompareMain() {
    let $main = $(".compare-popup__main"),
      isExpanded = $main.attr("aria-expanded") === "true" ? true : false,
      $label = $(".compare-popup__label"),
      $icon = $(".compare-popup__action > i");

    $icon.toggleClass("rotate");

    !isExpanded
      ? $label.html("Esconder Produtos")
      : $label.html("Ver Produtos");

    $main.attr("aria-expanded", !isExpanded);

    customSlide($main.get(0));
  }

  function uncheckedCompare(productID) {
    $('.product[itemid="' + productID + '"]')
      .first()
      .find(".compare .compare__link")
      .not(".compare-hidden")
      .trigger("click");
  }

  function quantProductsToCompare() {
    let $popup = $(".compare-popup"),
      $main = $popup.find(".compare-popup__main"),
      isExpanded = $main.attr("aria-expanded") === "true" ? true : false,
      quant = $(".compare-popup__main [data-compare-id]").length;

    quant === 0 && isExpanded && expandedCompareMain();

    quant === 2 && !isExpanded && expandedCompareMain();

    $(".compare-popup .compare-popup__quant").html(quant);

    quant === 0 && $popup.attr("aria-hidden", true);
  }

  function addItemToComparePopup(productElement) {
    let $popup = $(".compare-popup"),
      $main = $(".compare-popup__main"),
      imgSrc = $(productElement).find(".product__image img").attr("src"),
      prodName = $(productElement).find(".product__name a").text().trim(),
      prodId = $(productElement).attr("itemid"),
      $mainPopup = $(".compare-popup .compare-popup__main > ul");

    $popup.attr("aria-hidden") === "true" && $popup.attr("aria-hidden", false);

    $main.hasClass("slide") && $main.css("height", "auto");

    $mainPopup.find('[data-compare-id="' + prodId + '"]').length === 0 &&
      $mainPopup.append(template(imgSrc, prodName, prodId));

    $main.hasClass("slide") && $main.css("height", $main.height() + "px");

    quantProductsToCompare();
  }

  function removeItemToComparePopup(productID, popup = true) {
    let $main = $(".compare-popup__main");
    let quant = $(".compare-popup__main [data-compare-id]").length - 1;

    quant > 0 && $main.hasClass("slide") && $main.css("height", "auto");

    $('.compare-popup [data-compare-id="' + productID + '"]').remove();

    popup && uncheckedCompare(productID);

    quant > 0 &&
      $main.hasClass("slide") &&
      $main.css("height", $main.height() + "px");

    quantProductsToCompare();
  }

  $(document).ready(function () {
    $('.compare .compare-hidden[data-compare="add"]').each(function () {
      let id = $(this).closest(".product").attr("itemid");

      !idsUnique.includes(id) &&
        idsUnique.push(id) &&
        addItemToComparePopup($(this).closest(".product"));
    });
  });

  $(document).on("click", ".compare-popup__remove", function () {
    let $id = $(this).attr("data-remove-id");
    removeItemToComparePopup($id);
  });

  $(document).on("click", ".compare__link", function () {
    let action = $(this).attr("data-compare"),
      $product = $(this).closest(".product"),
      $id = $product.attr("itemid");

    action === "add" && addItemToComparePopup($product);
    action === "remove" && removeItemToComparePopup($id, false);
  });

  $(".compare-popup__action").on("click", expandedCompareMain);
}

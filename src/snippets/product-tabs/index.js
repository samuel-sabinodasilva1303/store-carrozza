if ($(".page-product").length > 0) {
  function changeCssVar(name, value) {
    document.documentElement.style.setProperty(`--` + name, value);
  }
  function dashMove() {
    const gap = $(".product-tabs__list")[0].getBoundingClientRect().left,
      activeTarget = $(".product-tabs__item.show")[0].getBoundingClientRect(),
      widthTarget = activeTarget.width,
      dashWidth = widthTarget - widthTarget * 0.1,
      posiTarget = activeTarget.left,
      dashLeft = Math.abs(posiTarget - gap + widthTarget / 2 - dashWidth / 2);

    changeCssVar("dash-width", dashWidth.toFixed(2) + "px");
    changeCssVar("dash-left", dashLeft.toFixed(2) + "px");
  }

  !isMobile && window.addEventListener("resize", dashMove, false);

  $(".product-tabs a[data-url]").each(function () {
    var urlToLoad = $(this).attr("data-url");
    var contentId = $(this).attr("data-content-id");
    $(contentId).load(urlToLoad);
  });

  $(".product-tabs .product-tabs__item").each(function () {
    if ($(this).hasClass("show")) {
      var contentID = $(this).find("a").attr("data-content-id");
      !isMobile && $(contentID).addClass("show");
      isMobile && $(contentID).slideToggle();
    }
  });

  function clearShow() {
    $(
      ".product-tabs .product-tabs__item, .product-tabs .product-tabs__content"
    ).each(function () {
      $(this).has("show") && $(this).removeClass("show");
    });
  }

  $(".product-tabs .product-tabs__link").each(function () {
    var contentID = $(this).attr("data-content-id");

    isMobile && $(contentID).insertAfter($(this));

    $(this).on("click", function (e) {
      e.preventDefault();

      if (!isMobile) {
        clearShow();
        $(this).closest("li").addClass("show");
        $(contentID).addClass("show");
      } else {
        $(this).closest("li").toggleClass("show");
        $(contentID).slideToggle();
      }
      dashMove();
    });
  });



  !isMobile && dashMove();

  //if(oferta)
  const precoParcelado = document.querySelector('#variacaoPreco');
  const precoAvista = document.querySelector('.preco-avista span span');
  const desconto = document.querySelector('#precoDe');
  const parcelamento = document.querySelector('.preco-parc2 .color')
  const parcelamentoPreco = document.querySelector('.preco-parc2 span span')

  const temp = precoParcelado.textContent;

  precoParcelado.html(precoAvista.textContent);

  precoAvista.textContent = temp;

  $('#info_preco').html(`ou <strong class="de">${desconto.textContent}</strong> em at&eacute; ${parcelamento.textContent} de <strong>${parcelamentoPreco.textContent}</strong> sem juros`);
  $('.de').each(function() {
    var newText = $(this).text().replace('De', '');
    $(this).text(newText);
  });
}

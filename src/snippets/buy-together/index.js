if ($(".page-product").length > 0) {
  if ($(".buy-together").length > 0) {
    const observer = new MutationObserver(function (mutations, observer) {
      if (mutations[0].type === "childList") {
        const { target } = mutations[0];
        rewritePrices($(target).find(".comprejuto_preco"), "de: ");
        rewritePrices($(target).find(".comprejunto_preco2"), "por: ");
      }
    });

    $(".precosCompreJunto").each(function () {
      rewritePrices($(this).find(".comprejuto_preco"), "de: ");
      rewritePrices($(this).find(".comprejunto_preco2"), "por: ");
      observer.observe($(this).get(0), {
        childList: true,
      });
    });

    $(".compreJunto > li").each(function () {
      let $parent = $(this);
      moveProductName($parent);
    });

    function rewritePrices(element, custom = "") {
      const number = parseFloat(
          $(element)
            .text()
            .trim()
            .replaceAll(".", "")
            .replace(",", ".")
            .replace(/[^0-9][^0-9.]*[^0-9]/g, "")
        ),
        template = `<span>${custom}</span><strong>${currencyFormat(
          number
        )}</strong>`;

      $(element).html(template);
    }

    function moveProductName() {
      const boxImages = $('.compreJunto form .fotosCompreJunto');
            const image = $('.compreJunto .produto img');
            const qtd = $('.compreJunto .precoCompreJunto .unidades_preco .unidades_valor');
            const spansLinksRemove = $(
                '.compreJunto .precoCompreJunto div:first-child> span, .compreJunto .precoCompreJunto div:first-child> a, .compreJunto .precoCompreJunto div:first-child > br'
            );
            let listQtd = [];

            boxImages.append('<div class="plus color to">=</div>');

            qtd.each(function () {
                const value = $(this).text();
                listQtd.push(value);
            });

            image.each(function (index) {
                const link = $(this).parent().attr('href') || '';
                const name = $(this).attr('alt');

                $(this).addClass('buyTogether-img lazyload');

                if (link !== '') {
                    $(this).unwrap();
                    $(this).parents('span').after(`<a class="buy-together__product-name" href="${link}">${name}</a>`);
                } else {
                    $(this).parents('span').after(`<p class="buy-together__product-name">${name}</p>`);
                }

                if (listQtd[index] == 1) {
                    $(this).after(`<p class="buyTogether-text">${listQtd[index]} unidade</p>`);
                } else {
                    $(this).after(`<p class="buyTogether-text">${listQtd[index]} unidades</p>`);
                }
            });

            $('.pageProduct-buyTogether').removeClass('tray-hide');
    }

    $(".fotosCompreJunto .plus.color").each(function () {
      var iconPlus = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="12" height="12" viewBox="0 0 12 12"><path fill="#2B6FF1" fill-rule="evenodd" d="M6 .25c.41 0 .75.34.75.75v4.25H11a.75.75 0 0 1 0 1.5H6.75V11a.75.75 0 0 1-1.5 0V6.75H1a.75.75 0 0 1 0-1.5h4.25V1c0-.41.34-.75.75-.75Z" clip-rule="evenodd"/></svg>`;

      $(this).html(iconPlus);
    });

    $(".fotosCompreJunto .varTit").each(function () {
      $(this).text($(this).text().replace(":", ""));
    });

    $(".fotosCompreJunto").each(function () {
      var iconEqual = `<svg class="equal sep" xmlns="http://www.w3.org/2000/svg" fill="none" width="14" height="8" viewBox="0 0 14 8"><path fill="#2B6FF1" fill-rule="evenodd" d="M13.75 1c0 .41-.34.75-.75.75H1a.75.75 0 0 1 0-1.5h12c.41 0 .75.34.75.75Zm0 6c0 .41-.34.75-.75.75H1a.75.75 0 0 1 0-1.5h12c.41 0 .75.34.75.75Z" clip-rule="evenodd"/></svg>`;

      $(this).after(iconEqual);
    });

    $(".buy-together form").each(function () {
      var parentProd = $(this).find(".fotosCompreJunto");
      var productQty = $(this).find(".produto").length;
      productQty > 4 && parentProd.addClass("large");

      if ($(window).width() < 992) {
        parentProd.find(".cpClear").remove();
        productQty % 2 === 1
          ? parentProd.addClass("odd")
          : parentProd.addClass("even");
      }
    });
  }
}

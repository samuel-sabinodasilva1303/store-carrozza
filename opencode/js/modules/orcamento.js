(function ($) {
  //orcamento    btn em carrinho
  $(".ef_btnorc").click(function (event) {
    event.preventDefault();
    efcriascriptform();
  });

  $(document).on("click", ".ef_btnorc_checkout", function (e) {
    e.preventDefault();
    efcriascriptform();
  });

  var efcriascriptform = function () {
    setTimeout(function () {
      efrequestProductsCart();
    }, 300);
  };

  var efrequestProductsCart = function () {
    var efcartItemHtml = "";
    var efidLoja = $("html").data("store");
    $.getJSON("/mvc/store/cart/count?loja=" + efidLoja, function (data) {
      var efcartItem = 0,
        eftotalItemsCart = data.cart.Products.length;
      if (eftotalItemsCart !== 0) {
        for (efcartItem = 0; efcartItem < eftotalItemsCart; efcartItem++) {
          var ef_nome_variacao_form =
            data.cart.Products[efcartItem].Variant.name;
          if (ef_nome_variacao_form != undefined) {
            //tem variacao
            efcartItemHtml +=
              "Codigo:" +
              data.cart.Products[efcartItem].id +
              "\nDescricao:" +
              data.cart.Products[efcartItem].name +
              " (" +
              ef_nome_variacao_form +
              ")\nQuantidade:" +
              data.cart.Products[efcartItem].quantity +
              "\nPreco Unitario: R$ " +
              data.cart.Products[efcartItem].price +
              "\n\n\n\n";
          } else {
            efcartItemHtml +=
              "Codigo:" +
              data.cart.Products[efcartItem].id +
              "\nDescricao:" +
              data.cart.Products[efcartItem].name +
              "\nQuantidade:" +
              data.cart.Products[efcartItem].quantity +
              "\nPreco Unitario: R$ " +
              data.cart.Products[efcartItem].price +
              "\n\n\n\n";
          }
        }
        var mapForm = document.createElement("form");
        mapForm.target = "_self";
        mapForm.method = "POST";
        mapForm.action = "https://www. .com.br/cotacao- ";
        document.body.appendChild(mapForm);
        mapForm.submit();
        if (typeof Storage !== "undefined") {
          localStorage.setItem("efcarrinho", efcartItemHtml);
        }
      } else {
        //vazio
      }
    });
  };
})(jQuery);

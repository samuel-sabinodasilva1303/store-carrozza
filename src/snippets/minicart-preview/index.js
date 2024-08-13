if ($(".minicart").length > 0) {
  const cart = {
    icons: {
      remove:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="17" viewBox="0 0 16 17"><path fill="" d="M6.5 3h3a1.5 1.5 0 0 0-3 0Zm-1 0a2.5 2.5 0 1 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 10.272 17H5.728a3 3 0 0 1-2.98-2.656L1.554 4H.5a.5.5 0 0 1 0-1h5ZM3.741 14.23A2 2 0 0 0 5.728 16h4.544a2 2 0 0 0 1.987-1.77L13.439 4H2.561l1.18 10.23ZM6.5 6.5A.5.5 0 0 1 7 7v6a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5ZM10 7a.5.5 0 1 0-1 0v6a.5.5 0 0 0 1 0V7Z"/></svg>',
    },
    storeID: $("html").data("store"),
    hash: null,
    Products: null, // products array > name, imagem, url, id, quantity and more
    info: {}, // total quantity and price @object info.price and info.amount
    minicartHide: function () {
      $(".minicart").attr("aria-hidden", true);
    },

    minicartShow: function () {
      $(".minicart").attr("aria-hidden", false);
    },

    showAmount: function () {
      const { amount } = this.info;
      $("#cart .cart__info").text(amount);
    },

    mountCart: function () {
      $(".minicart__main").html("");

      let template;

      if (this.Products) {

        template = '<ul class="minicart__list">'

        this.Products.forEach(({ product_id, bought_together_id, variant_id, product_name, product_image, product_url, quantity, price})=> {
          let ids = JSON.stringify({ product_id, ...(variant_id > 0 && { variant_id }),...(bought_together_id > 0 &&{ bought_together_id }) }).replaceAll('\"', '\'');
          template += '<li class="minicart__item">'
          template += '<a class="minicart__link" href="'+product_url.https+'">'
          template += '<figure class="minicart__frame"><img src="'+product_image.https+'" alt="'+product_name+'" height="106" width="106" loading="lazy"/></figure>'
          template += '<div class="minicart__info"><p class="minicart__name">'+product_name+'</p>'
          template += '<p class="minicart__qty">Quantidade: '+quantity+'</p><p class="minicart__price">'+currencyFormat(price)+'</p></div>'
          template += '</a>'
          template += '<button class="minicart__remove" data-remove-ids="'+ids+'" aria-label="Remover produto do minicart" type="button">'+this.icons.remove+'</button>'
          template += '</li>'
        })

        template += '</ul>'

      } else {
        template = '<span class="minicart__empty" >Carrinho Vazio !</span>';
      }

      $(".minicart__main").append(template);
    },

    updateCart: function () {
      $.get("/nocache/app.php?loja=" + this.storeID)
        .then((res) => JSON.parse(res))
        .done(({ hash }) => {
          cart.hash = hash;
          $.get(
            "/mvc/store/cart/count?loja=" + this.storeID + "&hash=" + hash
          ).done(({ cart: { price, amount } }) => {
            this.info = { price, amount };
            this.getCart();
            this.showAmount();
          });
        });
    },
    addCart: function () {
      $(document).ajaxComplete((event, xhr, settings) => {
        settings.type === "POST" && settings.url.indexOf("cart_preview") !== -1 && this.updateCart();
      });
    },

    getCart: function () {
      $.get("/web_api/cart/" + this.hash)
        .done((res) => {
          this.Products = res.map(({ Cart }) => Cart);
        })
        .then(() => this.mountCart())
        .fail(({ status, statusText }) => {
          this.Products = null;
          status === 404 && this.mountCart();
          status !== 404 &&
            console.error("[Code]", status, "[Message]", statusText);
        });
    },

    deleteItem: function (product_id, variant_id, bought_together_id) {
      let query =
        variant_id > 0 ? `/${product_id}/${variant_id}` : `/${product_id}`;

      $.ajax(
        "/web_api/carts/" + this.hash + (bought_together_id > 0 ? "" : query),
        {
          type: "DELETE",
        }
      )
        .done(() => this.updateCart())
        .fail(function ({ status, statusText }) {
          console.error("[Delete]", status, "[Message]", statusText);
        });
    },
    init: function () {
      this.updateCart();
      this.addCart();
    },
  };

  cart.init();

  $("#cart .cart__link").on("click", function (e) {
    e.preventDefault();
    cart.minicartShow();
  });

  $(document).on("click", ".minicart__close", function (e) {
    e.preventDefault();
    cart.minicartHide();
  });

  // close modal when has a click outside
  $(document).on("click", '.minicart[aria-hidden="false"]', function (e) {
    e.stopPropagation();
    e.preventDefault();
    const { target, currentTarget } = e;

    target === currentTarget && cart.minicartHide();
  });

  $(document).on("click", ".minicart__remove", function (e) {
    e.preventDefault();
    const { product_id, variant_id, bought_together_id } = JSON.parse(
      $(this).data("remove-ids").replaceAll("'", '"')
    );
    cart.deleteItem(product_id, variant_id, bought_together_id);
    $(this).closest("li").slideToggle();
  });
}

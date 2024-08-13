if ($(".page-product").length > 0) {


  $("#carousel").attr("data-jcarousel", "false");

  $("#email_avise").length > 0 &&
    $("#email_avise").attr("placeholder", "Seu e-mail");

  $(".page-product__summary--anchor").on("click", function (e) {
    e.preventDefault();
    let headerHeight = $("header").height();
    let $hash = this.hash;
    let target = $('[data-content-id="' + $hash + '"]');
    !target.parent().hasClass("show") && target.trigger("click");

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($hash).offset().top - headerHeight,
        },
          900,
          "swing"
      );
  });

  if ($(".page-product").length > 0) {
    $(".products-related").length > 0 &&
      $(".products-related .showcase__list--related").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        rows: 0,
        nextArrow,
        prevArrow,
        dots: false,
        customPaging,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 678,
            settings: {
              slidesToScroll: 1,
              slidesToShow: 1,
            },
          },
        ],
      });
  }
  $(document).ready(function () {
    let arrowL = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="13" height="25" viewBox="0 0 13 25"><path fill="#525252" d="M11.16 25a1.88 1.88 0 001.63-.95 1.74 1.74 0 00-.22-1.98l-8.25-9.55 7.96-9.56a1.76 1.76 0 00.4-1.32A1.74 1.74 0 0012 .44a1.86 1.86 0 00-1.4-.43A1.89 1.89 0 009.3.7l-8.9 10.7a1.75 1.75 0 000 2.25l9.22 10.7a1.84 1.84 0 001.53.64z"/></svg>`;
    let arrowR = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="13" height="25" viewBox="0 0 13 25"><path fill="#525252" d="M1.84 25a1.88 1.88 0 01-1.63-.95 1.74 1.74 0 01.22-1.98l8.25-9.55L.72 2.96a1.76 1.76 0 01-.4-1.32A1.74 1.74 0 011 .44 1.86 1.86 0 012.4.01 1.89 1.89 0 013.7.7l8.9 10.7a1.75 1.75 0 010 2.25l-9.22 10.7a1.84 1.84 0 01-1.53.64z"/></svg>`;

    if ($(".page-product__gift").length > 0) {
      $("#btmais strong").replaceWith(arrowR),
      $("#btmenos strong").replaceWith(arrowL);
    }

    $("#precoDe").length > 0 &&
      $("#precoDe").html($("#precoDe").html().replace("De", ""));

    $("#brindes").slick({
      infinite: true,
      nextArrow,
      prevArrow,
      slidesToShow: 4,
      slidesToScroll: 1,
      rows: 1,
    });

    /* Added a input element that set values in original inputs */
    if ($("#cepbox").length > 0) {
      $(
        '<input onkeyup="mascara(this,numeros,event)" id="fullcep" type="text" placeholder="" maxlength="8"/>'
      ).insertBefore($("#cep1"));

      $("#cep1 , #cep2").attr("placeholder", " ");
      $("#fullcep").attr("placeholder", "Digite seu CEP");

      $("#fullcep").on("input", function () {
        let value = $(this).val();
        let $cep1 = $("#cep1");
        let $cep2 = $("#cep2");

        if (value.length <= 5) {
          $cep1.val(value);
          $cep2.val("");
        } else if (value.length === 8 && [0, 3].includes($cep2.val().length)) {
          $cep1.val(value.substring(0, 5));
          $cep2.val(value.substring(5));
        } else {
          $cep2.val(value.substring(5));
        }
      });
    }
  });

  $(window).ajaxComplete(function (event, xhr, settings) {
    if (settings) {
      if (settings.url.indexOf("brinde_produto") !== -1) {
        changeButton();
        let $target = $("#modal-form .brinde_detalhes .variacao img ");
        changeImgSize($target);
      }
    }
  });

  function changeImgSize(target) {
    let oldSrc = $(target).attr("src");
    let newSrc = oldSrc.replace("/90_", "/180_");
    $(target).attr("src", newSrc);
  }

  function changeButton() {
    let $img = $(".modal .botao > img").get(0);
    let $button = $("<button />");

    $.each($img.attributes, function (i, attribute) {
      if (attribute.name !== "src") {
        return $button.attr(attribute.name, attribute.value);
      }
    });

    $($img).replaceWith($button.text("Escolher"));
  }

  // Comments
  if ($("#bt-submit-comments").length > 0) {
    $("img#bt-submit-comments").after(
      '<button type="button" class="page-product__comments-btn">Enviar</button>'
    );
    $(".page-product__comments-btn").on("click", function (e) {
      e.preventDefault();
      $("img#bt-submit-comments").trigger("click");
    });
  }

  $('a[data-logged-user="false"]')
    .parent()
    .before($('a[data-logged-user="false"]'));
  $(".page-product__comments--btn").on("click", function () {
    $("#comentario_cliente").slideToggle();
  });

  $(".product-tabs__item a[data-content-id='#formasPagto']").on("click", function(){
    let existsTopBarParc = $("#atualizaFormas > div").hasClass("parc__container")
    let existsTopBarBoleto = $("#atualizaFormas > div").hasClass("boleto__container")

    if (!existsTopBarParc && !existsTopBarBoleto){

      $("#atualizaFormas").prepend("<div class='parc__container'><div class=pgto__topbar>PARCELAMENTO</div></div><div class='boleto__container'><div class='pgto__topbar'>BOLETO</div></div></div>");
      $(".product-tabs__content#formasPagto #atualizaFormas .Forma1>li>a").each(function () {
        let content = this.textContent;
        let isBoleto = content.includes("Boleto");

        if (isBoleto) {
          $(".boleto__container").append($(this).parent());
        } else {
          $(".parc__container").append($(this).parent());
        }
    });
    }
  });
  jQuery.ajax({
    url: 'sua-url-aqui',
    type: 'GET',
    success: function(data) {

    },
    complete: function() {
      jQuery('.parc__container li[id^="li_"]').each(function() {
        jQuery(this).find('td:first').remove();
        jQuery(this).find('td:last').remove();
      });
    }
  });
}
function process(quant){
  let value = parseInt(document.getElementById("quant").value);
  value += quant;
  if (value >= 1) {
    document.getElementById("quant").value = value;
  }
}

function requestProductsCart() {
  let idLoja = $('html').data('store');
  let ef_some_comprar = 0;
  $.getJSON("/mvc/store/cart/count?loja=" + idLoja, function(data) {
    let cartItem = 0,
      cartItemHtml = '',
      totalItemsCart = data.cart.Products.length;

    if(totalItemsCart !== 0) {
      $('.cart .list').find('li').remove();
      for(cartItem = 0; cartItem < totalItemsCart; cartItem++) {

        if((data.cart.Products[cartItem].price=='0,00') || (data.cart.Products[cartItem].price=='0.00')) {
          ef_some_comprar=1;
        }

        let ef_nome_variacao = data.cart.Products[cartItem].Variant.name;

        if(ef_nome_variacao != undefined) {
          cartItemHtml += '<li class=""><img class="item-image" src="'+data.cart.Products[cartItem].ProductImage[0].https +'"><span class="item-name">'+ data.cart.Products[cartItem].name +' ('+ef_nome_variacao+') </span><span class="item-qntd">'+ data.cart.Products[cartItem].quantity +'</span><span class="item-price">R$ '+ data.cart.Products[cartItem].price +'</span></li>';
        } else {
          cartItemHtml += '<li class=""><img class="item-image" src="'+data.cart.Products[cartItem].ProductImage[0].https +'"><span class="item-name">'+ data.cart.Products[cartItem].name +'</span><span class="item-qntd">'+ data.cart.Products[cartItem].quantity +'</span><span class="item-price">R$ '+ data.cart.Products[cartItem].price +'</span></li>';
        }
      }
      if(ef_some_comprar == 1) {
        $('.ef_btcomprar_car').css('display','none');
      }
    } else {
      $('.cart .list').find('li').remove();
      cartItemHtml += '<li class=""><span class="item-name">VAZIO</span></li>';
    }

    $('.cart .data-amount-cart').text(data.cart.amount);
    $('.cart .data-price-cart').text(data.cart.price);
    $('.cart .list').prepend(cartItemHtml);
  });
}

function mostra_carrinho(acionador) {
  if(acionador == 'btn_orcamento') {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

  $('.cart .toggle-element-car').css("visibility", "visible");
  $('.cart .toggle-element-car').css("opacity", "1");
}

function esconde_carrinho() {
  $('.cart .toggle-element-car').css("visibility", "hidden");
  $('.cart .toggle-element-car').css("opacity", "0");
}

(function($){
  //orcamento    btn em produto
  $('#ef_btn_orc_produto').on('click',function(){
    let dataProductId = $(this).data('product-id');
    let dataSession = $("html").attr("data-session");
    let button = $(this);
    let $product = button.parents('#form_comprar');
    let ef_qtd = ($product.find('#quantidade input[name="quant"]').length) ? $product.find('#quantidade input[name="quant"]').val() : 1;

  //variacao
    let ef_variation = '';
    let ef_li_all_variation = $(".lista_cor_variacao").find("li");
    let ef_cod_variacao = ef_li_all_variation.find(".cor_selecionada").parent().attr("data-id");

    if(ef_li_all_variation.length!=0 && ef_cod_variacao==undefined ){
        let ef_span_erro = ($product.find('#span_erro_carrinho'));
        ef_span_erro.css("display", "block");
    }
    if(ef_cod_variacao !== undefined && ef_cod_variacao !== null && ef_cod_variacao !== ''){
    ef_variation = ef_cod_variacao;
    }
    //ajax
    $.ajax({
      method: "POST",
      url: "/web_api/cart/",
      contentType: "application/json; charset=utf-8",
      data: '{"Cart":{"session_id":"'+dataSession+'","product_id":"'+dataProductId+'","quantity":"'+ef_qtd+'","variant_id":"'+ef_variation+'"}}',
    }).done(function( response, textStatus, jqXHR ){
      requestProductsCart();
      mostra_carrinho('btn_orcamento');
      location.reload();
    })
  });

  $('.product').find('.btn-add-to-cart').click(function(){
    let dataProductId = $(this).data('product-id');
    let dataSession = $("html").attr("data-session");
    let button = $(this);
    $.ajax({
      method: "POST",
      url: "/web_api/cart/",
      contentType: "application/json; charset=utf-8",
      data: '{"Cart":{"session_id":"'+dataSession+'","product_id":"'+dataProductId+'","quantity":"1"}}'
    }).done(function( response, textStatus, jqXHR ) {
      button.parents('.product').find('.sucess-add-cart').addClass('active');
      button.parents('.product').find('.title').removeClass('error').text('Produto adicionado');
      requestProductsCart();
      mostra_carrinho('btn_showcase_home');
      setTimeout(function(){
        button.parents('.product').find('.sucess-add-cart').removeClass('active');
      }, 2000);
    }).fail(function( jqXHR, status, errorThrown ){
      button.parents('.product').find('.sucess-add-cart').addClass('active');
      button.parents('.product').find('.title').addClass('error').text('Estoque insuficiente');
      setTimeout(function(){
        button.parents('.product').find('.sucess-add-cart').removeClass('active');
      }, 2000);
    });
  });

  requestProductsCart();

})(jQuery);


  /**openchat */

  $('#ef_btn_chat_produto').on("click", function() {
    movideskChatWidgetChangeWindowState('maximized');
    $('#md-chat-widget').css('cssText', 'display: block !important');
  });

  jQuery(".page-product__priceplus--text").on("click", function (event) {
    event.preventDefault();

    jQuery("#Aba3 a.product-tabs__link").click();

    jQuery("#Aba3").addClass("show");

    var topPosition = $(".product-tabs__item.show").offset().top;

    jQuery("html, body").animate({ scrollTop: topPosition }, 800);
  });
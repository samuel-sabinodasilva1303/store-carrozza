$(document).ready(function(){
  if ($(".paginate").length > 0) {
    let first =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="13" height="12" viewBox="0 0 13 12"><path fill="" fill-rule="evenodd" d="M12.28 11.28a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L7.81 5.75l4.47 4.47a.75.75 0 0 1 0 1.06Zm-6 0a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L1.81 5.75l4.47 4.47a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd"/></svg>',
      prev =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="7" height="12" viewBox="0 0 7 12"><path fill="" fill-rule="evenodd" d="M6.28 11.28a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L1.81 5.75l4.47 4.47a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd"/></svg>',
      next =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="7" height="12" viewBox="0 0 7 12"><path fill="" fill-rule="evenodd" d="M.47.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06-1.06L4.94 6 .47 1.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>',
      last =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="13" height="12" viewBox="0 0 13 12"><path fill="" fill-rule="evenodd" d="M.22.22a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06-1.06l4.47-4.47L.22 1.28a.75.75 0 0 1 0-1.06Zm6 0a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06-1.06l4.47-4.47-4.47-4.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>';
  
    $(".paginate__page--first > a").html(first);
    $(".paginate__page--prev > a").html(prev);
    $(".paginate__page--next > a").html(next);
    $(".paginate__page--last > a").html(last);
  }
  
    const textPageContact = $('.page-contact .default-content > .container');
    const buttonPageContact = $('.page-contact #btn_submit img.image');
    const inputTelPageContact = $('.page-contact #telefone_contato');
    const textEmailPageContact = $('.page-contact .email-texto');
    const tel01PageContact = $('.page-contact .contato-telefones .block:nth-child(1)');
    const tel02PageContact = $('.page-contact .contato-telefones .block:nth-child(2)');
    
    textPageContact.prepend(`
        <h1>Fale conosco</h1>
        <p class="contactUs-description">Precisa falar com a gente? Utilize uma das opções abaixo para entrar em contato conosco.</p>
    `);
    buttonPageContact.parent().text('Enviar Mensagem').addClass('button2').children().remove();
    inputTelPageContact.removeAttr('onkeypress maxlength').addClass('mask-phone');
    textEmailPageContact.parent().wrap('<div class="contactUs-email"></div>');
    
    // Manipula os telefones
    if (tel01PageContact.length) {
        let phoneNumberFormatted = tel01PageContact.text();
        let phoneNumber = phoneNumberFormatted.replace(/\D/g, '');
    
        tel01PageContact.unwrap().parent().addClass('contactUs-phone')
            .html(`<h3>Central de Atendimento ao Cliente</h3>
            <a href="tel:${phoneNumber}" title="Ligue para nós">${phoneNumberFormatted}</a>`);
    }
    
    if (tel02PageContact.length) {
        let phoneNumberFormatted = tel02PageContact.text();
        let phoneNumber = phoneNumberFormatted.replace(/\D/g, '');
    
        tel02PageContact
            .wrap('<div class="contactUs-whats"></div>')
            .parent()
            .insertAfter('.page-contact .contactUs-phone').html(`<h3>WhatsApp</h3>
                <a target="_blank" tray-wp rel="noopener noreferrer" href="https://api.whatsapp.com/send?l=pt&phone=55${phoneNumber}" title="Fale conosco no WhatsApp">${phoneNumberFormatted}</a>`);
    }
    
    // Remove os outros elementos indesejados
    $('.page-contact .board:not(:has(#form1))').remove();
    
  
  if ($(window).width() < 768) {
    $('.showcase__list--related').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true
    });
    $('.banners__center--container').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 3000,
    });
    $('.history__main--segmentation-container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
    });
  }
});
if ($(".gallery").length > 0) {

  /* Variables */
  const input = document.getElementById("selectedVariant"),
    galleryData = JSON.parse(
      document.getElementById("gallery-data").textContent
    );

  let $parent = $(".gallery"),
    $nav = $parent.find(".gallery__nav"),
    $frame = $parent.find(".gallery__frame");

  /* Hide buttons if product not have stock or not availiable  */
  function changeVariation(variationId) {
    galleryData.forEach(({ id, images, thumbs, stock }) => {
      +id === +variationId && changeGallery(thumbs, images);
      +id === +variationId && +stock < 1
        ? $(".buy-button").hide()
        : $(".buy-button").show();
    });
  }

  galleryData.some((item) => item.selected)
    ? hasSelectedVariation()
    : initThumbsAndGallery();

  /* When page has a variation selected remove items and rebuild */
  function hasSelectedVariation() {
    galleryData.forEach(({ id, selected }) => {
      if (selected) {
        $frame.find(".gallery__link").not(".video").remove();
        $nav.find(".gallery__figure").not(".video").remove();
        changeVariation(id);
      }
    });
  }

  /** Initialize slick in main image and thumbs too */
  function initThumbsAndGallery() {
    $nav.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: $frame,
      centerMode: false,
      focusOnSelect: true,
      vertical: true,
      rows: 0,
      nextArrow,
      prevArrow,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            vertical: false
          }
        }
      ]
    });

    $frame.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: $nav,
      fade: true,
      rows: 0,
      arrows: false,
      slide: ".gallery__link",
    });
  }

  /* Rebuild the structure when variation changes */
  function changeGallery(thumbs = [], images = []) {
    let templateThumb = (src) =>
        `<figure class="gallery__figure gallery__figure--nav"><img src="${src}" width="97" height="97" alt="img_thumb" loading="lazy"></figure>`,
      templateFrame = (src) =>
        `<a href="${src}" data-fancybox="gallery" class="gallery__link"><figure class="gallery__figure gallery__figure--frame"><img src="${src}" width="500" height="500" alt="img_frame" loading="lazy"></figure></a>`,
      elementsThumbs = "",
      elementsFrames = "";

    thumbs.forEach((src) => (elementsThumbs += templateThumb(src)));
    images.forEach((src) => (elementsFrames += templateFrame(src)));

    $nav.prepend(elementsThumbs);
    $frame.prepend(elementsFrames);
    initThumbsAndGallery();
  }

  /* Destroy main images and thumbs except main video and thumb video */
  function destroyGallery() {
    // $.fancybox.destroy();
    $frame.slick("unslick").find(".gallery__link").not(".video").remove();
    $nav.slick("unslick").find(".gallery__figure").not(".video").remove();
  }

  if (input) {
    const observer = new MutationObserver(function (mutations, observer) {
      if (mutations[0].attributeName === "value") {
        $(input).change();
      }
    });

    observer.observe(input, { attributes: true });

    $("#selectedVariant").on("change input", function (e) {
      let value = $(this).val();
      value.length && destroyGallery();
      value.length && changeVariation(value);
    });
  }

  if($('.gallery__link.video').length > 0) {

    function createUrlOfIframe(url){
      if(url.indexOf('.youtube.') !== -1 || url.indexOf('/youtu.be/') !== -1 ){
        return `https://www.youtube.com/embed/${url.slice(url.lastIndexOf('/') + 1)}?autoplay=1&loop=1&autopause=0`;
      }else if(url.indexOf('vimeo') !== -1){
        return `https://player.vimeo.com/video/${url.split('?')[0].slice(url.split('?')[0].lastIndexOf('/') + 1)}?autoplay=1`
      }else {
        return undefined
      }
    }

    function createIframeModal(link){
      if(createUrlOfIframe(link) !== undefined){
        const template = `<iframe src="${createUrlOfIframe(link)}" width="800" height="450" allow="autoplay; fullscreen" allowfullscreen>`;
        $('body').toggleClass('overlay')
        $('#overlay').append(template)
      } else {
        console.error('[Link do video não pertence ao Youtube ou ao Vimeo]')
      }
    }


    $('.gallery__link.video').on('click', function(e){
      e.preventDefault();
      createIframeModal($(this).attr('href'))
      console.log('[open video]')
    })

  }
}

$('.slick-carousel').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
      {
          breakpoint: 768,
          settings: {
              slidesToShow: 1
          }
      }
  ]
});
//Carroussel de produtos
if ($(".showcase").length > 0 && !window.matchMedia("(max-width: 767px)").matches) {
  $('.showcase[data-carousel="true"] .showcase__list').each(function () {
    var itemCount = $(this).find('.showcase__item').length;
    if (itemCount > 4) {
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        rows: 0,
        nextArrow: false,
        prevArrow: false ,
        dots: false,
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
  });
}else{
  if ($(".showcase").length > 0) {
    $('.showcase[data-carousel="true"] .showcase__list').each(function () {
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        rows: 0,
        nextArrow: false,
        prevArrow: false ,
        dots: false,
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
    });
  }
}

//Full banner Home
$(document).ready(function () {

  $(".banner-home__list").slick({
    inifinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 0,
    dots: true,
  });

  
});

// andressement
 // Esconder todos os vídeos inicialmente
 $('.endorsserments__main--video').hide();

 // Mostrar o primeiro vídeo
 $('.endorsserments__main--video[data-video="1"]').show();

 $('[data-persona="1"]').hide();

 $('[data-persona]').on('click', function() {
     var personaId = $(this).data('persona');

     $('.endorsserments__main--video').hide();

     $('.endorsserments__main--video[data-video="' + personaId + '"]').show();

     $('[data-persona]').show();

     $('[data-persona="' + personaId + '"]').hide();
 });



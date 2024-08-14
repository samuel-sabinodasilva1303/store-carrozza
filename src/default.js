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

 
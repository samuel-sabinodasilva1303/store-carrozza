if ($(".ruler").length > 0) {
  const configSlick = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    arrows: false,
    rows: 0,
  };

  function slickAction(action) {
    $(".ruler").slick(action);
  }

  let mobileMq = window.matchMedia("(max-width: 991px)");

  // when load page - check media query
  mobileMq.matches && slickAction(configSlick);

  // listening when change between 991px
  mobileMq.addEventListener("change", (e) => {
    e.matches ? slickAction(configSlick) : slickAction("unslick");
  });
}

if (isMobile) {
  $(".menu-mobile .menu__list").each(function (indexx) {
    let element = `<li class="menu__item menu__item--see-more"><a href="#">Ver Mais</a></li>`;
    let $lists = $(this);

    $lists
      .find("> li")
      .not(".menu__item--see-more")
      .each(function (index) {
        index > 9 && $(this).hide();
      });

    $lists.find("> li").length > 9 && $lists.append(element);
  });

  $(".menu__item--see-more > a").on("click", function (e) {
    e.preventDefault();

    let $hideItems = $(this).closest("ul").find(" > li:hidden");

    $hideItems.length > 0 &&
      $hideItems.each(function (index) {
        index <= 9 && $(this).fadeIn('555');
      });
      $(this).closest("ul").find(" > li:hidden").length < 1 && $(this).closest('li').remove();
  });
}

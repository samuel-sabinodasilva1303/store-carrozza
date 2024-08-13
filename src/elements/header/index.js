$(document).ready(function () {
    var currentUrl = window.location.href;
    var listItems = document.querySelectorAll(".btn_esquerda li");

    listItems.forEach(function (li) {
      var link = li.querySelector("a");
      var href = link.getAttribute("href");

      if (currentUrl === window.location.origin + '/' && href === window.location.origin + '/') {
        li.classList.add("loja_ativa");
      } else if (currentUrl.includes("/rolamentos-home") && href.includes("/rolamentos-home")) {
        li.classList.add("loja_ativa");
      } else {
        li.classList.remove("loja_ativa");
      }
    });
 

  $("[data-hidden-id]").each(function () {
    var $el = $(this);
    var id = $el.attr("data-hidden-id");

    $el.on("click", function (e) {
      e.preventDefault();
      var value = $(id).attr("aria-hidden") === "true";

      $("body").toggleClass("disabled");
      $(id).attr("aria-hidden", !value);
    });
  });

  $(".menu__arrow").on("click", function () {
    var $el = $(this);
    var value = $el.attr("data-expanded") === "true";
    $el.attr("data-expanded", !value);
    $el.next().slideToggle(300);
  });

  $(".header .header__button").on("click", function (e) {
    e.preventDefault();
  });
});

var current = 0

$(window).on("scroll", function () {
  current = 0
  current += $(this).scrollTop();

  if (current > 180) {
    $("body").addClass("scroll");
  } else {
    $("body").removeClass("scroll show-menu");
    $(".header__menu-scroll").removeClass("scroll--active")
  }
});

$(".header__button").on("click", function(){
  let buttonActive =  $(this).hasClass("button-active")
  $(this).addClass("button-active")
  if(!buttonActive){
    if (current > 180) {
      $(".header__menu-scroll").addClass("scroll--active")
    }
    else{
      $(".header__menu-scroll").removeClass("scroll--active")
    }
  }
  else{
    $(this).removeClass("button-active")
    $(".header__menu-scroll").removeClass("scroll--active")
  }
})

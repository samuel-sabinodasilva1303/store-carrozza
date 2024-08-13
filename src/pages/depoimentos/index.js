if ($(".page-depoimentos").length > 0) {
  $('input[name="nome_depoimento"]').attr("placeholder", "John Doe");
  $('input[name="email_depoimento"]').attr("placeholder", "email@email.com");
  $('textarea[name="msg_depoimento"]').attr("placeholder", "Loja muito ...");
  $(".main__container > .board .editDep h3.color").each(function () {
    var newText = $(this).text().replace("Nome: ", "");
    $(this).text(newText);
  });
}

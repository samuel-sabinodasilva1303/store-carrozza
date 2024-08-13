
if ($(".page-register").length > 0) { 
  $("#pf_span_sexo label").addClass("alingItens");

  $(".page-register .main__container>.container3 .board").prepend("<svg width='66' height='66' viewBox='0 0 66 66' fill='none' xmlns='http://www.w3.org/2000/svg'><g opacity='0.15'><path d='M33.1385 57.7496C33.0924 57.7499 33.0462 57.75 33 57.75C32.9538 57.75 32.9076 57.7499 32.8615 57.7496C32.9081 57.7039 32.9543 57.6577 33 57.6111C33.0457 57.6577 33.0919 57.7039 33.1385 57.7496Z' fill='#2B6FF1'/><path fill-rule='evenodd' clip-rule='evenodd' d='M49.4823 51.4637C49.494 51.269 49.5 51.0727 49.5 50.875C49.5 45.5593 45.1907 41.25 39.875 41.25H26.125C20.8093 41.25 16.5 45.5593 16.5 50.875C16.5 51.0727 16.506 51.269 16.5177 51.4637C11.444 46.9313 8.25 40.3387 8.25 33C8.25 19.331 19.331 8.25 33 8.25C46.669 8.25 57.75 19.331 57.75 33C57.75 40.3387 54.556 46.9313 49.4823 51.4637ZM33 33C37.5564 33 41.25 29.3063 41.25 24.75C41.25 20.1936 37.5564 16.5 33 16.5C28.4436 16.5 24.75 20.1936 24.75 24.75C24.75 29.3063 28.4436 33 33 33Z' fill='#2B6FF1'/></g><path d='M26.6812 42.75H39.3188V39.75H26.6812V42.75ZM39.3188 42.75C44.1133 42.75 48 46.6367 48 51.4312H51C51 44.9799 45.7701 39.75 39.3188 39.75V42.75ZM26.6812 39.75C20.2299 39.75 15 44.9799 15 51.4312H18C18 46.6367 21.8867 42.75 26.6812 42.75V39.75ZM39.75 24.75C39.75 28.4779 36.7279 31.5 33 31.5V34.5C38.3848 34.5 42.75 30.1348 42.75 24.75H39.75ZM33 31.5C29.2721 31.5 26.25 28.4779 26.25 24.75H23.25C23.25 30.1348 27.6152 34.5 33 34.5V31.5ZM26.25 24.75C26.25 21.0221 29.2721 18 33 18V15C27.6152 15 23.25 19.3652 23.25 24.75H26.25ZM33 18C36.7279 18 39.75 21.0221 39.75 24.75H42.75C42.75 19.3652 38.3848 15 33 15V18ZM56.25 33C56.25 45.8406 45.8406 56.25 33 56.25V59.25C47.4975 59.25 59.25 47.4975 59.25 33H56.25ZM33 56.25C20.1594 56.25 9.75 45.8406 9.75 33H6.75C6.75 47.4975 18.5025 59.25 33 59.25V56.25ZM9.75 33C9.75 20.1594 20.1594 9.75 33 9.75V6.75C18.5025 6.75 6.75 18.5025 6.75 33H9.75ZM33 9.75C45.8406 9.75 56.25 20.1594 56.25 33H59.25C59.25 18.5025 47.4975 6.75 33 6.75V9.75Z' fill='#2B6FF1'/></svg>");
  $("#telefone_cliente, #telefone_cliente_2, #pf_data_nascimento, #pf_cpf_cliente, #ie, #cnpj").parent().addClass("halfField");
  $("#senha_cliente").parents("p").addClass("passwordsField")
  $("#telefone_cliente_2").parent().addClass("rightHalfField");
  $(".page-register .main__container>.container>.container2 fieldset").append($("#email").parent());
  $(".termContainerRegister").prepend("<p class='new_term'>Ao criar uma conta voc\u00ea est\u00e1 de acordo com <span>nossa pol\u00edtica de privacidade.</span></p>")
  $("#endereco_cobranca_diferente, .dif").wrapAll("<div class='new__address'></div>");
  $(".adicionar_mais h3").addClass("adicionar_flex")

  $(".obriga").each(function(){
    var mandatoryField = $(this).parent().text().replaceAll("*", "")
    $(this).parent("label").prepend("<label>"+mandatoryField+"<span class='mandatoryStar'>*</span></label>")
    $(this).parent("label").addClass("mandatoryField")
  })

  $("#pf_cpf_cliente, #telefone_cliente_2, #cnpj").parent().addClass("halfField--right"); 

  
  $("#CadastroAbas > ul > li").on("click", function () {
    $("input#flagPfPj").trigger("change");
  });

  $("input#flagPfPj").on("change", function () {
    $(this).val() === "1"
      ? $("#main").addClass("_pj")
      : $("#main").removeClass("_pj");
  });

  if ($("#span_cep_nacional").length > 0) {
    $(
      '<input onkeyup="mascara(this,numeros2,event)" class="obriga" id="fullcep2" type="text" placeholder="00000-000" maxlength="8"/>'
    ).insertBefore($("#cep_1"));

    $("#cep_1 #cep_2").attr("placeholder", " ");

    let $cep1 = jQuery("#cep_1");
    let $cep2 = jQuery("#cep_2");
    $cep1.hide();
    $cep2.hide();

    $("#fullcep2").on("input", function () {
      let value = $(this).val();

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
    $("#fullcep2").attr("onblur", $cep2.attr("onblur"));
  }
}

//Solução alternativa
$(document).ready(function(){
  $("#ad_juridica > fieldset > p > .mandatoryField label").first().text("VOC\u00ca \u00c9 CONTRIBUENTE?");
  $("#ad_juridica > fieldset > p > .mandatoryField label").eq(1).text("VOC\u00ca \u00c9 UMA REVENDA?");
  $("#ad_juridica > fieldset > p > .mandatoryField").css("width", "500px");

  $(".page-register .main__container>.container>.container2 fieldset").append("<h1></h1>")
  $(".page-register .main__container>.container>.container2 fieldset label").last().addClass("loadInfo")

  setTimeout(function(){
   
  $(".container2").css("display", "block")
  }, 100);
   
  });
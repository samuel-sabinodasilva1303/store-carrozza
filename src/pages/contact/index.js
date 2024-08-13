if($('.page-contact').length > 0 ){

  $('input[name="nome_contato"]').attr('placeholder','John Doe')
  $('input[name="empresa"]').attr('placeholder','Xyz Ltda.')
  $('input[name="email_contato"').attr('placeholder','email@email.com')
  $('input[name="telefone_contato"]').attr('placeholder','(xx) xxx-xxx')
  $('input[name="assunto"]').attr('placeholder','Compra')
  $('textarea[name="mensagem_contato"').attr('placeholder','Olá solicito...')

  var $inputImg = $('input[type="image"]#imagem').get(0) || $('a#btn_submit').get(0)
  var $button = $('<button />')

  $.each($inputImg.attributes, function(i, attribute){
    if(attribute.name !== 'src'){
      return $button.attr(attribute.name, attribute.value)
    }
  })

  $button.attr('type', 'button');

  $($inputImg).replaceWith($button.text('Enviar'))
}

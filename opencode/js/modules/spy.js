function spyProduct(id) {
	jQuery('.spy-product').toggle();
	
	var productId = id;
	
	jQuery.ajax({
		method: "GET",
		url: "/web_api/products/" + productId
	}).done(function(response, textStatus, jqXHR) { 
		console.log(response);
		var resProduct = response.Product; 
		 
		/* img do produto */
		jQuery('.spy-image-full img').attr('src', resProduct.ProductImage[0].https);
		
		/* monta thumbs das imagens */
		jQuery('.spy-image-thumbs').html('');
		var imgListThumbs = "";
		for(var i = 0; i < resProduct.ProductImage.length; i++) {
			imgListThumbs += "<li class='spy-img-thumbs-item'>";
			imgListThumbs += "<img src='"+ resProduct.ProductImage[i].thumbs[90].https +"' data-spy-img-full='"+ resProduct.ProductImage[i].https +"'>";
			imgListThumbs += "</li>";
		}
		 
		if(resProduct.video != "") {
			imgListThumbs += "<li class='spy-img-thumbs-item product-video'>";
			imgListThumbs += "<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0NjEuMDAxIDQ2MS4wMDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ2MS4wMDEgNDYxLjAwMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojRjYxQzBEOyIgZD0iTTM2NS4yNTcsNjcuMzkzSDk1Ljc0NEM0Mi44NjYsNjcuMzkzLDAsMTEwLjI1OSwwLDE2My4xMzd2MTM0LjcyOCAgYzAsNTIuODc4LDQyLjg2Niw5NS43NDQsOTUuNzQ0LDk1Ljc0NGgyNjkuNTEzYzUyLjg3OCwwLDk1Ljc0NC00Mi44NjYsOTUuNzQ0LTk1Ljc0NFYxNjMuMTM3ICBDNDYxLjAwMSwxMTAuMjU5LDQxOC4xMzUsNjcuMzkzLDM2NS4yNTcsNjcuMzkzeiBNMzAwLjUwNiwyMzcuMDU2bC0xMjYuMDYsNjAuMTIzYy0zLjM1OSwxLjYwMi03LjIzOS0wLjg0Ny03LjIzOS00LjU2OFYxNjguNjA3ICBjMC0zLjc3NCwzLjk4Mi02LjIyLDcuMzQ4LTQuNTE0bDEyNi4wNiw2My44ODFDMzA0LjM2MywyMjkuODczLDMwNC4yOTgsMjM1LjI0OCwzMDAuNTA2LDIzNy4wNTZ6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=' data-spy-product-video='"+ resProduct.video +"'>";
			imgListThumbs += "</li>";
		}
		
		jQuery('.spy-image-thumbs').append(imgListThumbs);
		
		/* altera as imagens conforme thumbs */
		jQuery('#spy-iframe-video').hide();
		jQuery('.spy-img-thumbs-item').click(function() {
		   var imgFull = jQuery(this).find('img').data('spy-img-full'); 
		   var productVideo = jQuery(this).find('img').data('spy-product-video'); 
		   if(jQuery(this).hasClass('product-video')){
				jQuery('#spy-iframe-video').attr('src', productVideo).show();
				jQuery('.spy-image-full img').hide();
		   } else {
				jQuery('.spy-image-full img').show();
				jQuery('.spy-image-full img').attr('src', imgFull);
				jQuery('#spy-iframe-video').attr('src', '');
				jQuery('#spy-iframe-video').hide();
		   }
		});
		
		/* nome do produto */
		jQuery('.spy-name').text(resProduct.name);
		
		/* descricao do produto */
		jQuery('.spy-description').text(resProduct.description_small);
		
		/* preco do produto */
		var price = resProduct.promotional_price > 0 ? resProduct.promotional_price : resProduct.price;
		var promotion = resProduct.promotional_price > 0;
		if(promotion){
			jQuery('.spy-price').text('R$' + resProduct.price.replace(".",","));
		} else {
			jQuery('.spy-price').text('');
		}
		jQuery('.spy-price-off').text('R$' + price.replace(".",","));
		
		/* parcelamento do produto */
		jQuery('.spy-payment').html(resProduct.payment_option_html);
		
		/* variacoes */
		var arrIdVariants = [];
		for(var i = 0; i < resProduct.Variant.length; i++) {
			arrIdVariants.push(resProduct.Variant[i].id);
		}
		
		/* Monta o select das variacoes caso seja diferente de vazio */
		if(arrIdVariants != "") {
			getVariants(arrIdVariants);
		}
		
		/* seleciona a variacao e atualiza as informacoes do produto */
		jQuery(document).on('change', '#select-spy-variation', function() {
			var dataIdVar = jQuery(this).find(':selected').val();
			var dataJson = jQuery(this).find(':selected').attr('data-json');
			var obj = jQuery.parseJSON(dataJson);
			
			/* Altera preco de promocao da variacao */
			jQuery('.spy-price').text(obj.pricepromotion);
			
			/* Altera preco da variacao */
			jQuery('.spy-price-off').text('R$' + obj.price);
			
			/* Altera o parcelamento da variacao */
			getPaymentHTML(dataIdVar);
			
			/* Altera imagem da variacao */
			jQuery('.spy-image-full img').attr('src', obj.varimg);
			
			jQuery('.spy-alert').hide();
		});
		
		/* spy quantity */
		jQuery('.spy-quantity-input').attr('value', '1');
		
		/* insert onclick in button addToCart */
		jQuery('#spy-button-add').attr('onclick', 'addToCart(' + resProduct.id + ')');
		
	}).fail(function(jqXHR, status, errorThrown) { 
		var response = jQuery.parseJSON(jqXHR.responseText);
		console.log(response);
	}).always(function(jqXHR, status) {
		console.log('aguarde');
	});
}

function getVariants(arrIdVariants) {
	jQuery.ajax({
		method: "GET",
		url: "/web_api/variants/?id=" + arrIdVariants
	}).done(function(response, textStatus, jqXHR) {
		var resVariants = response.Variants;
		
		jQuery('.spy-variation').html("<select id='select-spy-variation'><option value=''>Selecione uma varia��o</option></select>");
		
		var htmlVariants = "";
		for(var i = 0; i < resVariants.length; i++){
			var resVariant = resVariants[i].Variant;

			var skuVariant = resVariant.Sku;
			var skuVar = "";
			for(var j = 0; j < skuVariant.length; j++) {
				skuVar += skuVariant[j].type + " - " + skuVariant[j].value + " "; 
			}
			
			/* Promotion price Variants */
			var dateExpired   = false;
			var dateEndPromotion  = resVariant.end_promotion;
		
			if(new Date() >= new Date(Date.parse(dateEndPromotion + " 23:59:59"))) {
				console.log('data expirou');
				dateExpired = true; 
			}
			
			var priceVar = resVariant.promotional_price > 0 ? resVariant.promotional_price : resVariant.price;
			var promotion = resVariant.promotional_price > 0;
			var priceVarPromotion = "";
			if(promotion && dateExpired == false) {
				priceVarPromotion = "R$ " + resVariant.price;
			} else {
				priceVarPromotion = "";
			} 
			
			var jsonDateVars = '{"pricepromotion": "' + priceVarPromotion.replace(".", ",") + '", "price": "' + priceVar.replace(".", ",") + '", "varimg": "' + resVariant.VariantImage[0].https + '"}';
			
			htmlVariants += "<option value='" + resVariant.id + "' data-json='" + jsonDateVars + "'>" + skuVar + "</option>";
		}
		jQuery('#select-spy-variation').append(htmlVariants); 
		
	}).fail(function(jqXHR, status, errorThrown) {
		var response = jQuery.parseJSON(jqXHR.responseText);
		console.log(response);
	}); 
}

function getPaymentHTML(idVar) {
	var params = {};
	params["id"] = idVar;
	
	jQuery.ajax({
		method: "GET",
		url: "/web_api/variants/",
		data: params
	}).done(function(response, textStatus, jqXHR) {
		var resVariants = response.Variants;
		var htmlVariants = "";
		for(var i=0; i < resVariants.length; i++) {
			var resVariant = resVariants[i].Variant;
			jQuery('.spy-payment').html(resVariant.payment_option_html);
		}
	});
}

function spyClose() {
	jQuery('.spy-product').toggle();
	jQuery('.spy-quantity-input').attr('value', '1');
	
	/* limpa select das variacoes */
	jQuery('.spy-variation').html('');
	jQuery('.spy-alert').hide();
	jQuery('.spy-image-full img').show();
	jQuery('#spy-iframe-video').attr('src', '');
}

function addToCart(idProd) {
	var dataProductId = idProd;
	var dataSession = jQuery("html").attr("data-session"); 
	var alertCart = jQuery('.message-cart');
	var variantId = jQuery('#select-spy-variation').val();
	var dataJson = "";
	
	var cart_quantity = jQuery('.spy-quantity-input').attr('value');
	if(cart_quantity > 1) {
		cart_quantity = cart_quantity;
	} else {
		cart_quantity = 1;
	}
	
	if(jQuery('#select-spy-variation').length) {
		if(variantId == "") {
			jQuery('.spy-alert').show();
			return;
		} else {
			dataJson = '{"Cart": {"session_id": "' + dataSession + '", "product_id": "' + dataProductId + '", "quantity": "' + cart_quantity + '", "variant_id": "' + variantId + '"}}';	
			jQuery('.spy-alert').hide();
		}
	} else {
		dataJson = '{"Cart": {"session_id": "' + dataSession + '", "product_id": "' + dataProductId + '", "quantity": "' + cart_quantity + '"}}';
	}
	
	jQuery.ajax({
		method: "POST",  
		url: "/web_api/cart/",
		contentType: "application/json; charset=utf-8",
		data: dataJson
	}).done(function(response, textStatus, jqXHR) {
        alertCart.addClass('show');
		setTimeout(function() {   
			alertCart.removeClass('show');
		}, 2000);
		requestProductsCart();
		mostra_carrinho('btn_showcase_home');
	}).fail(function(jqXHR, status, errorThrown) {
        alertCart.addClass('show fail');
		setTimeout(function() {   
			alertCart.removeClass('show fail');
		}, 2000);
	}).always(function(response, textStatus, jqXHR) {
		spyClose();
	});
}

function removeItemCart(idProd, idVar) {
	var dataSession = jQuery("html").attr("data-session"); 
	var urlRemoveCart = "";
	if(typeof idVar != "undefined") {
		urlRemoveCart = "/web_api/carts/" + dataSession + "/" + idProd + "/" + idVar;
	} else {
		urlRemoveCart = "/web_api/carts/" + dataSession + "/" + idProd;	 
	}
     
	jQuery.ajax({
		method: "DELETE",
		url: urlRemoveCart
	}).always(function(response, textStatus, jqXHR) {
		requestProductsCart();
	});
}
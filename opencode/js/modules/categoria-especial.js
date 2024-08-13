(function($){

//
 $( document ).ready(function() {
    var ifr=document.getElementById('ef_ifr_especial');
    var marca_parceira = $('#holder_iframe').attr("cat_id");
    if(marca_parceira!=''){
    ifr.src=marca_parceira; 
    }
    ifr.style.overflow = "hidden";

ifr.onload=function(){

 (function($){
     var iBody = $("#ef_ifr_especial").contents().find("body");
     
     
     iBody.find(".header").css('display','none');
     iBody.find(".categories-list").css('display','none');
     iBody.find(".footer").css('display','none');
     iBody.find(".newsletter").css('display','none');
     iBody.find("#NavLogoTray").css('display','none');
     iBody.find("#wh-widget-send-button").css('display','none');
     iBody.find("#md-chat-widget").css('display','none');
     iBody.find("#Page .banner").css('display','none');
     iBody.find("#Page .breadcrumb-wrapper").css('display','none');
     iBody.find("#Page .wrapper-filters").css('display','none');
     iBody.find(".container.full").css('background','none');
     
var cls = $("#ef_ifr_especial").offset().top;
console.log("1============>"+cls);
$("html, body").animate({scrollTop: (cls-150)}, "slow");
     

    var ef_prim_link= '';
    ef_prim_link=iBody.find("#Page > aside > form > div.box-filter.applied > ul > li:nth-child(1) > a");
    ef_prim_link.attr("href", marca_parceira);

    var ef_prodct_link= '';
    ef_prodct_link=iBody.find(" #Page > div > div.content-showcase > div > ul > li > div > a");
    ef_prodct_link.attr('target','_blank');
    
    var height_csc = iBody.find("#Page .catalog-content").height();
    var height_filtro = iBody.find("#Page aside").height();
    var height_respiro = 100;

    if(height_filtro >= height_csc ){
    $("#ef_ifr_especial").css('height',(height_filtro+height_respiro)+'px');
    }else{
    $("#ef_ifr_especial").css('height',(height_csc+height_respiro)+'px');
    }
    

  
if (window.matchMedia("(max-width: 769px)").matches) {
     iBody.find(".categories-list-mobile").css('display','none');
      $("#ef_ifr_especial").css('width',(parent.document.body.clientWidth)+'px'); 
}
    
 
setTimeout(function(){
 $('#holder_iframe').css("visibility", "visible");
},100);

iBody.find("#Page a.sidebar-left").click(function() {
 $('#holder_iframe').css("visibility", "hidden");
});    
    })(jQuery);
    };
});
//

 //slick parceiras
 if($('.catalog-content').length > 0){

	    	//BANNER FULLBANNERS
			$('.banner-catesp-slide').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			accessibility: false, 
			lazyLoad: 'progressive', 
			autoplay: true,
			speed: 500,
			arrows: false,
			dots: false,
			responsive: [
			    {
			      breakpoint: 768,
			      settings: {
			        arrows: false,
			        dots: false
			      }
			    }
			  ]
		});
		
	   	// PRODUCT
		$('.showcase .product-list').slick({ 
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			accessibility: false,  
			speed: 500,
			lazyLoad: 'ondemand',
			responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2,  
			        arrows: false,
			        dots: true
			      } 
			    },
			    {
			      breakpoint: 768,
			      settings: {
			      	slidesToShow: 2,
			        slidesToScroll: 2,  
			        arrows: false,
			        dots: true
			      }
			    },
			    {
			      breakpoint: 480, 
			      settings: {
			      	slidesToShow: 1,
			        slidesToScroll: 1,  
			        arrows: false,
			        dots: true
			      }
			    }
			  ]
		});

 }
 //fim slick parceiras

})(jQuery);

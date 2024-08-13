let timeOut = setInterval(function(){
    let removeIframe = $("#md-app-widget ~ iframe");

    removeIframe.each(function(){
        let iframe = $(this);

        if(!iframe.attr('style') && !iframe.attr('class')){
            iframe.remove();
            clearInterval(timeOut);
        }
    })
}, 1000);
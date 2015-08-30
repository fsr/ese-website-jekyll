// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).ready(function(){
    $(document).foundation();
    $('.slider').slick({
        lazyLoad: 'ondemand',
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        // Disable navigation arrows
        arrows: false
    });

    /**
     * Test if a SE Bot tries to look at the site
     * This is only for the development site gh-pages
     */
    if(/bot|googlebot|crawler|spider|robot|crawling/i.test(window.navigator.userAgent)) {
    	$('#crawler-message').foundation('reveal', 'open');
    	$('.body-wrapper').hide();
	    window.location.replace("https://ese.ifsr.de");
    }

    /**
     * Developer Preview Message Reveal
     */
    if(!$( "html" ).hasClass( "crawler" ) && document.cookie != "dev_keks=42") {
    	$('#developer-preview-message').foundation('reveal', 'open');
    	$('.body-wrapper').hide();
    }

    /**
     * Set the cookie and close the reveal message
     */
    $("#developer-preview-message-close").on('click', function() {
    	setDevCookie(5);
    	$('.body-wrapper').show();
  		$('#developer-preview-message').foundation('reveal', 'close');
		});

		/**
		 * Function to set a cookie that expires in @days
		 */
		function setDevCookie(days) {
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() + days);
			expireDate.toUTCString();
  		document.cookie = 'dev_keks=42; expires=' + expireDate + '; path=/';
		}

});

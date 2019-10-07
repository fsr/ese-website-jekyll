$(document).foundation();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/2019/service-worker.js')
        .then(function(registration) {
            console.log(
                'Service Worker registration successful with scope: ',
                registration.scope
            );
        })
        .catch(function(err) {
            console.log('Service Worker registration failed: ', err);
        });
}

jQuery(document).ready(function($){
    let countdown = $('#countdown');

    if (countdown.length) {
        setInterval(function() {
            makeTimer();
        }, 1000);
    }

    let nav = responsiveNav("#nav-main", {
        animate: true,
        transition: 284,
        label: '',
        insert: "after"
    });

    let insightSlider = $('.slider');

    if  (insightSlider.length) {
        insightSlider.slick({
            rows: 1,
            dots: false,
            infinite: true,
            arrows: false,
            autoplay: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'
        });
    }

    let highlightSlider = $('.slider-highlight');

    if  (highlightSlider.length) {
        highlightSlider.slick({
            rows: 1,
            dots: false,
            infinite: true,
            arrows: true,
            autoplay: true,
            speed: 500,
            slidesToShow: 4,
            prevArrow: "<span class='slick-prev slick-arrow'></span>",
            nextArrow: "<span class='slick-next slick-arrow'></span>",
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
            ]
        });
    }

    let dateMenu = $('.scheduler-days');

    if (dateMenu.length) {
        let dateMenuLink = new Gumshoe('.scheduler-days a', { offset: 100 });

        let deviceHeight = Math.min(document.documentElement.clientHeight, screen.height);
        let documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight,
            document.documentElement.offsetHeight );
        let scrollHeight = documentHeight < (2 * deviceHeight) ? 0 : deviceHeight/2;

        if (documentHeight < deviceHeight) {
            !dateMenu.hasClass('sticky') && dateMenu.addClass('sticky');
        } else {
            $(window).on('scroll', function(e){

                if ($(this).scrollTop() > scrollHeight) {
                    !dateMenu.hasClass('sticky') && dateMenu.addClass('sticky');
                } else {
                    dateMenu.hasClass('sticky') && dateMenu.removeClass('sticky');
                }
            });
        }
    }

    let scroll = new SmoothScroll('a[href*="#"]', {
        speed: 150,
        offset: 100
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


function makeTimer() {
    let endTime = new Date("7 October 2019 8:00:00 GMT+01:00");
    endTime = (Date.parse(endTime) / 1000);

    let now = new Date();
    now = (Date.parse(now) / 1000);

    let timeLeft = endTime - now;

    let days = Math.floor(timeLeft / 86400);
    let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
    let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    $("#days").html(days + "<span>Days</span>");
    $("#hours").html(hours + "<span>Hours</span>");
    $("#minutes").html(minutes + "<span>Minutes</span>");
    $("#seconds").html(seconds + "<span>Seconds</span>");
}

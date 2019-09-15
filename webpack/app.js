$(document).foundation();

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
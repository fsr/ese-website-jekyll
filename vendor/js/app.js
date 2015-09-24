// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).ready(function(){
    $(document).foundation();
    $('.slider').slick({
        lazyLoad: 'progressive',
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        // Disable navigation arrows
        arrows: false
    });
});

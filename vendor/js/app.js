// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).ready(function(){
    $(document).foundation();
    $('.slider').slick({
        dots: false,
        infinite: true,
        
        // Disable navigation arrows
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1
    });
});
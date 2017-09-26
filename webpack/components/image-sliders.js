import 'script-loader!slick-carousel';
import 'slick-carousel/slick/slick.scss';

$('.slider').not('.slick-initialized').slick({
        lazyLoad: 'progressive',
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        accessbility: true,
        arrows: false
});
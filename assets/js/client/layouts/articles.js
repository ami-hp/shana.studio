const Fun = require('../functions');

if(document.querySelectorAll('.swiper-article').length > 0){
    let swiperNavSpecial = new Swiper('.swiper-article', {
        slidesPerView: 'auto',
        loop: true,
        //freeMode: true,
        //freeModeMomentum: true,
        spaceBetween: 10,
        centeredSlides: true,

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 552px
            552: {
                loop:true,
                slidesPerView:2,
                spaceBetween:10,
                centeredSlides: false,
            },
            768: {
                slidesPerView:3,
                spaceBetween:30,
                centeredSlides: false,
            },
            1500: {
                slidesPerView:4,
                spaceBetween:15,
                centeredSlides: false,
            },
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        preloadImages: false,
        lazy: {
            loadPrevNextAmount : 0,
        },
    });
}

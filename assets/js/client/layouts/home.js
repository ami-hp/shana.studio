

// require('./login')

// Fun.cssMinHeight('#index-section-head' , 0);

if(document.querySelectorAll('.swiper-article').length > 0){
    const swiperNavSpecial = new Swiper('.swiper-article', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: true,
        freeModeMomentum: true,
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

if(document.querySelectorAll('.swiper-marquee-box').length > 0){

    const marquee_box = document.querySelector('.swiper-marquee-box');

    if(document.querySelectorAll('.swiper-marquee.top-col').length > 0){
        const swiperMarqueeTop =  new Swiper('.swiper-marquee.top-col', {
            slidesPerView: 2,
            loop: true,
            spaceBetween: 5,
            speed : 8000,
            centeredSlides: false,

            // allowTouchMove : false,
            // freeMode : true,
            freeModeMomentum : false,
            freeModeMomentumBounce : false,
            autoplay: {
                delay : 1,
            },
            // Responsive breakpoints
            breakpoints: {

                992: {
                    spaceBetween: 10,
                    slidesPerView:3,
                },
                1200: {
                    slidesPerView:4,
                    spaceBetween:15,
                },
            },

            preloadImages: false,
            lazy: {
                loadPrevNextAmount : 0,
            },
        });

        marquee_box.addEventListener('click' , function () {
            if(swiperMarqueeTop.autoplay.running)
                swiperMarqueeTop.autoplay.stop();
        });
    }

    if(document.querySelectorAll('.swiper-marquee.bot-col').length > 0){
        const swiperMarqueeBottom =  new Swiper('.swiper-marquee.bot-col', {
            slidesPerView: 2,
            loop: true,
            spaceBetween: 5,
            speed : 7000,
            // allowTouchMove : false,
            // freeMode : true,
            freeModeMomentum : false,
            freeModeMomentumBounce : false,
            autoplay: {
                delay : 1,
                reverseDirection : true,
            },
            // Responsive breakpoints
            breakpoints: {

                992: {
                    slidesPerView:3,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView:4,
                    spaceBetween:15,
                },
            },

            preloadImages: false,
            lazy: {
                loadPrevNextAmount : 0,
            },
        });

        marquee_box.addEventListener('click' , function () {
            if(swiperMarqueeBottom.autoplay.running)
                swiperMarqueeBottom.autoplay.stop();
        });
    }

}






// marquee_box.addEventListener('mouseleave' , function () {
//         if(!swiperMarqueeTop.autoplay.running)
//             swiperMarqueeTop.autoplay.start();
// });

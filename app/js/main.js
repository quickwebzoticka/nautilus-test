function update_all(limiter) {
    if (limiter === undefined){
        limiter = $(document)
    }
    update_carousel(limiter);
    tabs(limiter);
    allClics(limiter);
    sliders(limiter);
    inputMask(limiter);
    acc(limiter);
    scroll(limiter);
}
$(document).ready(function(){
    update_all();
    $('.first-slider-item__title span').addClass('active');
});
function update_carousel(limiter){
    if (limiter === undefined){
        limiter = $(document)
    }
    limiter.find('.tabs-flat').each(function() {
        if (this.dataset.carousel === undefined){
            this.setAttribute('data-carousel', Math.floor(Math.random() * 100000000));

            var slickTop = $(this).find('.tabs-flat-left__wrap').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                responsive: [
                    {
                      breakpoint: 768,
                      settings: {
                        fade:false
                      }
                    }
                ],
                asNavFor: '[data-carousel=' + this.dataset.carousel + '] .tabs-flat-right__wrap'
            });
            $(this).data('slickTop', slickTop);
            var slickBot = $(this).find('.tabs-flat-right__wrap').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                vertical: true,
                arrows:false,
                verticalSwiping:true,
                asNavFor: '[data-carousel=' + this.dataset.carousel + '] .tabs-flat-left__wrap',
                dots: false,
                focusOnSelect: true
            });
            $(this).data('slickBot', slickBot);
        } else {
            console.log($(this).data('slickTop'), $(this).data('slickBot'))
        }
    });
}

function tabs(limiter){
    if (limiter === undefined){
        limiter = $(document)
    }
    $(document).on('click', '[data-tab-link]:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active slideDownReturn').addClass('slideUp').eq($(this).index()).removeClass('slideUp').addClass('active slideDownReturn');
        let curElementContentBlock = $(this).closest('div.tabs').find('div.tabs__content').eq($(this).index());
            if (curElementContentBlock.find('.slick-slider').length > 0){
                console.log(curElementContentBlock.find('.slick-slider'));
                curElementContentBlock.find('.slick-slider').slick('setPosition');
            }
        return false;
    });
}

function allClics(limiter){
    if (limiter === undefined){
        limiter = $(document)
    }
    //Изменение логики на нажатие гамбургера в моб версии (1 кнопка для меню и для заказать звонок)
    let width = $(window).width();
    $(document).on('click', '.menu__burger .hamburger', function(e){
        if (width <= 768) {
            if ($('.hamburger').hasClass('is-active') && $('.callback').hasClass('active')) {
                e.preventDefault;
                $('.hamburger').removeClass('is-active');
                $('.callback').removeClass('active');
                $(document).find('.menu.active').removeClass('active').addClass('no-active');
                $(document).find('.menu__link span').hide();
                $(document).find('.menu-footer').hide();
                $(document).find('.wrapper-disable').remove();
                return false;
            };
        }
        let menu = $(this).parents('.menu');
        let formMain = $(document).find('.callback');
        formMain.find('.hamburger').removeClass('is-active');
        formMain.removeClass('fadeInRight');
        formMain.addClass('fadeOutRight');
        $(document).find('.wrapper-disable').remove();
        setTimeout(function(){
            formMain.removeClass('active');
        }, 300)
        $(this).toggleClass('is-active');
        if(menu.hasClass('active')){
            $(document).find('.wrapper-disable').remove();    
        } else {
            $(document).find('.main-content').prepend('<div class="wrapper-disable"></div>');
        }
        menu.toggleClass('no-active active');
        menu.find('.menu__link span').toggle('slide');
        menu.find('.menu-footer').toggle('slide');
    });
    $(document).on('click', '.menu__link', function(){
        let menu = $(this).parents('.menu');
        if(menu.hasClass('active')){
            $(document).find('.wrapper-disable').remove();
            menu.find('.hamburger').removeClass('is-active');
            menu.removeClass('active');
            menu.find('.menu__link span').toggle('slide');
            menu.find('.menu-footer').toggle('slide');
            menu.addClass('no-active');   
        }
    });
    $(document).on('click', '.header-block__but', function(){
        let formMain = $(document).find('.callback');

        $(document).find('.wrapper-disable').remove();
        $('.menu').find('.hamburger').removeClass('is-active');
        $('.menu').removeClass('active');
        $('.menu').find('.menu__link span').hide();
        $('.menu').find('.menu-footer').hide();
        $('.menu').addClass('no-active');
        $(document).find('.wrapper-disable').remove();

        if(formMain.hasClass('active')){
            formMain.find('.hamburger').removeClass('is-active');
            formMain.removeClass('fadeInRight');
            formMain.addClass('fadeOutRight');
            $(document).find('.wrapper-disable').remove();
            setTimeout(function(){
                formMain.removeClass('active');
            }, 300)
        } else {
            if (width <= 768) {
                $('.menu').find('.hamburger').addClass('is-active');
            } else {
                formMain.find('.hamburger').addClass('is-active');
            }
            formMain.removeClass('fadeOutRight');
            formMain.addClass('active fadeInRight');
            $(document).find('.main-content').prepend('<div class="wrapper-disable"></div>');
        }
        return false;
    });
    $(document).on('click','.form__close', function(){
        let formMain = $(this).parent();
        formMain.removeClass('fadeInRight');
        formMain.addClass('fadeOutRight');
        $(document).find('.wrapper-disable').remove();
        setTimeout(function(){
            formMain.removeClass('active');
        }, 300)
    })
    $(document).on('click', '.bws-top-arrow', function(){
        $(this).parents('.bws').toggleClass('no-active');
        return false;
    });
   $(document).on('click','.tabs-flat .first-slider-arrows__prev', function(){
        let a = $(this).siblings('.tabs-flat-right__wrap');
        a.slick('slickPrev');
        return false;
    });
   $(document).on('click', '.wrapper-disable', function(){
        $('.menu').find('.hamburger').removeClass('is-active');
        $('.menu').removeClass('active');
        $('.menu').find('.menu__link span').hide();
        $('.menu').find('.menu-footer').hide();
        $('.menu').addClass('no-active');
        $('.callback').removeClass('fadeInRight');
        $('.callback').addClass('fadeOutRight');
        setTimeout(function(){
            $('.callback').removeClass('active');
        }, 300)
        $(document).find('.wrapper-disable').remove();
   })
}

function sliders(limiter){
    if (limiter === undefined){
        limiter = $(document)
    }
    let firstSlider = limiter.find('.first-slider').slick({
        dots:true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    firstSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.first-slider-item__title span').removeClass('active');
        $(document).find('[data-slick-index='+nextSlide+'] .first-slider-item__title span').addClass('active');
      });
    limiter.on('click','.first-slider-wrap .first-slider-arrows__prev', function(){
        firstSlider.slick('slickPrev');
        return false;
    });
    limiter.on('click','.first-slider-wrap .first-slider-arrows__next', function(){
        firstSlider.slick('slickNext');
        return false;
    });
    let fullScreenSlider = limiter.find('.fullscreen-slider__main');
    fullScreenSlider.each(function(index, item){
        $(item).slick({
            dots:true
        })
    });
    $(document).on('click', '.fullscreen-slider .first-slider-arrows__prev', function(){
        $(this).parents('.fullscreen-slider').find('.fullscreen-slider__main').slick('slickPrev');
        return false;
    });
    $(document).on('click', '.fullscreen-slider .first-slider-arrows__next', function(){
        $(this).parents('.fullscreen-slider').find('.fullscreen-slider__main').slick('slickNext');
        return false;
    });
    let preFooterSlider = limiter.find('.pre-footer-slider__wrap').slick({
        arrows:false
    });
    $(document).on('click', '.pre-footer-slider__controls .first-slider-arrows__prev', function(){
        preFooterSlider.slick('slickPrev');
        return false;
    });
    $(document).on('click', '.pre-footer-slider__controls .first-slider-arrows__next', function(){
       preFooterSlider.slick('slickNext');
       return false;
    });
    
    let veticalSliderOnTabs  = limiter.find('.tabs-ip-list__wrap');
    veticalSliderOnTabs.each(function(index, item){
        $(item).slick({
            vertical:true,
            arrows:false,
            infinite: true,
            slidesToShow: 3,
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    vertical:false
                  }
                }
              ]
        })
    });
    $(document).on('click', '.tabs-ip-list .first-slider-arrows__next', function(){
        $(this).parents('.tabs-ip-list').find('.tabs-ip-list__wrap').slick('slickNext');
        return false;
     });
    let hodLine = $(document).find('.hod-top-line__inn'),
    colSlidesHod = $(document).find('.hod-slider-item').length,
    hodLineWidthItem = 100/colSlidesHod,
    tecHodLineWidth = hodLineWidthItem,
    hodSlider = limiter.find('.hod-slider__wrap').slick({
        arrows:false,
        slidesToShow: 3,
        responsive: [
            {
              breakpoint: 1224,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
              }
            }
          ]

    });

    hodLine.css('width',tecHodLineWidth+'%');
    hodSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if(currentSlide < nextSlide){
            if(nextSlide == (colSlidesHod - 1)){
                tecHodLineWidth = 100;
            } else {
                tecHodLineWidth += hodLineWidthItem;
            }
            hodLine.css('width',tecHodLineWidth+'%');
        } else if (currentSlide > nextSlide){
            if(nextSlide == 0){
                tecHodLineWidth = hodLineWidthItem;
            } else {
                tecHodLineWidth -= hodLineWidthItem;
            }
            hodLine.css('width',tecHodLineWidth+'%');
        }
    });
    $(document).on('click', '.hod-slider-prev', function(){
        hodSlider.slick('slickPrev');
        return false;
    });
    $(document).on('click', '.hod-slider-next', function(){
        hodSlider.slick('slickNext');
        return false;
    });
    


    $.fancybox.defaults.afterShow = function(){
        let hotTooltipSliderItems =  $(document).find('.hod-tooltip-left-item');
        // $('.hod-tooltip-left__slider').slick('setPosition');
        let hodTooltipSlider = $(document).find('.hod-tooltip-left__slider').slick({
         arrows:false
        });
        $(document).find('.hod-tooltip-bot__all').html(hotTooltipSliderItems.length);
        hodTooltipSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
            $(document).find('.hod-tooltip-bot__this').html(currentSlide + 1);
        });
        $(document).on('click', '.hod-tooltip-prev', function(){
            hodTooltipSlider.slick('slickPrev');
            return false;
        });
        $(document).on('click', '.hod-tooltip-next', function(){
            hodTooltipSlider.slick('slickNext');
            return false;
        });
    };
}
function inputMask(limiter){
    if (limiter === undefined){
        limiter = $(document)
    } 
    limiter.find('.form__input--phone').inputmask('+7 (999) 999 9999')
}
function acc(limiter){
    if (limiter === undefined){
        limiter = $(document)
    } 
    $(document).on('click', '.acc-item__top', function(){
        $(this).parents('.acc-item').siblings().each(function(index,item){
            $(item).find('.acc-item-bot').slideUp();
            $(item).find('.acc-item__top').removeClass('active');
        })
        $(this).parents('.acc-item').find('.acc-item-bot').slideToggle();
        $(this).toggleClass('active');
    });
}

function accArrow(limiter) {

}

function scroll(limiter){
    if (limiter === undefined){
        limiter = $(document)
    }
    $(document).on("click",'.menu__link, .first-slider-bot', function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top - 100;
        $('body,html').animate({scrollTop: top}, 1000);
    });
    $(document).on("click",'.go-top', function (event) {
        event.preventDefault();
        $('body,html').animate({scrollTop: 0}, 1000);
    }); 
}

$(window).scroll(function(event) {
    var a = window.pageYOffset;
    if (a > 1000) {
        $('.go-top').addClass('visible');
    } else {
        $('.go-top').removeClass('visible');
    }
});

function menuButtonMob() {
    $(document).on('click', '.header-block__but', function(e) {
        let width = $(window).width();
        if (width <= 768) {
            $('.hamburger').addClass('is-active');
        }
    })
}

menuButtonMob();

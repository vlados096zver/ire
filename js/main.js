$(document).ready(function () {

var lang = window.location.href;

$('.popup__cat').on('click', function() {
    $(this).toggleClass('popup__cat--active');
    $(this).next().slideToggle(300);
});

$('.shop__filter').on('click', function() {
    $('.popup--filter').addClass('popup--active');
});

$(window).resize(function () {
    if ($(document).width() > 840) {
        $('.popup--filter').removeClass('popup--active');
    }
})

$('.btn--continue').on('click', function() {
    $('.cart__holder').removeClass('cart__holder--active');
})

$('.main-header__link--add').on('click', function(e) {
    e.preventDefault();
    var width = $(document).width();  

    if (width > 840) {
        $(this).next().toggleClass('submenu--active');
    } else {
        $(this).toggleClass('main-header__link--toggle');
        $(this).next().slideToggle();
    }
    
})

$('#popup-cart').on('click', function (e) {
    e.stopPropagation();
    $('.cart__holder').toggleClass('cart__holder--active');
})

$('.single__line').on('click', function (e) {
    $('.popup--size').addClass('popup--active');
});

(function() {
    var hash = window.location.hash;

    if(hash) {
        var el = $(hash);
        if(el.length > 0) {
            var position = el.offset().top;
            var height = $('.main-header').height();
            var offset = position + height;
            $('html, body').animate({scrollTop: offset}, 10);
        }
    }
})();

// function TabsCorrect() {
//     $('.info__wrap .basket__title').on('click', function () {
//         if ($(document).width() <= 840) {
//             $(this).next().slideToggle();
//             $(this).toggleClass('basket__title--active');
//         }
//     })
// }
// TabsCorrect();
// $(window).resize(function () {
//     if ($(document).width() > 840) {
//         $('.info__block').attr('style', '');
//     }
// })

$('.basket__box').on('click', function (e) {
    let current = $(this);
    let quantity = current.find('.select__placeholder').text();
    let single = current.find('.basket__current').val();
    let sum = current.find('.basket__sum span');
    let value;
    let sale = current.find('.basket__sale').val();
    let newSingle = Number(single) - (Number(single) * Number(sale)) / 100;

    if (current.find('.basket__sale').hasClass('basket__current--active')) {
        value = Number(quantity) * newSingle;
    } else {
        value = Number(quantity) * Number(single);
    }
    sum.text(value);

    updateTotalSumm();
    correctCount();
    changeLang();
});

$('.basket__sale').on('change', function() {
    $('.basket__box').each(function() {
        let current = $(this);
        let quantity = current.find('.select__placeholder').text();
        let single = current.find('.basket__current').val();
        let sum = current.find('.basket__sum span');
        let value;
        let sale = current.find('.basket__sale').val();
        let newSingle = Number(single) - (Number(single) * Number(sale)) / 100;

        if (current.find('.basket__sale').hasClass('basket__current--active')) {
            value = Number(quantity) * newSingle;
        } else {
            value = Number(quantity) * Number(single);
        }
        sum.text(value);
    });

    updateTotalSumm();
    correctCount();
    changeLang();
})

function updateTotalSumm() {
    var val = 0;

    let total = $('.basket__total span');
    if($('.basket__sum').length > 0) {
        $('.basket__sum span').each(function (i, e) {
            val += parseFloat($(e).text() || 0);
        });
    } else {
        val = parseInt( total.text() );
    }

    if($('#select__way').length > 0) {
        val += parseInt( $('#select__way').find('.select__item--active').data('price') );
    }

    total.text(val);
}

function correctCount() {
    let num = 0;
    let count = $('.basket__result');
    $('.basket .select__placeholder').each(function (i, e) {
        num += parseFloat($(e).text());
    })

    count.text(num);
}

function changeLang() {
    var arr_ua = ['товар', 'товари', 'товарів'];
    var arr_en = ['product', 'products', 'products'];

    if(lang.indexOf('/en/') !== -1) {
        curlang = arr_en;
    } else {
        curlang = arr_ua;
    }

    var count = $('.basket__result').text();
    var result = $('.basket__text');

    if (count == 1) {
        result.text(curlang[0]);
    } else if (count > 1 && count < 5) {
        result.text(curlang[1]);
    } else {
        result.text(curlang[2]);
    }
}
changeLang();

$('body').on('change', '[name="color"]', function() {
    var value = $(this).val();
    $('.single__tab').removeClass('single__tab--active');
    $('.color_' + value).addClass('single__tab--active');
    $('.single__user, .single__gallery').slick('refresh');
});

setTimeout(function() {$('.single__user').slick('refresh');}, 1000);

// let single__block = $('.single__user');
// single__block.each(function(index, item) {
//     $(this).slick({
//         asNavFor: '.single__gallery[data-slider="' + index + '"]',
//         infinite: false,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         draggable: true,
//         fade: false,
//         arrows: true,
//         prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"></button>',
//         nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"></button>',
//         adaptiveHeight: true,
//         dots: false,
//         appendDots: '.single__controls[data-slider="' + index + '"]',
//         customPaging: function (slider, i) {
//             return '0' + (i + 1);
//         },
//         dotsClass: 'single__controls-list',
//         init: function(slick) {
//             $('.single__user').slick('refresh');
//         },
//         responsive: [{
//             breakpoint: 961,
//             settings: {
//                 fade: true,
//                 dots: true,
//             }
//         }]
//     });
// });


// var width = $(document).width();
// let single_gallery = $('.single__gallery');
// single_gallery.each(function(index, item) {
//     $(this).slick({
//         asNavFor: '.single__user[data-slider="' + index + '"]',
//         focusOnSelect: true,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         draggable: true,
//         fade: false,
//         arrows: false,
//         dots: false,
//         appendDots: '.single__dots[data-slider="' + index + '"]',
//         customPaging: function (slider, i) {
//             return '0' + (i + 1);
//         },
//         dotsClass: 'single__dots-list',
//         responsive: [{
//             breakpoint: 961,
//             settings: {
//                 fade: true,
//             }
//         }]
//     });
// });

let single__block = $('.single__gal--big');
single__block.each(function(index, item) {
    $(this).slick({
        asNavFor: '.single__small--gal[data-slider="' + index + '"]',
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        fade: false,
        arrows: true,
        prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"></button>',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"></button>',
        adaptiveHeight: true,
        dots: false,
        appendDots: '.single__controls[data-slider="' + index + '"]',
        customPaging: function (slider, i) {
            return '0' + (i + 1);
        },
        dotsClass: 'single__controls-list',
        init: function(slick) {
            $('.single__gal--big').slick('refresh');
        },
        responsive: [{
            breakpoint: 961,
            settings: {
                fade: true,
                dots: true,
            }
        }]
    });
});


var width = $(document).width();
let single_gallery = $('.single__small--gal');
single_gallery.each(function(index, item) {
    $(this).slick({
        asNavFor: '.single__gal--big[data-slider="' + index + '"]',
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        fade: false,
        arrows: false,
        dots: false,
        vertical: true,
        appendDots: '.single__dots[data-slider="' + index + '"]',
        customPaging: function (slider, i) {
            return '0' + (i + 1);
        },
        dotsClass: 'single__dots-list',
        // responsive: [{
        //     breakpoint: 961,
        //     settings: {
        //         fade: true,
        //     }
        // }]
    });
});

// let single__block = $('.single__user');
// let dotsBlock = $('.single__block').find('.single__controls');
// single__block.slick({
//     asNavFor: '.single__gallery',
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     draggable: true,
//     fade: false,
//     arrows: false,
//     dots: false,
//     appendDots: dotsBlock,
//     customPaging: function (slider, i) {
//         return '0' + (i + 1);
//     },
//     dotsClass: 'single__controls-list',
//     responsive: [{
//         breakpoint: 961,
//         settings: {
//             fade: true,
//             dots: true,
//             //asNavFor: '',
//         }
//     }]
// });

// var width = $(document).width();
// let single_gallery = $('.single__gallery');
// let dotsGallery = $('.single__slider').find('.single__dots');
// single_gallery.slick({
//     asNavFor: '.single__user',
//     focusOnSelect: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     draggable: true,
//     fade: false,
//     arrows: false,
//     dots: true,
//     appendDots: dotsGallery,
//     customPaging: function (slider, i) {
//         return '0' + (i + 1);
//     },
//     dotsClass: 'single__dots-list',
//     responsive: [{
//         breakpoint: 961,
//         settings: {
//             fade: true,
//             //asNavFor: '',
//         }
//     }]
// });


$(window).on("load resize", function () {
    var width = $(document).width();
    var photo_gallery = $('.photo__wrap');
    var select = $('#select__filter .select__placeholder');
   

    if (width > 780) {
        select.text(select.data('desc'));   
        $('.photo__wrap.slick-initialized').slick('unslick');
        $('.photo__loader').removeClass('photo__loader');   
    } else {
        select.text(select.data('mobile'));
        photo_gallery.on('init', function(slick) {
            $('.photo__loader').removeClass('photo__loader');
        });
        photo_gallery.not('.slick-initialized').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            fade: false,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            // responsive: [
            //     {
            //         breakpoint: 780,
            //         settings: {
            //             slidesToShow: 1,
            //             slidesToScroll: 1,
            //         }
            //     }
            // ]
        });

        
    
    }

});

$('.faq__subtitle').on('click', function () {
    $(this).toggleClass('faq__subtitle--active');
    $(this).next().slideToggle(300);
})

var sliders = [];
var wrapper = $('.shop__item');
wrapper.each(function (index, element) {
    let __this = $(this);
    let gallery = __this.find('.shop__slider');
    let arrowsShop = __this.find('.shop__wrap-btn');
    let dots = __this.find('.shop__dots');
    sliders.push(gallery);
    gallery.slick({
        infinite: false,
        // speed: 600,
        slidesToShow: 1,

        // autoplay: true,
        //autoplaySpeed:5000,
        draggable: true,
        fade: false,
        arrows: true,
        appendArrows: arrowsShop,
        prevArrow: '<button class="shop__btn shop__btn--dir_left"></button>',
        nextArrow: '<button class="shop__btn shop__btn--dir_right"></button>',
        dots: false,
        appendDots: dots,
        customPaging: function (slider, i) {
            return '0' + (i + 1);
        },
        dotsClass: 'shop__dots-list',

        responsive: [{
            breakpoint: 841,
            settings: {
                dots: true,
                arrows: false,
                fade: true
            }
        }]
    });
});

// $('.shop .shop__view').on('click', function () {
//     $('.shop__control .shop__view').toggleClass('shop__view--active');
//     $('.shop').toggleClass('shop--inner');
//     $('.shop__slider').slick('setPosition');
// })

function changeFormat(btn, btn_active, btn_check, col, wrap, inner) {
    $(btn).on('click', function () {
        let elems = $(btn);
        elems.each(function (index, item) {
            $(item).removeClass(btn_active);
        });
        $(this).addClass(btn_active);
        if ($(col).hasClass(btn_check)) {
            $(wrap).addClass(inner);
        } else {
            $(wrap).removeClass(inner);
        }

        $('.shop__slider').slick('setPosition');
    })


}

changeFormat('.shop .shop__view', 'shop__view--active', 'shop__view--active', '.shop__view--col', '.shop', 'shop--inner');
changeFormat('.breadcrumbs .shop__view', 'shop__view--active', 'shop__view--active', '.shop__view--col', '.collection', 'collection--inner');

let block = $('.block');

$('.btn--agree').on('click', function () {
    block.hide();
    let UTCDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString();
    let name = 'cookie';
    let value = true;
    document.cookie = `${name}=${value}; path=/; expires=${UTCDate};`;
});

$('.select__currency').on('change', function() {
    let currency = $(this).find('.select__item--active').text();
    let UTCDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString();
    document.cookie = `currency=${currency}; path=/; expires=${UTCDate}`;

    $('.single__price, .shop__price, .custom-range, .custom-range__inner').toggle(0);
    window.location.reload();
})

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var currency = getCookie('currency');
if(!currency) {
    let UTCDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString();
    document.cookie = `currency=uah; path=/; expires=${UTCDate};`;
}


$('.mobile-wrap').on('click', function () {
    $('.popup--menu').addClass('popup--active');
});

$('.popup .main-nav__toggle').on('click', function () {
    $(this).parents('.popup').removeClass('popup--active');
});

// $('.language-chooser li').on('click', function (e) {
//     e.stopPropagation();
//     $('.language-chooser li').show();
// });

$('.language-chooser li.active').on('click', function (e) {
    e.preventDefault();
    $('.language-chooser li:not(.active)').toggle();
})

// $(document).on('click', function (e) {
//     $('.language-chooser li:not(.active)').hide();
//     if ($(e.target).closest('.cart__holder--active').length) {
//         return;
//     }
//     $('.cart__holder').removeClass('cart__holder--active')
// });

// favorites
$('body').on('click', '.js_add_favorites', function(e) {
    e.preventDefault();
    
    var self = $(this);
    var id = $(this).data('id');
    var title = $(this).data('title');

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'add_favorites',
            id: id,
        },
    }).done(function(data) {
        var obj = JSON.parse(data);
        if(lang.indexOf('/en/') !== -1) {
            var text = 'Product ' + title + ' added to favorites';
        } else {
            var text = 'Товар ' + title + ' доданий в обране';
        }

        self.removeClass('shop__add--active');
        self.next().addClass('shop__add--active');
                
        if(obj.favorites_quantity > 0) {
            $('.main-header__box--favorites use').attr('href', '#favorites-active');
        }
        
        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
            $('.msg-modal').removeClass('msg-modal-active');
        }, 2500); 
    });
});

$('body').on('click', '.js_delete_favorites', function(e) {
    e.preventDefault();

    var self = $(this);
    var id = $(this).data('id');
    var title = $(this).data('title');       

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'delete_favorites',
            id: id,
        },
    }).done(function(data) {
        var obj = JSON.parse(data);
        if(lang.indexOf('/en/') !== -1) {
            var text = 'Product ' + title + ' removed from favorites';
        } else {
            var text = 'Товар ' + title + ' видалено з обраних';
        }

        self.removeClass('shop__add--active');
        self.prev().addClass('shop__add--active');
                
        if(obj.favorites_quantity == 0) {
            $('.main-header__box--favorites use').attr('href', '#favorites-no');
        }

        if( $('.favorites').length > 0) {
            self.parents('.shop__item').slideUp(function() {
                $(this).detach();
            })
        }
        
        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
            $('.msg-modal').removeClass('msg-modal-active');
        }, 2500); 
    });

});

$('[name="size"]').on('change', function() {
    $('.error__size').hide();
});

$('[name="color"]').on('change', function() {
    $('.error__color').hide();
});

// basket
$('body').on('click', '.js_add_basket', function(e) {
    e.preventDefault();
    
    var self = $(this);
    var id = $(this).data('id');
    var title = $(this).data('title');
    var size = '';
    var color = '';

    var flag = true;
    if( $('.single').length > 0 ) {
        var size = $('[name="size"]:checked').val();
        var color = $('[name="color"]:checked').val();

        if(!size) {
            flag = false;
            $('.error__size').show();
        }

        if(!color) {
            flag = false;
            $('.error__color').show();
        }
    }

    if(flag) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'add_basket',
                id: id,
                quantity: 1,
                size: size,
                color: color,
            },
        }).done(function(data) {
            var obj = JSON.parse(data);
            if(lang.indexOf('/en/') !== -1) {
                var text = 'Product ' + title + ' added to cart';
            } else {
                var text = 'Товар ' + title + ' доданий в кошик';
            }

            $('[name="size"]:checked').prop('checked', false);
            if($('[name="color"]').length > 1) {
                $('[name="color"]:checked').prop('checked', false);
            }

            $('.main-header__count').text(obj.basket_quantity);

            // if( $('.single').length > 0 ) {
            //     self.hide();
            //     self.next().show();
            // }

            var html_prod = '';
            if( $('[data-id="' + obj.product.uniq + '"]').length > 0 ) {
                $('[data-id="' + obj.product.uniq + '"]').find('.cart__count').html(obj.product.quantity);
                $('[data-id="' + obj.product.uniq + '"]').find('.cart__price').html(obj.product.price);
            } else {
                html_prod += '<div class="cart__item" data-id="' + obj.product.uniq + '">';
                html_prod += '<a href="' + obj.product.link + '"  class="cart__image"><img src="' + obj.product.img + '" alt="' + obj.product.title + '"></a>';
                html_prod += '<div class="cart__content">';
                html_prod += '<p class="cart__title">' + obj.product.title + '</p>';
                html_prod += '<p class="cart__price">' + obj.product.price + '</p>';
                html_prod += '<p class="cart__size">' + obj.product.size + '</p>';
                html_prod += '<p class="cart__count">' + obj.product.quantity + '</p></div></div>';
                // html_prod += '<button class="cart__close cart__close--header js_delete_basket" data-id="' + obj.product.id + '" data-title="' + obj.product.title + '"></button></div></div>';
            }

            if($(window).width() > 780) {
                $('.cart__holder').addClass('cart__holder--active');
            }
            $('.cart__holder .cart__wrap').append(html_prod);
                                
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function() {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500); 
        });
    }
});

$('body').on('click', '.js_delete_basket', function(e) {
    e.preventDefault();

    var self = $(this);
    var id = $(this).data('id');
    var size = $(this).data('size');
    var color = $(this).data('color');
    var title = $(this).data('title');       

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'delete_basket',
            id: id,
            size: size,
            color: color,
        },
    }).done(function(data) {
        var obj = JSON.parse(data);
        if(lang.indexOf('/en/') !== -1) {
            var text = 'Product ' + title + ' removed from cart';
        } else {
            var text = 'Товар ' + title + ' видалено з кошику';
        }

        // if( $('.single').length > 0 ) {
        //     self.hide();
        //     self.prev().show();
        // }

        if(obj.basket_quantity > 0) {
            $('.main-header__count').text(obj.basket_quantity);
        }
		
		if(self.is('.basket__close')) {
		    self.parents('.basket__box').slideUp(function() {
			    $(this).detach();
                updateTotalSumm();
                correctCount();
                changeLang();
		    });
		}

        if(self.is('.cart__close--basket')) {
		    self.parents('.cart__item').slideUp(function() {
			    $(this).detach();
                updateTotalSumm();
                correctCount();
                changeLang();
		    });            
		}

        if(self.is('.cart__close--header')) {
		    self.parents('.cart__item').slideUp(function() {
			    $(this).detach();
		    });

            $('.btn--basket.js_add_basket').show();
            $('.btn--basket.js_delete_basket').hide();
		}

        $('.cart__close--header[data-id="' + id + '"]').parents('.cart__item').slideUp(function() {
            $(this).detach();
        });
        
        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
            $('.msg-modal').removeClass('msg-modal-active');
        }, 2500); 
    });
    return false;
});

// change
$('body').on('change', '.select__basket--item', function() {
    var self = $(this);
    var id = self.data('id');
    var size = self.data('size');
    var color = self.data('color');
    var quantity = self.find('.select__item--active').text();

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'change_basket',
            id: id,
            size: size,
            color: color,
            quantity: quantity
        },
    });
});

// $('body').on('change', '[name="size"]', function() {
//     var self = $(this);
//     var id = self.data('id');
//     var size = $(this).val();

//     $.ajax({
//         url: myajax.url,
//         type: 'POST',
//         data: {
//             action: 'change_basket',
//             id: id,
//             size: size
//         },
//     });
// });

// $('body').on('change', '[name="color"]', function() {
//     var self = $(this);
//     var id = self.data('id');
//     var color = $(this).val();

//     $.ajax({
//         url: myajax.url,
//         type: 'POST',
//         data: {
//             action: 'change_basket',
//             id: id,
//             color: color
//         },
//     });
// });

function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function () {
        var value = $(this).val();
        var that = $(this);

        regExp = regExp == '' ? /./ : regExp;

        if (phone === true) {
            bool_reg = !regExp.test(value);
        } else {
            bool_reg = regExp.test(value);
        }

        if (value.length > length && value !== '' && bool_reg) {
            that.removeClass('form-fail').addClass('form-done');
            $(error).slideUp();
        } else {
            that.removeClass('form-done').addClass('form-fail');
            $(error).slideDown();
        }
    });

}

// деакцивация кнопки если есть поле с ошибкой

function disBtn(input, btn, bool) {
    var input = $(input);
    input.on('blur keyup', function () {

        if (input.hasClass('form-fail') || bool == true) {
            // $(btn).attr('disabled', 'disabled');
        } else {
            // $(btn).removeAttr('disabled');
        }

    });

}

// для проверки при нажатии

function valClick(input, length, regExp, error, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
        bool_reg = regExp.test(value);
    } else {
        bool_reg = !regExp.test(value);
    }

    if (value.length < length || value === '' || bool_reg) {
        $(input).addClass('form-fail');
        $(error).slideDown();
    }
}

//  деакцивация кнопки при нажатии

function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
        // $(btn).attr('disabled', 'disabled');
        return false;
    } else {
        return true;
    }
}

function changeSelect(select, error) {
    $(select).on('change', function() {
        $(error).slideUp();
    });
}

function checkValue(value, error) {
    if(!value) {
        $(error).slideDown();
    }
}

var input = document.querySelector("#i_phone");
window.intlTelInput(input, {
    preferredCountries: ['ua'],
    initialCountry: "auto",
    geoIpLookup: function(success, failure) {
        $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
        });
    },
    utilsScript: utilsPhone
});

var regName = /^[a-zA-Zа-яА-ЯёЁІі]+/;
var regPhone = /[_]/i;
var regEmail = /.+@.+\..+/i;
var regNumber = /^\+?\d{7,}$/;

changeSelect('#select__country', '.error_country');
changeSelect('#select__way', '.error_delivery');
changeSelect('#select__type', '.error_type');
changeSelect('#select__pay', '.error_pay');

$('#select__way, #select__type').on('change', function() {
    $('.error_city, .error_department, .error_address').slideUp();
});
$('#select__way').on('change', function() {
    updateTotalSumm();
});


$('.btn--order').on('click', function() {
    var name = $('#i_name').val();
    var surname = $('#i_surname').val();
    var phone = $('#i_phone').val();
    var email = $('#i_email').val();

    var country = $('#select__country').find('.select__item--active').data('value');
    var delivery = $('#select__way').find('.select__item--active').data('value');
    var city, address, departament = '';
    var flag = true;

    if(delivery == 'dhl') {
        var address = $('#i_address').val();
        if(!address) {
            flag = false;
        }
        checkValue(address, '.error_address');
    } else if(delivery == 'new') {
        var type = $('#select__type').find('.select__item--active').data('value');
        if(!type) {
            flag = false;
        }
        checkValue(type, '.error_type');
        if(type == 'branch') {
            var city = $('#i_city').val();
            var departament = $('#select__department').find('.select__item--active').data('value');
            if(!city) {
                flag = false;
            }
            if(!departament) {
                flag = false;
            }
            checkValue(city, '.error_city');
            checkValue(departament, '.error_department');
        } else if(type == 'courier') {
            var address = $('#i_address').val();
            if(!address) {
                flag = false;
            }
            checkValue(address, '.error_address');
        }        
    }
    var pay = $('#select__pay').find('.select__item--active').data('value');

    validate('#i_name', 1, regName, '.error_name');
    validate('#i_surname', 1, regName, '.error_surname');
    validate('#i_email', 1, regEmail, '.error_email');
    validate('#i_phone', 1, regNumber, '.error_phone');
    // disBtn('#i_name, #i_surname, #i_email, #i_phone', '.btn--order');

    valClick('#i_name', 1, regName, '.error_name');
    valClick('#i_surname', 1, regName, '.error_surname');
    valClick('#i_email', 1, regEmail, '.error_email');
    valClick('#i_phone', 1, regNumber, '.error_phone');
    var btn_bool = disBtnClick('#i_name, #i_surname, #i_email, #i_phone', '.btn--order');

    checkValue(country, '.error_country');
    checkValue(delivery, '.error_delivery');
    checkValue(pay, '.error_pay');

    if( btn_bool && country && delivery && pay && flag ) {
        $('.basket__error--all').slideUp();
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'add_order',
                name: name,
                surname: surname,
                phone: phone,
                email: email,
                country: country,
                delivery: delivery,
                city: city,
                address: address,
                departament: departament,
                pay: pay,
            },
        }).done(function(data) {
            var obj = JSON.parse(data);

            if(obj.status == 'done') {
                if(pay == 'online') {
                    $('#wayforpay').html(obj.form);
                    $('#wayforpay').find('button').trigger('click');
                } else {
                    window.location.href = obj.url;
                }
            } else if(obj.status == 'fail') {
                if(lang.indexOf('/en/') !== -1) {
                    var text = 'Error while placing an order. Repeat the order again.';
                } else {
                    var text = 'Помилка при оформленні замовлення. Повторіть замовлення ще раз.';
                }
                $('.msg-modal').html(text).addClass('msg-modal-active');
                setTimeout(function() {
                    $('.msg-modal').removeClass('msg-modal-active');
                }, 2500);
            }
            
        });
    } else {
        $('.basket__error--all').slideDown();
    }

    return false;
});

var select_obj = {};

(function () {

    $('.select__wrap').each(function () {
        var id = $(this).attr('id');
        var placeholder = $(this).find('.select__placeholder').html();
        if(placeholder == '') {
            checkActive(this);
            placeholder = $(this).find('.select__placeholder').html();
        }
        select_obj[id] = placeholder;
    });

    $('.select__wrap').on('click', '.select__placeholder', function (e) {
        if ($(e.target).is('.select__disabled')) {
            return false;
        } 
        var id = $(this).parent().attr('id');
        $('.select__wrap:not(#' + id + ') .select__list').removeClass('select__list--active');
        $('.select__wrap:not(#' + id + '), .select__wrap:not(#' + id + ') .select__placeholder').removeClass('changed');
        $(this).next().toggleClass('select__list--active');
        $(this).toggleClass('changed');
        $(this).parent().toggleClass('changed');
    });

    $('.select__wrap').on('click', '.select__item', function (e) {
        if ($(e.target).is('.select__item--disabled')) {
            return false;
        } else {
            if ($(e.target).is('.select__input')) return false;
            var container = $(this).parents('.select__wrap').attr('id');
            if ($('#' + container + ' .select__item--active').length == 1) {
                if (!$(this).hasClass('select__item--active')) {
                    $('#' + container + ' .select__item').removeClass('select__item--active');
                    $(this).addClass('select__item--active');
                    setPlaceholder(this);
                }
            } else {
                setPlaceholder(this);
                $(this).toggleClass('select__item--active');
            }
            $(this).parent().removeClass('select__list--active');
            $(this).parents('.select__wrap').removeClass('changed').find('.select__placeholder').removeClass('changed');
            $(this).parents('.select__wrap').trigger('change');
        }
    });

    $('body').on('input', '.select__input', function (e) {
        $(e.target).parent().siblings('li').each((i, el) => {
            $(el).css("display", $(el).data("value").toLowerCase().indexOf(e.target.value.toLowerCase()) != -1 ? "block" : "none");
        });
    })

    $('body').on('click', function (e) {
        if (!$(e.target).is('.changed, .select__list, .select__item')) {
            $('.select__list').removeClass('select__list--active');
            $('.select__list').parents('.select__wrap').removeClass('changed');
        }

        if ($(e.target).is('.popup__close, .popup--size')) {
            $('.popup--size').removeClass('popup--active');
        }

        if (!$(e.target).tagName == 'SPAN') {
            $('.language-chooser li:not(.active)').hide();
        }
    });

    function setPlaceholder(self) {
        var value = $(self).data('value');
        var value_pl = $(self).html();
        $(self).parents('.select__wrap').find('.select__placeholder').html(value_pl);
    }

    function checkActive(self) {
        var text = $(self).find('.select__item--active').text();
        if (text === undefined || text === '') {
            text = $(self).find('.select__item:not(.select__item--disabled):eq(0)').addClass('select__item--active').text();
        }
        $(self).find('.select__placeholder').html(text);
    }

})();

function toggleSelect(id, value) {
    $(id).find('.select__item').removeClass('select__item--active');
    $(id).find('.select__item[data-value="' + value + '"]').addClass('select__item--active');
    $(id).find('.select__placeholder').html(value);
}

function getSelValue(id) {
    return $(id).find('.select__item--active').data('value');
}


function InitCustomRange(param = {}) {
    let $ranges = document.querySelectorAll(typeof param.selector != "undefined" ? param.selector : ".custom-range");
    let customRanges = [];
    let dragging = false;
    let activRange = null;
    let startX, startLayerX;
    let rangeOfValues;
    let formating = typeof param.formating != "undefined" ? param.formating : true;

    // init

    $ranges.forEach(function ($range) {
        let selector = `[data-id-custom-range="${$range.dataset.idCustomRange}"]`;
        let $min = document.querySelector(`.custom-range__min${selector}`);
        let $max = document.querySelector(`.custom-range__max${selector}`);
        let $maxVal = document.querySelector(`.custom-range__max-value${selector}`);
        let $minVal = document.querySelector(`.custom-range__min-value${selector}`);
        let data = {
            $range,
            $min,
            $max,
            $maxVal,
            $minVal,
            min: parseInt($minVal.dataset.min || getValueToNode($min)),
            max: parseInt($maxVal.dataset.max || getValueToNode($max)),
            persentMin: 0,
            persentMax: 100,
        }

        if ($min) setValueToNode($min, data.min);
        if ($max) setValueToNode($max, data.max);

        data.rangeOfValues = data.max - data.min;

        initValue.call(data, $minVal);
        initValue.call(data, $maxVal);
        updateRange.call(data);

        let style = getComputedStyle($range);
        data.paddingLeft = parseInt(style.getPropertyValue('padding-left'));
        data.paddingRight = parseInt(style.getPropertyValue('padding-right'));

        customRanges.push(data);

        // events

        let onMouseDown_ = onMouseDown.bind(data);
        let onKeyDown_ = onKeyDown.bind(data);
        let onInput_ = debounceTwo(onInput.bind(data), 1000);
        let input_ = function (event) {
            if (event.inputType == "insertReplacementText" || event.inputType == undefined) {
                onInput_.forcedСall.apply(this, arguments);
            } else {
                onInput_.debounce.apply(this, arguments);
            }
        }
        let inputRange_ = function (text) {
            if (text) setValueToNode(this, text);

            let event = document.createEvent('Event');
            event.initEvent('inputrange', true, true);

            this.dispatchEvent(event);
        }

        addListenerMulti([$range], "mousedown touchstart", onMouseDown_, {
            passive: false
        });
        addListenerMulti([$range], "keydown", onKeyDown_);

        if ($minVal.tagName == "INPUT") addListenerMulti([$minVal], "input", input_);
        if ($maxVal.tagName == "INPUT") addListenerMulti([$maxVal], "input", input_);

        // возможность установить или обновить значение слайдера
        addListenerMulti([$minVal, $maxVal], "inputrange", input_);
        $minVal.inputRange = inputRange_;
        $maxVal.inputRange = inputRange_;

        // возможность удалить обрабочики

        data.unInstall = function () {
            removeListenerMulti([$range], "mousedown touchstart", onMouseDown_, {
                passive: false
            });
            removeListenerMulti([$range], "keydown", onKeyDown_);
            removeListenerMulti([$minVal, $maxVal], "input", input_);
            removeListenerMulti([$minVal, $maxVal], "inputrange", input_);
            delete $minVal.inputRange;
            delete $maxVal.inputRange;
        }
    })

    return customRanges;


    /* 
        Обработчик события зажатия мыши на слайдере (mousedown, touchstart) 
        this: объект слайдера
    */

    function onMouseDown(event) {
        event.preventDefault();
        event.target.focus();

        addMouseListeners();
        dragging = true;
        activRange = this;
        startX = getPropsEvent(event, "pageX");

        let box = this.$range.getBoundingClientRect();
        startLayerX = startX - box.left + pageXOffset;

        let realX = startLayerX - this.paddingLeft;
        let realWidth = this.$range.clientWidth - this.paddingLeft - this.paddingRight;
        let persent = minMax((realX / realWidth) * 100, 0, 100);
        let m1 = Math.abs(this.persentMin - persent);
        let m2 = Math.abs(this.persentMax - persent);

        if (m1 < m2 || m1 == m2 && this.persentMin > persent) {
            this.control = "min";
            this.persentMin = persent;
        } else {
            this.control = "max";
            this.persentMax = persent;
        }

        updateRange.call(this);
    }


    /* 
        Обработчик события перемещения курсора по document (mousemove, touchmove) 
    */

    function onMouseMove(event) {
        if (!dragging) return;

        event.preventDefault();

        let realX = (startLayerX + getPropsEvent(event, "pageX") - startX) - activRange.paddingLeft;
        let realWidth = activRange.$range.clientWidth - activRange.paddingLeft - activRange.paddingRight;
        let persent = minMax((realX / realWidth) * 100, 0, 100);

        switch (activRange.control) {
            case "min":
                activRange.persentMin = minMax(persent, 0, activRange.persentMax);
                break

            case "max":
                activRange.persentMax = minMax(persent, activRange.persentMin, 100);
                break
        }

        updateRange.call(activRange);
    }


    /* 
        Обработчик события (mouseup, touchend) на document 
    */

    function onMouseUp(event) {
        removeMouseListeners();
        dragging = false;
    }


    /* 
        Обработчик события input на элементах ввода 
        this: объект слайдера
    */

    function onInput(event) {
        initValue.call(this, event.target);
        updateRange.call(this);
    }


    /* 
        Обработчик события keydown на слайдере 
        this: объект слайдера
    */

    function onKeyDown(event) {
        let inc = 0;
        if (event.keyCode == '39') {
            inc = 1;
        } else if (event.keyCode == '37') {
            inc = -1;
        } else {
            return;
        }

        let node = activRange.control == "min" ? this.$minVal : this.$maxVal;
        setValueToNode(node, parseInt(getValueToNode(node)) + inc);

        initValue.call(this, node);
        updateRange.call(this);
    }


    /* 
        Достаёт из event (объект события mouse или touch) значение параметра name 
    */

    function getPropsEvent(event, name) {
        return event[name] ? event[name] : (event.touches !== undefined ? event.touches[0][name] : 0);
    }


    /* 
        Вписывает числовое значение value в диапазон между min and max 
    */

    function minMax(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }


    /* 
        Корректирует value [0 - 100] так, чтобы его значение соответствовало целому числу диапазона range 
    */

    function stepping(value, range) {
        return (Math.round((value / 100) * range) / range) * 100;
    }


    /* 
        Обновляет значение в input и css variables 
        this: объект слайдера
    */

    function updateRange() {
        this.persentMin = stepping(this.persentMin, this.rangeOfValues);
        this.persentMax = stepping(this.persentMax, this.rangeOfValues);

        let minVal = this.min + Math.round((this.persentMin / 100) * this.rangeOfValues);
        setValueToNode(this.$minVal, minMax(minVal, this.min, this.max));

        let maxVal = this.min + Math.round((this.persentMax / 100) * this.rangeOfValues);
        setValueToNode(this.$maxVal, minMax(maxVal, this.min, this.max));

        this.$range.style.setProperty('--persent-min', this.persentMin + "%");
        this.$range.style.setProperty('--persent-max', this.persentMax + "%");
    }


    /* 
        Извлекает данные из input и переводит в проценты 
        this: объект слайдера
        target: input node
    */

    function initValue(target) {
        switch (target) {
            case this.$minVal:
                this.persentMin = ((getValueToNode(this.$minVal) - this.min) / this.rangeOfValues) * 100;
                this.persentMin = minMax(this.persentMin, 0, this.persentMax);
                break;

            case this.$maxVal:
                this.persentMax = ((getValueToNode(this.$maxVal) - this.min) / this.rangeOfValues) * 100;
                this.persentMax = minMax(this.persentMax, this.persentMin, 100);
                break;
        }
    }


    /* 
        Получает значение узла
    */

    function getValueToNode(node) {
        return (node.tagName == "INPUT" ? node.value : node.textContent).replace(/\D/g, '');
    }


    /* 
        Устанавливает значение узлу
    */

    function setValueToNode(node, value) {
        if (formating && node.type != "number") value = value.toLocaleString();
        node.tagName == "INPUT" ? node.value = value : node.textContent = value;
    }


    /* 
        Установка обработчиков событий на document 
    */

    function addMouseListeners() {
        addListenerMulti([document], "mousemove touchmove", onMouseMove, {
            passive: false
        });
        addListenerMulti([document], "mouseup touchend", onMouseUp);
    }


    /* 
        Удаление обработчиков событий с document 
    */

    function removeMouseListeners() {
        removeListenerMulti([document], "mousemove touchmove", onMouseMove, {
            passive: false
        });
        removeListenerMulti([document], "mouseup touchend", onMouseUp);
    }


    /* 
        Создаёт объект с debounce функкцией для fn, 
        которую можно принудительно выполнить с помощью forcedСall
    */

    function debounceTwo(fn, timeout) {
        let timer;

        return {
            debounce: function () {
                let args = arguments,
                    ctx = this;

                clearTimeout(timer);

                timer = setTimeout(function () {
                    fn.apply(ctx, args);
                    timer = null;
                }, timeout);
            },

            forcedСall: function () {
                fn.apply(this, arguments);

                clearTimeout(timer);
            }
        }
    }


    /* 
        Добавление обработчика (fn) для нескольких событий (s), 
        указанных строкой через пробел на узел (node) 
    */

    function addListenerMulti(node, s, fn, options = false) {
        node.forEach(n => s.split(' ').forEach(e => n.addEventListener(e, fn, options)));
    }


    /* 
        Удаление обработчика (fn) для нескольких событий (s), 
        указанных строкой через пробел на узел (node) 
    */

    function removeListenerMulti(node, s, fn, options = false) {
        node.forEach(n => s.split(' ').forEach(e => n.removeEventListener(e, fn, options)));
    }
}

InitCustomRange();


});
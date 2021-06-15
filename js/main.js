$(document).ready(function() {

  $('#popup-cart').on('click', function(e) {
    e.stopPropagation();
    $('.cart__holder').addClass('cart__holder--active');
  })

  $('.single__line').on('click', function(e) {
    $('.popup--size').addClass('popup--active');
  })

  let single__block = $('.single__user');
  let dotsBlock = $('.single__block').find('.single__controls');
  single__block.slick({
    asNavFor: '.single__gallery',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    fade: false,
    arrows: false,
    dots: false,
    appendDots: dotsBlock,
    customPaging: function(slider, i) {
      return '0' + (i + 1);
    },
    dotsClass: 'single__controls-list',
    responsive: [{
      breakpoint: 961,
      settings: {
        fade: true,
        dots: true,
        //asNavFor: '',
      }
    }]
  });

  var width = $(document).width();
  let single_gallery = $('.single__gallery');
  let dotsGallery = $('.single__slider').find('.single__dots');
  single_gallery.slick({
    asNavFor: '.single__user',
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    fade: false,
    arrows: false,
    dots: true,
    appendDots: dotsGallery,
    customPaging: function(slider, i) {
      return '0' + (i + 1);
    },
    dotsClass: 'single__dots-list',
    responsive: [{
      breakpoint: 961,
      settings: {
        fade: true,
        //asNavFor: '',
      }
    }]
  });


  $(window).on("load resize", function() {
    var width = $(document).width();
    let photo_gallery = $('.photo__wrap');
    let select = $('.shop .select__placeholder');
    if (width > 780) {
      photo_gallery.not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: true,
        fade: false,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
      });
      select.text(select.data('desc'));

    } else {
      if (photo_gallery.hasClass('slick-initialized')) {
        photo_gallery.slick('unslick');
      }
      select.text(select.data('mobile'));
    }

  });

  $('.faq__subtitle').on('click', function() {
    $(this).toggleClass('faq__subtitle--active');
    $(this).next().slideToggle(300);
  })

  var sliders = [];
  var wrapper = $('.shop__item');
  wrapper.each(function(index, element) {
    let __this = $(this);
    let gallery = __this.find('.shop__slider');
    let arrowsShop = __this.find('.shop__wrap-btn');
    let dots = __this.find('.shop__dots');
    sliders.push(gallery);
    gallery.slick({
      infinite: true,
      // speed: 600,
      slidesToShow: 1,

      // autoplay: true,
      //autoplaySpeed:5000,
      draggable: true,
      fade: false,
      arrows: true,
      appendArrows: arrowsShop,
      prevArrow: '<button class="shop__btn shop__btn--dir_left"></div>',
      nextArrow: '<button class="shop__btn shop__btn--dir_right"></button>',
      dots: false,
      appendDots: dots,
      customPaging: function(slider, i) {
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

  function changeFormat(btn, btn_active, btn_check, col, wrap, inner) {
    $(btn).on('click', function() {
      let elems = $(btn);
      elems.each(function(index, item) {
        $(item).removeClass(btn_active);
      });
      $(this).addClass(btn_active);
      if ($(col).hasClass(btn_check)) {
        $(wrap).addClass(inner);
      } else {
        $(wrap).removeClass(inner);
      }

      for (i = 0; i < sliders.length; i++) {
        sliders[i].slick('setPosition');
      }
    })


  }


  changeFormat('.shop .shop__view', 'shop__view--active', 'shop__view--active', '.shop__view--col', '.shop', 'shop--inner');
  changeFormat('.breadcrumbs .shop__view', 'shop__view--active', 'shop__view--active', '.shop__view--col', '.collection', 'collection--inner');

  let block = $('.block');

  $('.btn--agree').on('click', function() {
    block.hide();
    let UTCDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString();
    let name = 'myCookie';
    let value = 'myCookieValue';
    document.cookie = `${name}=${value}; expires=${UTCDate}`;
  });

  $('.mobile-wrap').on('click', function() {
    $('.popup--menu').addClass('popup--active');
  });

  $('.popup .main-nav__toggle').on('click', function() {
    $('.popup--menu').removeClass('popup--active');
  });

  $('.language-chooser li').on('click', function(e) {
    e.stopPropagation();
    $('.language-chooser li').show();
  });

  $('.language-chooser li.active').on('click', function(e) {
    e.preventDefault();
  })

  $(document).on('click', function(e) {
    $('.language-chooser li:not(.active)').hide();
    if ($(e.target).closest('.cart__holder--active').length) {
      return;
    }
    $('.cart__holder').removeClass('cart__holder--active')
  });


  var select_obj = {};

  (function() {

    $('.select__wrap').each(function() {
      var id = $(this).attr('id');
      checkActive(this);
      var placeholder = $(this).find('.select__placeholder').html();
      select_obj[id] = placeholder;

    });

    $('.select__wrap').on('click', '.select__placeholder', function() {
      $('.select__list').removeClass('select__list--active');
      $('.select__placeholder').removeClass('changed');
      $(this).next().toggleClass('select__list--active');
      $(this).toggleClass('changed');

    });

    $('.select__wrap').on('click', '.select__item', function(e) {
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
        $(this).parents('.select__wrap').find('.select__placeholder').removeClass('changed');
      }
    });

    $('.select__input').on('input', function(e) {
      $(e.target).parent().siblings('li').each((i, el) => {
        $(el).css("display", $(el).data("value").toLowerCase().indexOf(e.target.value.toLowerCase()) != -1 ? "block" : "none");
      });
    })

    $('body').on('click', function(e) {
      if (!$(e.target).is('.changed, .select__list, .select__item')) {
        $('.select__list').removeClass('select__list--active');
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

    $ranges.forEach(function($range) {
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
      let input_ = function(event) {
        if (event.inputType == "insertReplacementText" || event.inputType == undefined) {
          onInput_.forcedСall.apply(this, arguments);
        } else {
          onInput_.debounce.apply(this, arguments);
        }
      }
      let inputRange_ = function(text) {
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

      data.unInstall = function() {
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
        debounce: function() {
          let args = arguments,
            ctx = this;

          clearTimeout(timer);

          timer = setTimeout(function() {
            fn.apply(ctx, args);
            timer = null;
          }, timeout);
        },

        forcedСall: function() {
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

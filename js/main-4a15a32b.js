/* eslint-env browser */
(function($, Siema, MoveTo) {
  'use strict';

  /**
   * Create dialog modal functionality
   *
   * config {Object} - provided config params
   */
  function initDialogModals(config) {
    // Default conffig
    var profileItemClass = config.profileItemClass || '.c-profiles__item';
    var profileClass = config.profileItemClass || '.c-profile';
    var closeBtnClass = config.closeBtnClass || '.c-profileModal__closeBtn';
    var animationDuration = config.animationDuration || 500;
    var mobileMediaQuery = config.tabletMediaQuery || '49rem';

    var profileItems = $(profileItemClass);

    // Attach click event handlers
    $(profileClass).each(function(index, element) {
      var selectedModalId = $(element).attr('href');
      var modal = $(selectedModalId.toString());
      var closeBtn = modal.find(closeBtnClass);
      var bodyEl = $('body');
      var htmlEl = $('html');

      $(element).on('click', function(ev) {
        ev.preventDefault();

        modal.addClass('is-active animated zoomIn');

        if (window.matchMedia('(max-width:' + mobileMediaQuery + ')').matches) {
          bodyEl.addClass('has-openModal');
          htmlEl.addClass('has-openModal');
        } else {
          profileItems.each(function(idx, item) {
            $(item).addClass('is-hidden');
          });
        }

        setTimeout(function() {
          modal.removeClass('animated zoomIn');
        }, animationDuration);
      });

      $(closeBtn).on('click', function() {
        modal.addClass('animated zoomOut');
        bodyEl.removeClass('has-openModal');
        htmlEl.removeClass('has-openModal');

        setTimeout(function() {
          modal.removeClass('is-active animated zoomOut');

          if (!window.matchMedia('(max-width:' + mobileMediaQuery + ')').matches) {
            profileItems.each(function(idx, item) {
              $(item).removeClass('is-hidden');
            });
          }
        }, animationDuration - 200);
      })
    });
  }

  /**
   * RegEx test for valid email address
   */
  function isValidEmail(email) {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    return re.test(email);
  }

  /**
   * Vaidate single form field
   *
   * item {Object} - form field that will be validated
   * config {Object} - configuration needed for the error messages
   */
  function validateItem(item, config) {
    var parentEl = $('#contact-' + item.name).parent();
    var isValid = false;

    if (item.name === 'email') {
      isValid = item.value.length > 0 && isValidEmail(item.value);
    } else {
      isValid = item.value.length > 0;
    }

    if (!isValid) {
      parentEl.addClass(config.errorClass);
      parentEl.find('.' + config.errorMessageClass).addClass('is-active');
    } else {
      parentEl.removeClass(config.errorClass);
      parentEl.find('.' + config.errorMessageClass).removeClass('is-active');
    }

    return isValid;
  }

  /**
   * Basic form validation, including livewatch and form state logic
   */
  function formValidation() {
    var formEl = $('#contact-form');
    var errorClass = 'has-error';
    var errorMessageClass = 'o-errorMsg';

    var formFields = formEl.find('input, textarea');

    formFields.on('input', function() {
      if (formEl.data('is-dirty')) {
        var _this = $(this);

        validateItem({
          name: _this[0].name,
          value: _this[0].value
        }, {
          errorClass: errorClass,
          errorMessageClass: errorMessageClass
        });
      }
    });

    $('#submit-form').on('click', function(e) {
      e.preventDefault();
      var buttonEl = $(this);
      var buttonElParent = buttonEl.parent();
      var currentState = [];
      var formValues = $('#contact-form').serializeArray();

      formEl.data('is-dirty', true);

      buttonElParent.removeClass(errorClass);
      buttonElParent.find('.' + errorMessageClass).removeClass('is-active');

      formValues.forEach(function(item) {
        currentState.push(validateItem(item, {
          errorClass: errorClass,
          errorMessageClass: errorMessageClass
        }));
      });

      if (currentState[0] && currentState[1] && currentState[2]) {
        buttonEl.addClass('is-loading');
        buttonEl.attr('disabled', 'disabled');

        $.ajax({
          type: 'POST',
          url: 'https://mobishape.com/contact-form/',
          data: JSON.stringify({
            name: formValues[0].value,
            email: formValues[1].value,
            message: formValues[2].value
          }),
          contentType: 'application/json',
          success: function(data) {
            console.log(arguments, data);

            window.location.href = window.location.href.split('#')[0] + 'thank-you';

            formFields.forEach(function(item) {
              $(item).val('');
            });
            formEl.data('is-dirty', false);
            buttonEl.removeClass('is-loading');
            buttonEl.removeAttr('disabled');
          },
          error: function(xhr, type) {
            console.log('Error!', type);
            buttonEl.removeAttr('disabled');
            buttonEl.removeClass('is-loading');
            buttonElParent.addClass(errorClass);
            buttonElParent.find('.' + errorMessageClass).addClass('is-active');
          }
        });
      }
    });
  }

  /**
   * Slider functionality
   *
   * config {Object} - provided config params
   */
  function initSlider(config) {
    var parentEl = $(config.parentEl);
    var slider = new Siema({
      selector: config.selector,
      duration: 200,
      easing: 'ease-out',
      perPage: 1,
      startIndex: 0,
      draggable: false,
      threshold: 80,
      loop: true
    });

    parentEl.find('.o-slideControls__prev').on('click', function() {
      slider.prev();
    })
    parentEl.find('.o-slideControls__next').on('click', function() {
      slider.next();
    })
  }

  /**
   * About us slider functionality
   *
   * config {Object} - provided config params
   */
  function registerAboutSlider() {
    var profilesParentEl = $('.c-profiles');
    var profilesParentElContent = $('.c-profiles').html();

    if (window.matchMedia('(max-width: 30rem)').matches) {
      initSlider({
        selector: '.c-profiles',
        parentEl: '.c-about'
      });

      profilesParentEl.data('has-slider', true);

      initDialogModals({});
    }

    window.onresize = function() {
      if (
        window.matchMedia('(max-width: 30rem)').matches
        && !profilesParentEl.data('has-slider')
      ) {
        initSlider({
          selector: '.c-profiles',
          parentEl: '.c-about'
        });

        profilesParentEl.data('has-slider', true);

        initDialogModals({});
      }

      if (
        !window.matchMedia('(max-width: 30rem)').matches
        && profilesParentEl.data('has-slider')
      ) {
        profilesParentEl.html(profilesParentElContent);
        profilesParentEl.data('has-slider', false)

        initDialogModals({});
      }
    };
  }

  /**
   * Navigation button click event listener
   *
   * config {Object} - provided config params
   */
  function registerNavBtnClick(config) {
    $(config.navBtnId).on('click', function() {
      $('body').toggleClass('has-openModal');
      $('html').toggleClass('has-openModal');
    });
  }

  /**
   * Navigation items click event listener
   *
   * config {Object} - provided config params
   */
  function registerNavItemsClick(config) {
    $(config.navMenuClass).on('click', 'li a', function() {
      $(config.navBtnId).prop('checked', false);
      $('body').removeClass('has-openModal');
      $('html').removeClass('has-openModal');
    });
  }

  function registerScrollTriggers(config) {
    var moveTo = new MoveTo({
      tolerance: 50,
      duration: 800,
      easing: 'easeOutQuart'
    });

    var navTriggers = $(config.triggerClass);

    for (var i = 0; i < navTriggers.length; i++) {
      moveTo.registerTrigger(navTriggers[i]);
    }
  }

  // Initialise Scripts
  initDialogModals({});
  formValidation();
  registerAboutSlider();
  initSlider({
    selector: '.c-work__slider',
    parentEl: '.c-work'
  });
  registerScrollTriggers({
    triggerClass: '.js-navTrigger'
  });
  registerNavBtnClick({
    navBtnId: '#menu-state-handler'
  });
  registerNavItemsClick({
    navMenuClass: '.c-navbar__menuList',
    navBtnId: '#menu-state-handler'
  });
}(window.Zepto, window.Siema, window.MoveTo));

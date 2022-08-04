!function(e,a,t){"use strict";function o(a){var t=a.profileItemClass||".c-profiles__item",o=a.profileItemClass||".c-profile",s=a.closeBtnClass||".c-profileModal__closeBtn",n=a.animationDuration||500,r=a.tabletMediaQuery||"49rem",i=e(t);e(o).each(function(a,t){var o=e(t).attr("href"),l=e(o.toString()),c=l.find(s),d=e("body"),m=e("html");e(t).on("click",function(a){a.preventDefault(),l.addClass("is-active animated zoomIn"),window.matchMedia("(max-width:"+r+")").matches?(d.addClass("has-openModal"),m.addClass("has-openModal")):i.each(function(a,t){e(t).addClass("is-hidden")}),setTimeout(function(){l.removeClass("animated zoomIn")},n)}),e(c).on("click",function(){l.addClass("animated zoomOut"),d.removeClass("has-openModal"),m.removeClass("has-openModal"),setTimeout(function(){l.removeClass("is-active animated zoomOut"),window.matchMedia("(max-width:"+r+")").matches||i.each(function(a,t){e(t).removeClass("is-hidden")})},n-200)}),e(l).on("touchmove",function(e){l[0].offsetHeight>=l[0].scrollHeight&&e.preventDefault()})})}function s(e){return/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim.test(e)}function n(a,t){var o=e("#contact-"+a.name).parent(),n=!1;return n="email"===a.name?a.value.length>0&&s(a.value):a.value.length>0,n?(o.removeClass(t.errorClass),o.find("."+t.errorMessageClass).removeClass("is-active")):(o.addClass(t.errorClass),o.find("."+t.errorMessageClass).addClass("is-active")),n}function r(t){var o=e(t.parentEl),s=new a({selector:t.selector,duration:200,easing:"ease-out",perPage:1,startIndex:0,draggable:!1,threshold:80,loop:!0});o.find(".o-slideControls__prev").on("click",function(){s.prev()}),o.find(".o-slideControls__next").on("click",function(){s.next()})}o({}),function(){var a=e("#contact-form"),t=a.find("input, textarea");t.on("input",function(){if(a.data("is-dirty")){var t=e(this);n({name:t[0].name,value:t[0].value},{errorClass:"has-error",errorMessageClass:"o-errorMsg"})}}),e("#submit-form").on("click",function(o){o.preventDefault();var s=e(this),r=s.parent(),i=[],l=e("#contact-form").serializeArray();a.data("is-dirty",!0),r.removeClass("has-error"),r.find(".o-errorMsg").removeClass("is-active"),l.forEach(function(e){i.push(n(e,{errorClass:"has-error",errorMessageClass:"o-errorMsg"}))}),i[0]&&i[1]&&i[2]&&(s.addClass("is-loading"),s.attr("disabled","disabled"),e.ajax({type:"POST",url:"https://mobishape.com/contact-form/",data:JSON.stringify({name:l[0].value,email:l[1].value,message:l[2].value}),contentType:"application/json",success:function(o){console.log(arguments,o),window.location.href=window.location.href.split("#")[0]+"thank-you",t.forEach(function(a){e(a).val("")}),a.data("is-dirty",!1),s.removeClass("is-loading"),s.removeAttr("disabled")},error:function(e,a){console.log("Error!",a),s.removeAttr("disabled"),s.removeClass("is-loading"),r.addClass("has-error"),r.find(".o-errorMsg").addClass("is-active")}}))})}(),function(){var a=e(".c-profiles"),t=e(".c-profiles").html();window.matchMedia("(max-width: 30rem)").matches&&(r({selector:".c-profiles",parentEl:".c-about"}),a.data("has-slider",!0),o({})),window.onresize=function(){window.matchMedia("(max-width: 30rem)").matches&&!a.data("has-slider")&&(r({selector:".c-profiles",parentEl:".c-about"}),a.data("has-slider",!0),o({})),!window.matchMedia("(max-width: 30rem)").matches&&a.data("has-slider")&&(a.html(t),a.data("has-slider",!1),o({}))}}(),r({selector:".c-work__slider",parentEl:".c-work"}),function(a){var o=e(a.triggerClass),s=e(a.triggerMainNavClass),n=e("body"),r=e("html"),i=e(a.navBtnId),l=new t;s.each(function(a,t){var o=t.id.split("-")[0];e(t).on("click",function(a){a.preventDefault(),i.prop("checked",!1),n.removeClass("has-openModal"),r.removeClass();var t=window.matchMedia("(max-width: 49rem)").matches,s=e("#"+o)[0];l.toElement(s,{offset:t?0:-50})})}),o.each(function(a,t){var o=t.id.split("-")[0];e(t).on("click",function(a){a.preventDefault();var t=window.matchMedia("(max-width: 49rem)").matches,s=e("#"+o)[0];l.toElement(s,{offset:t?0:-50})})})}({triggerClass:".js-navTrigger",triggerMainNavClass:".js-mainNavTrigger",navBtnId:"#menu-state-handler"}),function(a){e(a.navBtnId).on("click",function(){e("body").toggleClass("has-openModal"),e("html").toggleClass("has-openModal")}),e(a.navMenuClass).on("touchmove",function(a){var t=e(this);t[0].offsetHeight>=t[0].scrollHeight&&a.preventDefault()})}({navBtnId:"#menu-state-handler",navMenuClass:".c-navbar__menu"})}(window.Zepto,window.Siema,window.SweetScroll);
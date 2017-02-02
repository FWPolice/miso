/* ==========================================================================
   Affix Menu
   ==========================================================================

var menu = document.querySelector('#homeNav');
var menuPosition = menu.getBoundingClientRect();
var placeholder = document.createElement('div');
placeholder.style.width = menuPosition.width + 'px';
placeholder.style.height = menuPosition.height + 'px';
var isAdded = false;

window.addEventListener('scroll', function() {
    if (window.pageYOffset >= menuPosition.top && !isAdded) {
        menu.classList.add('affix');
        menu.parentNode.insertBefore(placeholder, menu);
        isAdded = true;
    } else if (window.pageYOffset < menuPosition.top && isAdded) {
        menu.classList.remove('affix');
        menu.parentNode.removeChild(placeholder);
        isAdded = false;
    }
});*/

/* ==========================================================================
   Animated Skillbars
   ========================================================================== */

function isScrolledIntoView(id){
    var elem = "#" + id;
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    if ($(elem).length > 0){
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
    }

    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
      && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
}

$(window).scroll(function(){
    $('.skillbar').each(function(){
        if ($(this).hasClass('notinview')){
            $(this).find('.pointerval .value').html('0%');
            if (isScrolledIntoView($(this).attr('id'))){
                $(this).removeClass('notinview');
                $(this).find('.skill-bar-percent').animate({
                    width:jQuery(this).closest('.skillbar').attr('data-percent')
                },{
                    duration : 2000, //the duration in ms of the bar animation
                    easing: 'easeInOutExpo', //the easing effect of the animation
                    step: function(now, fx){
                        $(this).siblings('.pointerval').css('left',parseFloat(now, 10)+'%').find('.value').text(parseInt(now, 10)+'%');
                    }
                });
            }
        }
    });
});

function sliding_horizontal_graph(id, speed){
    $("#" + id + " li span").each(function(i){
        var cur_li = $("#" + id + " li").eq(i).find("span");
        var w = cur_li.attr("title");
        cur_li.animate({width: w + "%"}, speed);
    })
}
function graph_init(id, speed){
    $(window).scroll(function(){
        if ($('#'+id).hasClass('notinview')){
            if (isScrolledIntoView(id)){
                $('#'+id).removeClass('notinview');
                sliding_horizontal_graph(id, speed);
            }
        }
    });

    if (isScrolledIntoView(id)){
        sliding_horizontal_graph(id, speed);
    }
}

/* ==========================================================================
   Parallax Header
   ========================================================================== */

var $window = $(window);
var scrollFade = function ($element, friction, offset) {
  friction  = (friction  === undefined)? 0.45 : friction;
  offset = (offset === undefined)? 0 : offset;

  var parentHeight = $element.parent().outerHeight() * 0.45;
  var previousOpacity = Infinity;

  $window.scroll(function() {
    var scrollTop = Math.max(0, $window.scrollTop())
      , yOffset   = scrollTop * friction
      , opacity   = 1 - (scrollTop / parentHeight - (parentHeight * offset))

    if (opacity < 0 && previousOpacity < 0) return;

    $element.css({
      transform: 'translate3d(0px,'+ yOffset +'px, 0)',
      opacity: opacity
    });

    previousOpacity = opacity;
  });
}

scrollFade($('#hero-unit .hero-content')
  , 0.7  // Friction (0 ~ 1): lower = none
  , 0    // Fade duration (0 ~ 1): lower = longer
);

/* ==========================================================================
   Initialize
   ========================================================================== */

!function ($) {
    $(function () {

        // make code pretty
        window.prettyPrint && prettyPrint()

        // testimonials
        $('.testimonials').carousel({
            interval: 4000,
            pause: "false"
        });

        // nav affix
       $('#pageNav').affix({
           offset: {
               top: 100
           }
       });

       $('#pageSub').affix({
           offset: {
               top: 150
           }
       });

       $('#homeNav').affix({
           offset: {
               top: 300
           }
       });

       $('#homeSub').affix({
           offset: {
               top: 640
           }
       });
    })
} (window.jQuery)

/*$(window).load(function() {
    $('.blog .post').hover(function() {
        $(this).find('.description').stop().animate({
            height: "toggle",
            opacity: "toggle"
        }, 300);
    });
});
*/

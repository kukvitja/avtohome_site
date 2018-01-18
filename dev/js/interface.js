$(document).ready(function () {
    $(document).on ('click', function () {
        var e = event.path[0].id;
        if (e!='') {
            if ($("." + e).is(':visible')) {
                $("." + e).fadeOut(500);
                //.hide(300);
            } else {
                $("." + e).fadeIn(500);
                $("." + e).on('click', function () {
                    if (e === 'not_working') {
                        $("." + e).fadeOut(500);
                    }
                });
            }
        }
    });
    function allWindow(cl) {
        var h = $(window).innerHeight();
        $('.'+cl).css({"height":h+'px'});
    }
   allWindow('not_working');

    var l = 0;
    function scrollDiv(el, direction, width) {
        width = +(parseInt(width));
        var winWidth = $(window).innerWidth();
        var wrapWidth = width*($('#'+el+' article').length);
        $('#'+el).css("width", wrapWidth);
        if (direction === "left" && parseInt($('#'+el).css("margin-left"))>= (0 - wrapWidth + winWidth)){
            $('#'+el).css("margin-left", (l-=width));

        }else if (direction === "right" && parseInt($('#'+el).css("margin-left"))<= (0 - width || width || 0)){
            $('#'+el).css("margin-left", (l+=width));
        }
    }
// Авто Слайдер
        setInterval(function () {
            var winWidth = $(window).innerWidth();
            var wrapWidth = 320*($('#wrapper').find('article').length);
            if (l >=(0 - wrapWidth + winWidth)) {
                scrollDiv('wrapper', 'left', 320);
            }else {
                $('#wrapper').css('margin-left', 0);
                l=0;
            }
        },5000);

    $('.hot-deals-left').click(function () {
        scrollDiv("wrapper", "left", 320);
    });

    $(".hot-deals-right").click(function () {
        scrollDiv("wrapper", "right", 320);
    });

});


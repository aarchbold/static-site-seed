$.fn.handleCarousel = function(options,reset) {
    var $container = $(this),
        $tileScroller = $('.tiles__scroller--inner',$container); 

    // edge case for press clippings section.
    if ($container.attr('id') === 'pressClippinsScroller') {
        if (!reset) {
            var lastTile = $(options.cssClass,$container).last(),
                clippings = $('#pressClippings');
            clippings.insertAfter(lastTile);
        } else {
            var lastTile = $(options.cssClass,$container).eq(-2),
                clippings = $('#pressClippings');
            clippings.insertBefore(lastTile);
        }
    }

    var $tiles = $(options.cssClass,$container);


    if (reset) {
        $tiles.each(function(i,e) {
            //$('.tile-inner',$(e)).height($container.height());
            $(e).removeAttr('style');
        })
        $tileScroller.width('100%');
        return false;
    }
    function setTileWidth() {
        var winWidth = $(window).width();
        var offset = 65;
        $tiles.each(function(i,e) {
            //$('.tile-inner',$(e)).height($container.height());
            $(e).width(winWidth - offset);
            $(e).css('float','left');
        })
        $tileScroller.width(winWidth * $tiles.length);
    }

    // for mobile swiping
    $tiles.each(function(index,elem) {
        $(elem).hammer().bind('swiperight', function(ev) {
            if (index === 0) {
                return false;
            }
            $container.scrollTo($($tiles[index - 1]),{
                duration: 230,
                easing: 'linear'
            });
        });
        $(elem).hammer().bind('swipeleft', function(ev) {
            if (index === $tiles.length - 1) {
                return false;
            }
            $container.scrollTo($($tiles[index + 1]),{
                duration: 230,
                easing: 'linear'
            });
        });
    })




    //$tiles.swiperight()

    setTileWidth();
}

$(function(){
    if ($(window).width() < 650) {
        $('#caseStudiesScroller').handleCarousel({
            cssClass: '.tile'
        });
        $('#caseStudiesPageScroller').handleCarousel({
            cssClass: '.case-studies-section'
        });
        $('#pressClippinsScroller').handleCarousel({
            cssClass: '.tile'
        });
        $('#accoladesScroller').handleCarousel({
            cssClass: '.accolades__item'
        });
    }
    var resizeTimeout;
    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function(){    
            if ($(window).width() < 650) {
                $('#caseStudiesScroller').handleCarousel({
                    cssClass: '.tile'
                });
                $('#caseStudiesPageScroller').handleCarousel({
                    cssClass: '.case-studies-section'
                });
                $('#pressClippinsScroller').handleCarousel({
                    cssClass: '.tile'
                });
                $('#accoladesScroller').handleCarousel({
                    cssClass: '.accolades__item'
                });
            } else {
                $('#caseStudiesScroller').handleCarousel({
                    cssClass: '.tile'
                },true);
                $('#caseStudiesPageScroller').handleCarousel({
                    cssClass: '.case-studies-section'
                },true);
                $('#pressClippinsScroller').handleCarousel({
                    cssClass: '.tile'
                },true);
                $('#accoladesScroller').handleCarousel({
                    cssClass: '.accolades__item'
                },true);
            }
        }, 500);
    });
});
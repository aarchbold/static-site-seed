$.fn.handleBlogFeature = function() {
    var $container = $(this),
        windowThreshold = 840
        windowWidth = $(window).width(),
        $content = $('.blog-feature__meta', $container),
        $col2 = $('.blog-feature__col2', $container);

    var optimize = function() {
        $content.prependTo($container);
    }

    var checkWindowWidth = function() {
        windowWidth = $(window).width()
        if (windowWidth <= windowThreshold) {
            optimize();
        } else {
            $content.prependTo($col2);
        }
    }

    if (windowWidth <= windowThreshold) {
        optimize();
    }

    window.addEventListener('resize', checkWindowWidth);
}

$(function(){    
    $('.blog-feature').handleBlogFeature();
});

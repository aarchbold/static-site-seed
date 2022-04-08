$.fn.handleMobileServicesFeatures = function() {
    var $feature = $(this),
        $h3 = $('h3',$feature),
        $text = $('.feature-description',$feature);

    
    $h3.click(function() {
        if ($(window).width() < 675) {
            var $currentFeature = $('.feature-description', $(this).parent());
            console.log($(this));
            $(this).hasClass('-active') ? $(this).removeClass('-active') : $(this).addClass('-active');
            $currentFeature.hasClass('-active') ? $currentFeature.removeClass('-active') : $currentFeature.addClass('-active');
        }
    });
}

$.fn.handleServicesReadMore = function() {
    var $context = $(this),
        $links = $('.services-feature__read-more', $context),
        $executeContentCreation = $('#executeContentCreation', $context),
        $strategicDistribution = $('#strategicDistribution', $context),
        $close = $('.services-feature__overlay--close'),
        offset = 260;

    $close.click(function(e) {
        e.preventDefault();
        $executeContentCreation.hide();
        $strategicDistribution.hide();
        $links.removeClass('-active');
    })

    $links.click(function(e) {
        e.preventDefault();
        $executeContentCreation.hide();
        $strategicDistribution.hide();
        console.log($(this).hasClass('-active'));
        if ($(this).hasClass('-active')) {
            $links.removeClass('-active');
        } else {
            var target = '#' + $(this).attr('data-read-more');
            $links.removeClass('-active');
            $(this).addClass('-active');
            $(target).show();
            $('html, body').animate({
                scrollTop: $(target).offset().top - offset
            }, 300); 
        }
    });
}

$(function(){    
    $('.services-feature').handleMobileServicesFeatures();
    $('#servicesExecute').handleServicesReadMore();
});
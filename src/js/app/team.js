$.fn.handleLeadershipReadMore = function() {
    var $context = $(this),
        $links = $('.team__read-more', $context);

    $links.click(function(e) {
        e.preventDefault();
        console.log($(this));
        console.log($(this).hasClass('-active'));
        if ($(this).hasClass('-active')) {
            var target = '#' + $(this).attr('data-read-more');
            $links.removeClass('-active');
            $(this).html('Read More');
            $(target).hide();
        } else {
            var target = '#' + $(this).attr('data-read-more');
            $links.removeClass('-active');
            $(this).addClass('-active');
            $(this).html('Read Less');
            $(target).show();
        }
    });
}

$(function(){    
    $('#leadershipBios').handleLeadershipReadMore();
});
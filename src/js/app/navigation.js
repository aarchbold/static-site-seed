$.fn.handleTopNav = function() {
    var $container = $(this),
        $mainMenu = $('.topnav-main-menu', $container),
        $toggle = $('.topnav-mobile__menu', $container),
        $openIcon = $('.topnav-mobile__menu .-open', $container),
        $closeIcon = $('.topnav-mobile__menu .-close', $container);

    $toggle.click(function(e) {
        e.preventDefault(e);
        if ($toggle.hasClass('-open')) {
            $toggle.removeClass('-open');
            $openIcon.show();
            $closeIcon.hide();
            $mainMenu.hide();
            $('body').css('overflow','auto');
        } else {
            $toggle.addClass('-open');
            $openIcon.hide();
            $closeIcon.show();
            $mainMenu.show();
            $('body').css('overflow','hidden');
        }
    });

    function slimNav(reset) {
        if (reset) {
            $('nav').removeClass('-compact');
        } else {
            $('nav').addClass('-compact');
        }
    }

    document.addEventListener('scroll', function() {
        if ($(window).scrollTop() > 0) {
            slimNav();
        } else {
            slimNav(true);
        }
    });

}

$.fn.getCurrentDate = function() {
    var $container = $(this);
    var newDate = new Date();
    var currentYear = newDate.getFullYear();
    $container.html(currentYear);
}

$(function(){    
    $('.topnav-container').handleTopNav();
    $('#currentYear').getCurrentDate();
});
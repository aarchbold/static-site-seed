// function getParam(name) {
//     SCH = document.location.search;
//     if(window['W3T'] && (W3T['MORE_ARGS'] != "")) {
//         SCH += "&" + W3T['MORE_ARGS'];
//     }
//     SCH = "?&" + SCH.substring(1,SCH.length);
//     // alert('SCH = ' + SCH);
//     var start = SCH.indexOf("&" + name+"=");
//     var len = start+name.length+2;
//     if ((!start) && (name != SCH.substring(0,name.length))) return("");
//     if (start == -1) return "";
//     var end = SCH.indexOf("&",len);
//     if (end == -1) end = SCH.length;
//     // alert('finished getting parm ' + name);
//     return unescape(SCH.substring(len,end));
// }


$.fn.handleScroll = function() {
    var $link = $(this);
    var offset = 120;

    function doTheScroll(target, isDeepLink) {
        // if ($(window).width() < 421) {
        //     offset = 100;
        //     if (addBuffer) {
        //         offset = 730;
        //     }
        // }
        if (isDeepLink) {
            if ($(window).width() < 421) {
                offset = 60;
            } 
        }
        $('html, body').animate({
            scrollTop: $(target).offset().top - offset
        }, 400);
    }

    $link.click(function() {
        target = '#' + $(this).attr('data-scroll-target');
        doTheScroll(target);
    });

    // check for #contact in the url
    if (window.location.hash === '#contact') {
        target = '#contactContainer';
        doTheScroll(target, true);
    } else if (window.location.hash) {
        target = window.location.hash;
        doTheScroll(target);
    }
}

$(function(){    
    $('.inline-scroll').handleScroll();
});
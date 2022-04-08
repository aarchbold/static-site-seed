$.fn.handleVideoStuffs = function() {
    var characters = '';
    var writerSequence = '82736869';
    var servicesSequence = '65766578';
    var videoContainer = $('#fallbackVideo');

    function checkKey(e) {
        if (window.location.href.indexOf('writers') > -1) {
            if (e.keyCode === 82 ||
                e.keyCode === 73 ||
                e.keyCode === 68 ||
                e.keyCode === 69) {
                characters = characters + e.keyCode;
            } else {
                characters = '';
            }
            if (characters === writerSequence) {
                var video = '<iframe class="youtube-player" id="player" type="text/html" src="https://www.youtube.com/embed/DVxifRwvQ30?wmode=opaque&autohide=1&autoplay=1&enablejsapi=1" frameborder="0">&lt;br /&gt;</iframe>';
                $(video).appendTo(videoContainer);
            }
        } else if (window.location.href.indexOf('content-marketing-services') > -1) {
            if (e.keyCode === 65 ||
                e.keyCode === 76 ||
                e.keyCode === 65 ||
                e.keyCode === 78) {
                characters = characters + e.keyCode;
            } else {
                characters = '';
            }
            if (characters === servicesSequence) {
                var video = '<iframe class="youtube-player" id="player" type="text/html" src="https://www.youtube.com/embed/aBQalkIeE7s?wmode=opaque&autohide=1&autoplay=1&enablejsapi=1" frameborder="0">&lt;br /&gt;</iframe>';
                $(video).appendTo(videoContainer);
            }
        }
    }
    document.addEventListener('keyup', checkKey);
}

$.fn.optimizeVideo = function() {
    var $container = $(this),
        $sourceTag = $('source',$container),
        videoPath = '/agencystatic/videos/' + $container.attr('data-video-section') + '_low_res.mp4';

    if ($(window).width() < 601) {
        $sourceTag.attr('src', videoPath);
        if ($container[0]) {
            $container[0].load();
        }
    }
}

$.fn.handleYouTubeEmbed = function() {
    var $videoLink = $(this),
        $closeButton = $('.video-overlay-close'),
        $embedContainer = $('.video-overlay__embed'),
        $videoOverlay = $('.video-overlay'),
        youtubeUrl = 'https://www.youtube.com/embed/';
    console.log($videoLink);

    function addVideo(videoId) {
        $videoOverlay.show();
        var video = '<iframe src="https://www.youtube.com/embed/'+ videoId +'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
        $(video).appendTo($embedContainer);
    }

    $closeButton.click(function(e) {
        e.preventDefault();
        $('iframe',$embedContainer).remove();
        $videoOverlay.hide();
        $('body').css('overflow','visible');
    })

    $videoLink.click(function(e) {
        $('body').css('overflow','hidden');
        addVideo($(this).attr('data-video-id'));
    })
}

$(function(){    
    $('.bg-video').handleVideoStuffs();
    $('#videoContainer').optimizeVideo();
    $('.case-study_video-wrapper').handleYouTubeEmbed();
});
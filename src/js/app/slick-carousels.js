

$(function(){
    $('.slick-container').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: false
                }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false
              }
            }
        ]
    });
});
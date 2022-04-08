$.fn.sameHeightParty = function(options) {
    var $context = $(this),
        $cols = $(options.cssSelectorClass,$context),
        maxHeight = 0;
    
    // 2. set column height
    function setColHeights(height) {
        $cols.each(function(i,e) {
            $(e).height(height)
        })
    }

    // 1. Find the tallest column
    // give some time for animation to finish
    function findTallest() {
        window.setTimeout(function() {
            $cols.each(function(i,e) {
                if ($(e).height() > maxHeight) {
                    maxHeight = $(e).height()
                }
            })
            if (window.innerWidth < options.mobileBreakPoint) {
                setColHeights(maxHeight);
            } else {
                $cols.each(function(i,e) {
                    $(e).height('auto');
                })
            }
        },100)
    }

    var myEfficientFn = debounce(function() {
        findTallest();
    }, 250);

    window.addEventListener('resize', myEfficientFn);
    findTallest();
}

$(window).on('load',function() {
    $('#pressClippinsScroller').sameHeightParty({
        cssSelectorClass: '.tile',
        mobileBreakPoint: '650'
    });
    $('#homeCaseStudies').sameHeightParty({
        cssSelectorClass: '.tile',
        mobileBreakPoint: '650'
    });
    $('#caseStudiesPageScroller').sameHeightParty({
        cssSelectorClass: '.case-studies-section',
        mobileBreakPoint: '650'
    });
    $('#accoladesScroller').sameHeightParty({
        cssSelectorClass: '.accolades__item',
        mobileBreakPoint: '650'
    });
})

$(function(){

})
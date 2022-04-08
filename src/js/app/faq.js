$.fn.doTheFAQ = function() {
    var $context = $(this),
        $questions = $('.faq-question',$context);

    $questions.click(function(e) {
        e.preventDefault();
        var $answer = $('.faq-answer',$(this).parent());
        if ($(this).hasClass('-active')) {
            $(this).removeClass('-active');
            $answer.hide();
        } else {
            $(this).addClass('-active');
            $answer.show();
        }
    });
}

$(function(){    
    $('.faq-section').doTheFAQ();
});
$.fn.handleSignUp = function() {
    var $signUpButton = $('#signUp'),
        $modal = $('.modal-container'),
        $closeButton = $('.modal-close'),
        $email = $('#emailSignup'),
        $firstname = $('#firstnameSignup'),
        $lastname = $('#lastnameSignup'),
        $joinButton = $('#joinButton'),
        $formInputs = $('.form-inputs'),
        $formLoading = $('.form-loading'),
        $formSuccess = $('.form-success');

    $joinButton.click(function(e) {
        e.preventDefault();
        if ($email.val() === '') {
            alert('Please enter a valid email.');
        } else {
            $formInputs.hide();
            $formLoading.show();
            let payload = {
                firstname: $firstname.val(),
                lastname: $lastname.val(),
                email: $email.val(),
                path: 'waitlist'
            }
            $.post('https://zdtqrwuc01.execute-api.us-west-2.amazonaws.com/production/waitlist', JSON.stringify(payload), function() {
                // displayError('success', 'Thank you for your interest! We will get back to you shortly.');
                $formSuccess.show();
                $formLoading.hide();
                setTimeout(function() {
                    $firstname.val('');
                    $lastname.val('');
                    $email.val('');
                },500);
            })
            .fail(function(response) {
                $formInputs.show();
                $formSuccess.hide();
                console.log('fail');
                console.log(response);
                //displayError('error', errorMsg);
            });
        }
        // alert('submit');
    })

    $signUpButton.click(function(e) {
        e.preventDefault();
        $('body').css({
            overflow: 'hidden'
        })
        $modal.fadeIn();
    })

    $closeButton.click(function(e) {
        $formInputs.show();
        $formLoading.hide();
        $formSuccess.hide();
        e.preventDefault();
        $('body').css({
            overflow: 'visible'
        })
        $modal.fadeOut();
    })
}


$(function(){    
    $('#signUp').handleSignUp();
});
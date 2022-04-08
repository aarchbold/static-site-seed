/**
 * Newsletter Sign Up
 * Sends a request to the BE for subscribing to our mailchimp email
 */
$.fn.newsletterSignUp = function() {
    var logPrefix = '[Newsletter Sign Up]',
        form = this,
        email = $('input[type=email]', form),
        button = $('button', form),
        emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        errorText = '',
        inProgress = false,
        errorContainer = $('.form-error', form),
        formFields = $('.footer-newsletter-signup__form', form),
        successMessage = $('.form-success', form);

    function resetError() {
        email.removeClass('error');
        errorText = '';
        errorContainer.html(errorText);
        errorContainer.hide();
    }

    // remove error on email field if one exists
    email.on('input', function() {
        if(emailPattern.test(email.val())) {
            resetError();
        }
    });

    form.submit(function(e) {
        e.preventDefault();
        button.addClass('-is-loading');
        email.prop('disabled',true);
        button.prop('disabled',true);
        if (!inProgress && email.val() !== '' && emailPattern.test(email.val())) {
            var postData = {
                email: email.val(),
                type: 'newsletter',
                path: 'capture_email'
            };

            resetError();
            inProgress = true;


            $.post('https://51sgr5eeeb.execute-api.us-east-1.amazonaws.com/production/quietly-agency-marketing/capture_email', JSON.stringify(postData), function() {
                inProgress = false;
                button.removeClass('-is-loading');
                email.prop('disabled',false);
                button.prop('disabled',false);
                form[0].reset();
                formFields.hide();
                successMessage.show();
            })
            .fail(function(response) {
                console.log(response);
                if (response && response.responseText) {

                    if (typeof JSON.parse(response.responseText).message === 'object') {
                        var errors = JSON.parse(response.responseText).message;
                        for(var key in errors) {
                            errorText += errors[key] + ' ';
                            console.log(logPrefix, errorText);
                        }

                    } else {
                        errorText = JSON.parse(response.responseText).message;
                    }
                }

                if (!errorText) {
                    errorText = "Error contacting server. Please try again later."
                }

                errorContainer.html(errorText);
                errorContainer.show();
                email.addClass('error');
                button.removeClass('-is-loading');
                email.prop('disabled',false);
                button.prop('disabled',false);
                inProgress = false;
            });
        } else {
            // stop spinner
            button.removeClass('-is-loading');
            email.addClass('error');
            email.prop('disabled',false);
            button.prop('disabled',false);
            errorText = 'Please enter a valid email';
            errorContainer.html(errorText);
            errorContainer.show();
        }
    });
};

$(function(){    
    $('#newsletterSignupForm').newsletterSignUp();
});
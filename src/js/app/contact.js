/**
 * Validate Contact
 * Add submit handler that validates the contact form information.
 */
$.fn.validateContact = function() {
    var logPrefix = '[Validator]',
        form = this,
        errorContainer = $('.form-error', form),
        successContainer = $('.form-success', form),
        spinner = $('button', form),
        inProgress = false,
        errorMsg = '';

    function clearFlyout() {
        errorContainer.fadeOut();
        successContainer.fadeOut();
    }

    function displayError(type, msg) {
        // Displays errors or success messages in a flyout
        if (type === 'error') {
            
            errorContainer.show();
            successContainer.hide();
            if (!msg) {
                var msg = 'Error contacting server. Please try again later.';
            }
            errorContainer.text(msg);
        } else {
            errorContainer.hide();
            successContainer.show();
            successContainer.text(msg);
        }
        setTimeout(function() {
            clearFlyout();
        }, 5000);
    }

    // custom validation rules
    $.validator.addMethod('laxUrl', function(value, element) {
        return this.optional(element) || /([\w\.]+\.[^,\s]*)/i.test(value);
    }, 'Please enter a valid URL');

    $.validator.addMethod('laxEmail', function(value, element) {
        return this.optional(element) || /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value);
    }, 'Please enter a valid email address.');

    $.validator.addMethod('laxTelephone', function(value, element) {
        return this.optional(element) || /^[^a-zA-Z]+$/.test(value);
    }, 'Please enter a valid telephone number.');

    form.validate({
        rules: {
            name: {
                required: true
            },
            telephone: {
                required: true,
                laxTelephone: true
            },
            website: {
                required: true,
                laxUrl: true
            },
            email :{
                required: true,
                laxEmail: true
            },
            company: {
                required: true
            }
        },
        errorPlacement: function(error, element) {
            // This ensures that the error label is not inserted into the
            // select box itself.
            if (element.attr('name') == 'budget') {
                error.insertAfter('div.marketing__contact-form-select');
            } else {
                error.insertAfter(element);
            }
        }
    });

    form.submit(function(e) {
        e.preventDefault();
        spinner.addClass('-is-loading');

        if (form.valid() && !inProgress) {
            var postData = {
                name: $('input[name=name]', form).val(),
                email: $('input[name=email]', form).val(),
                phone: $('input[name=telephone]', form).val(),
                website: $('input[name=website]', form).val(),
                message: $('textarea[name=comments]', form).val(),
                company: $('input[name=company]', form).val(),
                budgetRange: $('input[name=budget]', form).val(),
                requestType: 'brand',
                path: 'request_info'
            };
            inProgress = true;
            $.post('https://51sgr5eeeb.execute-api.us-east-1.amazonaws.com/production/quietly-agency-marketing/request_info', JSON.stringify(postData), function() {
                inProgress = false;
                spinner.removeClass('-is-loading');
                displayError('success', 'Thank you for your interest! We will get back to you shortly.');
                dataLayer.push({
                    'event': 'requestInfo'
                });
                setTimeout(function() {
                    form[0].reset();
                },500);
            })
            .fail(function(response) {
                if (response && response.responseText) {

                    if (typeof JSON.parse(response.responseText).message === 'object') {
                        var errors = JSON.parse(response.responseText).message;
                        for(var key in errors) {
                            errorMsg += errors[key] + ' ';
                            console.log(logPrefix, errorMsg);
                        }

                    } else {
                        errorMsg = JSON.parse(response.responseText).message;
                    }
                }
                displayError('error', errorMsg);
                spinner.removeClass('-is-loading');
                inProgress = false;
            });
        } else {
            // show errors
            displayError('error', 'Oops. There was a problem submitting this form. Please check that the required fields are filled.');
            // stop spinner
            spinner.removeClass('-is-loading');
        }
    });

};

$(function(){    
    $('#contactForm').validateContact();
});
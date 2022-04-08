function isAnyPartOfElementInViewport(el) {

    const rect = el.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}

$.fn.handleAnimatedText = function() {
    var $context = $(this),
        $textBlocks = $('.text-animation', $context),
        position = $(window).scrollTop();

    function doTheAnimation(element) {
        if (isAnyPartOfElementInViewport(element[0])) {
            element.removeClass('-animate');
        } else {
            // element.addClass('-animate');
        }
    }

    $textBlocks.each(function(i,e) {
        $(e).addClass('-animate');
        $(window).on('scroll', function() {
            doTheAnimation($(e));
        });
        doTheAnimation($(e));
    });
}

$(function(){
    $('.text-animation-group').handleAnimatedText();
})
$.fn.handleBlogFeature = function() {
    var $container = $(this),
        windowThreshold = 840
        windowWidth = $(window).width(),
        $content = $('.blog-feature__meta', $container),
        $col2 = $('.blog-feature__col2', $container);

    var optimize = function() {
        $content.prependTo($container);
    }

    var checkWindowWidth = function() {
        windowWidth = $(window).width()
        if (windowWidth <= windowThreshold) {
            optimize();
        } else {
            $content.prependTo($col2);
        }
    }

    if (windowWidth <= windowThreshold) {
        optimize();
    }

    window.addEventListener('resize', checkWindowWidth);
}

$(function(){    
    $('.blog-feature').handleBlogFeature();
});

$.fn.handleCarousel = function(options,reset) {
    var $container = $(this),
        $tileScroller = $('.tiles__scroller--inner',$container); 

    // edge case for press clippings section.
    if ($container.attr('id') === 'pressClippinsScroller') {
        if (!reset) {
            var lastTile = $(options.cssClass,$container).last(),
                clippings = $('#pressClippings');
            clippings.insertAfter(lastTile);
        } else {
            var lastTile = $(options.cssClass,$container).eq(-2),
                clippings = $('#pressClippings');
            clippings.insertBefore(lastTile);
        }
    }

    var $tiles = $(options.cssClass,$container);


    if (reset) {
        $tiles.each(function(i,e) {
            //$('.tile-inner',$(e)).height($container.height());
            $(e).removeAttr('style');
        })
        $tileScroller.width('100%');
        return false;
    }
    function setTileWidth() {
        var winWidth = $(window).width();
        var offset = 65;
        $tiles.each(function(i,e) {
            //$('.tile-inner',$(e)).height($container.height());
            $(e).width(winWidth - offset);
            $(e).css('float','left');
        })
        $tileScroller.width(winWidth * $tiles.length);
    }

    // for mobile swiping
    $tiles.each(function(index,elem) {
        $(elem).hammer().bind('swiperight', function(ev) {
            if (index === 0) {
                return false;
            }
            $container.scrollTo($($tiles[index - 1]),{
                duration: 230,
                easing: 'linear'
            });
        });
        $(elem).hammer().bind('swipeleft', function(ev) {
            if (index === $tiles.length - 1) {
                return false;
            }
            $container.scrollTo($($tiles[index + 1]),{
                duration: 230,
                easing: 'linear'
            });
        });
    })




    //$tiles.swiperight()

    setTileWidth();
}

$(function(){
    if ($(window).width() < 650) {
        $('#caseStudiesScroller').handleCarousel({
            cssClass: '.tile'
        });
        $('#caseStudiesPageScroller').handleCarousel({
            cssClass: '.case-studies-section'
        });
        $('#pressClippinsScroller').handleCarousel({
            cssClass: '.tile'
        });
        $('#accoladesScroller').handleCarousel({
            cssClass: '.accolades__item'
        });
    }
    var resizeTimeout;
    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function(){    
            if ($(window).width() < 650) {
                $('#caseStudiesScroller').handleCarousel({
                    cssClass: '.tile'
                });
                $('#caseStudiesPageScroller').handleCarousel({
                    cssClass: '.case-studies-section'
                });
                $('#pressClippinsScroller').handleCarousel({
                    cssClass: '.tile'
                });
                $('#accoladesScroller').handleCarousel({
                    cssClass: '.accolades__item'
                });
            } else {
                $('#caseStudiesScroller').handleCarousel({
                    cssClass: '.tile'
                },true);
                $('#caseStudiesPageScroller').handleCarousel({
                    cssClass: '.case-studies-section'
                },true);
                $('#pressClippinsScroller').handleCarousel({
                    cssClass: '.tile'
                },true);
                $('#accoladesScroller').handleCarousel({
                    cssClass: '.accolades__item'
                },true);
            }
        }, 500);
    });
});
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
function getParam(name) {
    SCH = document.location.search;
    if(window['W3T'] && (W3T['MORE_ARGS'] != "")) {
        SCH += "&" + W3T['MORE_ARGS'];
    }
    SCH = "?&" + SCH.substring(1,SCH.length);
    // alert('SCH = ' + SCH);
    var start = SCH.indexOf("&" + name+"=");
    var len = start+name.length+2;
    if ((!start) && (name != SCH.substring(0,name.length))) return("");
    if (start == -1) return "";
    var end = SCH.indexOf("&",len);
    if (end == -1) end = SCH.length;
    // alert('finished getting parm ' + name);
    return unescape(SCH.substring(len,end));
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
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
function initMap() {
    var mapContainer = document.getElementById('mapInstance'),
        latLng = {
            lat: 49.2838908,
            lng: -123.1049546
        },
        map = new google.maps.Map(mapContainer, { // eslint-disable-line no-undef
            center: latLng,
            zoom: 15,
            disableDefaultUI: true,
            styles: [
                {
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#212121"
                    }
                  ]
                },
                {
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#212121"
                    }
                  ]
                },
                {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "administrative.country",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9e9e9e"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#bdbdbd"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#181818"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#616161"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#1b1b1b"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#2c2c2c"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#8a8a8a"
                    }
                  ]
                },
                {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#373737"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#3c3c3c"
                    }
                  ]
                },
                {
                  "featureType": "road.highway.controlled_access",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#4e4e4e"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#616161"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#000000"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#3d3d3d"
                    }
                  ]
                }
              ]
        });
        var contentString = '<div class="map-overlay">' +
            '<p>We\'re Headquartered in Vancouver, Canada</p>' +
            '<p>33 Water Street, Suite 808<br />' +
            'Vancouver, BC V6B 1R4<br />' +
            'Phone: (855) 578 4385</p>' +
            '</div>';
        //var contentString = '<div class="map-overlay">What the?</div>'
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            pixelOffset: new google.maps.Size(0,-30)
        });
        var mobileInfowindow = new google.maps.InfoWindow({
          content: contentString,
          pixelOffset: new google.maps.Size(0,-30)
        });
        var marker = new google.maps.Marker({ // eslint-disable-line no-undef, no-unused-vars
            position: latLng,
            map: map,
            title: 'Quietly',
            icon: '/agencystatic/images/icons/icon-map-marker.svg'
        });
        marker.addListener('click', function() {
          if (window.innerWidth > 600) {  
            infowindow.open(map, marker);
          } else {
            mobileInfowindow.open(map, marker);
          }
        }); 

        // 600 min width
        if (window.innerWidth > 600) {  
          infowindow.open(map, marker);
        } else {
          mobileInfowindow.open(map, marker);
        }

        google.maps.event.addListener(infowindow, 'domready', function() {
            if ($('#mapInstance').find('.gm-style-iw-container').length === 0) {
              $('#mapInstance').find('.gm-style-iw').parent().addClass('gm-style-iw-container');
            }
        })

        google.maps.event.addListener(mobileInfowindow, 'domready', function() {
          if ($('#mapInstance').find('.gm-style-iw-container').length === 0) {
            $('#mapInstance').find('.gm-style-iw').parent().addClass('gm-style-iw-container');
          }
      })

        // mobile infoWindow

        
        var myEfficientFn = debounce(function() {
            console.log('Hi');
            // infowindow.pixelOffset = new google.maps.Size(-300,100);
            
            if (window.innerWidth > 600) {  
              infowindow.open(map, marker);
              mobileInfowindow.close();
            } else {
              mobileInfowindow.open(map, marker);
              infowindow.close();
            }
        }, 250);
    
        window.addEventListener('resize', myEfficientFn);
};

$(function(){
    if ($('#mapInstance').length > 0) {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAiFHTqZU2-AOTdopVZlR7ltL-lI1Dr-Bk&callback=initMap');
    }
});
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
$.fn.handleMobileServicesFeatures = function() {
    var $feature = $(this),
        $h3 = $('h3',$feature),
        $text = $('.feature-description',$feature);

    
    $h3.click(function() {
        if ($(window).width() < 675) {
            var $currentFeature = $('.feature-description', $(this).parent());
            console.log($(this));
            $(this).hasClass('-active') ? $(this).removeClass('-active') : $(this).addClass('-active');
            $currentFeature.hasClass('-active') ? $currentFeature.removeClass('-active') : $currentFeature.addClass('-active');
        }
    });
}

$.fn.handleServicesReadMore = function() {
    var $context = $(this),
        $links = $('.services-feature__read-more', $context),
        $executeContentCreation = $('#executeContentCreation', $context),
        $strategicDistribution = $('#strategicDistribution', $context),
        $close = $('.services-feature__overlay--close'),
        offset = 260;

    $close.click(function(e) {
        e.preventDefault();
        $executeContentCreation.hide();
        $strategicDistribution.hide();
        $links.removeClass('-active');
    })

    $links.click(function(e) {
        e.preventDefault();
        $executeContentCreation.hide();
        $strategicDistribution.hide();
        console.log($(this).hasClass('-active'));
        if ($(this).hasClass('-active')) {
            $links.removeClass('-active');
        } else {
            var target = '#' + $(this).attr('data-read-more');
            $links.removeClass('-active');
            $(this).addClass('-active');
            $(target).show();
            $('html, body').animate({
                scrollTop: $(target).offset().top - offset
            }, 300); 
        }
    });
}

$(function(){    
    $('.services-feature').handleMobileServicesFeatures();
    $('#servicesExecute').handleServicesReadMore();
});


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
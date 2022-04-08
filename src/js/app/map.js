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
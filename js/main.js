/*
 * Global Variable Setting
 */
var myhome  = new google.maps.LatLng(23.792300360658036, 90.35637438297272);
var myoffice = new google.maps.LatLng( 23.793129897384613, 90.4013603925705);
var markers = [];
var mark = [];
var iterator = 0;
var map;
var neighborhoods = [
new google.maps.LatLng(23.793129897384613, 90.4013603925705),
new google.maps.LatLng(23.792300360658036, 90.35637438297272),
];
var content_ = [
'bGLobal Interactive Ltd',
'Ziyed\'s Home',
];
var styleArray = [
{
    featureType: "all",
    stylers: [
    {
        saturation: -80
    }
    ]
},{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
    {
        hue: "#00ffee"
    },{
        saturation: 50
    }
    ]
},{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
    {
        visibility: "off"
    }
    ]
}
];
citymap = [
    new google.maps.LatLng(23.777687,90.383427),
    200
    ];
var cityCircle;
var rectangle;
var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(23.785325,90.381367),
    new google.maps.LatLng(23.782714,90.382204)
    );

var newark = new google.maps.LatLng(40.740, -74.18);
var imageBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(40.716216,-74.213393),
    new google.maps.LatLng(40.765641,-74.139235)
    );


/*
 * Home Button Control Function
 */
function HomeControl(controlDiv, map) {
    controlDiv.style.padding = '5px';
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '1px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to set the map to My Home';
    controlDiv.appendChild(controlUI);
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '6px';
    controlText.style.paddingRight = '6px';
    controlText.innerHTML = '<b>My Home</b>';
    controlUI.appendChild(controlText);
    google.maps.event.addDomListener(controlUI, 'click', function() {
        map.setCenter(myhome)
    });  
}

/*
 * Office Button Control Function
 */
function OfficeControl(controlDiv, map){
    controlDiv.style.padding = '5px';
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '1px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to set the map to My Office';
    controlDiv.appendChild(controlUI);
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '6px';
    controlText.style.paddingRight = '6px';
    controlText.innerHTML = '<b>My Office</b>';
    controlUI.appendChild(controlText);
    google.maps.event.addDomListener(controlUI, 'click', function() {
        map.setCenter(myoffice)
    });
}

/*
 * Markers Add Function
 */
function addMarker() {
    var marker = new google.maps.Marker({
        position: neighborhoods[iterator],
        map: map,
        draggable: false,
        //animation: google.maps.Animation.DROP,
        title: content_[iterator]
    });
    var infoWindow = new google.maps.InfoWindow();
    var html='<strong>'+content_[iterator]+'</strong>';
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
    });
    markers.push(marker);
    iterator++;
}

/*
 * Markers Enable Loops Control Function
 */
function enable_marker(){
    for (var i = 0; i < neighborhoods.length; i++) {
        setTimeout(function() {
            addMarker();
        }, i * 200);
    }
}

/*
 * Google Map initializer Function
 */
function initialize() {
    var myOptions = {
        center: myoffice,
        zoom: 14,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER
        },
        overviewMapControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);    
    
    /*
     * enable_marker() function Used to enable multiple markers on the map
     */
    enable_marker();

    /*
     * Enable Custom Home Control
     */
    var homeControlDiv = document.createElement('div');
    var homeControl = new HomeControl(homeControlDiv, map);
    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(homeControlDiv);
    
    /*
     * Enable Custom Office Control
     */
    var officeControlDiv = document.createElement('div');
    var officeControl = new OfficeControl(officeControlDiv, map);
    officeControlDiv.index = 2;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(officeControlDiv);

    map.setOptions({
        styles: styleArray
    });

    /*
     *  Added Polyline to map
     */
    var flightPlanCoordinates = [
    new google.maps.LatLng(23.793129897384613, 90.4013603925705),
    new google.maps.LatLng(23.794318,90.401838),
    new google.maps.LatLng(23.794337,90.400958),
    new google.maps.LatLng(23.778394,90.398083),
    new google.maps.LatLng(23.775252,90.390015),
    new google.maps.LatLng(23.764766,90.388427),
    new google.maps.LatLng(23.76559,90.383706),
    new google.maps.LatLng(23.776666,90.380616),
    new google.maps.LatLng(23.773249,90.36727),
    new google.maps.LatLng(23.778669,90.358901),
    new google.maps.LatLng(23.781614,90.351777),
    new google.maps.LatLng(23.785423,90.354052),
    new google.maps.LatLng(23.790921,90.353794),
    new google.maps.LatLng(23.791294,90.356905),
    new google.maps.LatLng(23.792472,90.356734),
    new google.maps.LatLng(23.792300360658036, 90.35637438297272),
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    
    flightPath.setMap(map);

    /*
     *  Added Polygone to map
     */
    var triangleCoords = [
    new google.maps.LatLng(23.768025,90.381389),
    new google.maps.LatLng(23.767633,90.374608),
    new google.maps.LatLng(23.764726,90.378342),
    ];
    
    bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
    });

    bermudaTriangle.setMap(map);

    /*
     *  Added circle on map ( 23.777687,90.383427 )
     */

    var populationOptions = {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: citymap[0],
        radius: citymap[1] ,
        editable: true
    };
    cityCircle = new google.maps.Circle(populationOptions);

    /*
     *  Added Rectangle on map ( 23.785325,90.381367 )
     */
    rectangle = new google.maps.Rectangle();
    var rectOptions = {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        editable: true,
        bounds: bounds
    };
    rectangle.setOptions(rectOptions);

    /*
    *  Drawing functionality added
    */
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.CIRCLE]
        },
        /*markerOptions: {
            icon: new google.maps.MarkerImage('http://www.example.com/icon.png')
        },*/
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            zIndex: 1,
            editable: true
        }
    });
    drawingManager.setMap(map);

    /*
     *  Ground Overlay
     */    
    var oldmap = new google.maps.GroundOverlay("http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",imageBounds);
    oldmap.setMap(map);

    /*
     *  Traffic layer
     */

    var trafficLayer = new google.maps.TrafficLayer();
    //trafficLayer.setMap(map);

    /*
     *  Bicycle layer
     */

    var bikeLayer = new google.maps.BicyclingLayer();
    //bikeLayer.setMap(map);

    /*
     *  Weather Report
     */
    var weatherLayer = new google.maps.weather.WeatherLayer({
        temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
    });
    //weatherLayer.setMap(map);

    var cloudLayer = new google.maps.weather.CloudLayer();
    //cloudLayer.setMap(map);

    //var panoramioLayer = new google.maps.panoramio.PanoramioLayer();
    //panoramioLayer.setMap(map);

    var panoramioLayer = new google.maps.panoramio.PanoramioLayer();

    //panoramioLayer.setMap(map);

    google.maps.event.addListener(panoramioLayer, 'click', function(event) {
        var photoDiv = document.getElementById('photoPanel');
        var attribution = document.createTextNode(event.featureDetails.title + ": " + event.featureDetails.author);
        var br = document.createElement("br");
        var link = document.createElement("a");
        link.setAttribute("href", event.featureDetails.url);
        link.appendChild(attribution);
        photoDiv.appendChild(br);
        photoDiv.appendChild(link);
    });


    map.setTilt(45);
    map.setHeading(90);

}
google.maps.event.addDomListener(window, 'load', initialize);
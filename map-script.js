var searchInput;
var properties = [
    { title: "property 1", lat: 34.4133, lng: -119.8610 },
    { title: "property 2", lat: 30.4133, lng: -119.8610 },
    { title: "property 3", lat: 34.4133, lng: -124.8610 },
    { title: "property 4", lat: 39.4133, lng: -119.8610 },
    { title: "property 5", lat: 34.4133, lng: -114.8610 }]
var markers = [];       // keep tracker of markers created from search
var infoWindows = [];   // show info when you click on a marker
var map;
var lastOpenedWindow = null;
var mapCenter = { lat: 34.4133, lng: -119.8610 };

function getLandlordInformation(searchForm) {
    searchInput = document.getElementById("search-input").value;
    if (validate()) {
        // CLEAR MARKERS ON MAP
        deleteMarkers();

        // CLEAR PROPERTIES ARRAY
        properties = [];
        //TODO: RETRIEVE DATA FROM DB

        //TODO: PUT RETRIEVED DATA INTO PROPERTIES ARRAY
        properties = [{ title: "property 5", lat: 34.4133, lng: -119.8610 },
        { title: "property 6", lat: 34.4139, lng: -119.8612 },
        { title: "property 7", lat: 34.4131, lng: -119.8614 },
        { title: "property 8", lat: 34.4132, lng: -119.8616 },
        { title: "property 9", lat: 34.4134, lng: -119.8619 }]  // FAKE RETRIEVED DATA

        // SHOW NEW MARKERS
        showMarkers();
    }
}


function myMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 15,
        center: mapCenter
    });

}
function showMarkers() {
    for (i = 0; i < properties.length; i++) {
        var myLatLng = { lat: properties[i].lat, lng: properties[i].lng };
        // create marker
        markers[i] = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: properties[i].title
        });
        // add marker onclick listner
        markers[i].addListener('click', function () {
            if (lastOpenedWindow != null) {
                lastOpenedWindow.close(map, this)
            }
            infoWindows[i] = new google.maps.InfoWindow();
            infoWindows[i].setContent(this.get('title'));
            infoWindows[i].open(map, this);
            lastOpenedWindow = infoWindows[i];
        });
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
    infoWindows = [];
}
function validate() {
    if (searchInput === '') {
        alert('Please Input Landlord You Want To Search');
        return false;
    }
    else {
        return true;
    }
}


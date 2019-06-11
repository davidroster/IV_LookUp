var searchInput;
var properties = []
var markers = [];       // keep tracker of markers created from search
var infoWindows = [];   // show info when you click on a marker
var map;
var lastOpenedWindow = null;
var mapCenter = { lat: 34.4133, lng: -119.8610 };
var landlordRatings = [];

// I think we don't want reviews making this page too busy
/*var reviewTemplate =
`
<div class="row">
<div class="col-sm-3">
  <img src={{imageUrl}} class="img-rounded">
  <div class="review-block-name"><a href="#">{{username}}</a></div>
  <div class="review-block-date">{{reviewDate}}</div>
</div>
<div class="col-sm-9">
  <div class="review-block-rate">
    <span class="fa fa-star {{star1}}"></span>
    <span class="fa fa-star {{star2}}"></span>
    <span class="fa fa-star {{star3}}"></span>
    <span class="fa fa-star {{star4}}"></span>
    <span class="fa fa-star {{star5}}"></span>
  </div>
  <div class="review-block-title">{{reviewHeader}}</div>
  <div class="review-block-description">{{reviewBody}}</div>
</div>
</div>
<hr>
`;

var reviewTest = {
    "imageUrl": "http://dummyimage.com/60x60/666/ffffff&text=No+Image",
    "username": "Bobby",
    "reviewDate": "January 29, 2016",
    "star1": "checked-star",
    "star2": "checked-star",
    "star3": "checked-star",
    "star4": "",
    "star5": "",
    "reviewHeader": "Great Management",
    "reviewBody": "his was nice in buy. this was nice in buy. this was nice in buy.this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy"
};*/

var minRent = null;
var maxRent = null;
var minOccupants = null;
var maxOccupants = null;

var geocoder = new google.maps.Geocoder;

function getLandlordInformation(searchForm) {
	getProperties().then(function(properties){
		Object.keys(properties).forEach(function(propertyID){
			geocoder.geocode({'placeId': properties[propertyID].placeID}, function(results, status) {
         		if (status === 'OK') {
            		if (results[0]) {
              			var marker = new google.maps.Marker({ map: map, position: results[0].geometry.location });
            			console.log(marker);
					}
          		}
        	});
		});
	});  

    setFilters();
    // CLEAR MARKERS ON MAP
    deleteMarkers();

    // CLEAR PROPERTIES ARRAY
    properties = [];
    // TODO: Stuff	

    //TODO: PUT RETRIEVED DATA INTO PROPERTIES ARRAY
    properties = [{ title: "property 5", lat: 34.4133, lng: -119.8610 },
        { title: "property 6", lat: 34.4139, lng: -119.8612 },
        { title: "property 7", lat: 34.4131, lng: -119.8614 },
        { title: "property 8", lat: 34.4132, lng: -119.8616 },
        { title: "property 9", lat: 34.4134, lng: -119.8619 }]  // FAKE RETRIEVED DATA

    // SHOW NEW MARKERS
    showMarkers();

    //RETREIVE YEARLY RATINGS 
	// I think this might be better on landlord page
    //landlordRatings = [ [2010, 3], [2011, 4], [2012, 5], [2013, 2], [2014, 3], [2015, 4], [2016, 4], [2017, 4.5], [2018, 4.3], [2019, 4.8] ];

    //SHOW REVIEWS ELEMENTS
    //var reviewHTML = Mustache.render(reviewTemplate, reviewTest);
    // Dummy reviews
    /*for(i = 0; i < 5; i++){
        document.getElementById("reviews").innerHTML += reviewHTML;
    }*/
    //CREATE GRAPH 
    /*document.getElementById("graph").hidden = false;
    document.getElementById("ratingsGraph").hidden = false;
    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawRatingsGraph);*/
    //PLOT DATA
    //drawRatingsGraph();
}

function setFilters(){
    searchInput = document.getElementById("search-input").value;

    if(document.getElementById("min-rent").value != ''){
        minRent = document.getElementById("min-rent").value;
    }
    if(document.getElementById("max-rent").value != ''){
        maxRent = document.getElementById("max-rent").value;
    }
    if(document.getElementById("min-occupants").value != ''){
        minOccupants = document.getElementById("min-occupants").value;
    }
    if(document.getElementById("max-occupants").value != ''){
        maxOccupants = document.getElementById("max-occupants").value;
    }
    console.log("min rent " + minRent + " max rent " + maxRent + " min occupants " + minOccupants + " max occupants " + maxOccupants);
}

/*function validate() {
    if (searchInput === '') {
        alert('Please Input Landlord You Want To Search');
        return false;
    }
    else {
        return true;
    }
}*/

function myMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 16,
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
            title: properties[i].title,
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

/*function drawRatingsGraph() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Year');
    data.addColumn('number', 'Rating');
    data.addRows(landlordRatings);

    var options = {
        title: "Landlord Ratings Over Time",
        format: 'none',
        legend: 'none',
        hAxis: {
            title: 'Year'
        },
        vAxis: {
            title: 'Rating'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('ratingsGraph'));

    chart.draw(data, options);
}*/

// Obtain the type (landlord or property) and the value (name of landlord or address of property) that was clicked from the URL
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("'");

// The variable 'type' will either be 'landlord' or 'property'
var type = queries[1];

// The variable 'value' will either be the name of a landlord or the address of a property, as described by the 'type' variable.
var value = queries[3];

$(document).ready(function () {
    myMap();
});

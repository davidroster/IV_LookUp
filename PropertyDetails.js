/*var units = [
    { unit: 'A', rent: '$1500', deposit: '$1500', bed: 1, bath: 1, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
    { unit: 'B', rent: '$1500', deposit: '$1500', bed: 1, bath: 1, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
    { unit: 'C', rent: '$3000', deposit: '$3000', bed: 2, bath: 2, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
    { unit: 'D', rent: '$3000', deposit: '$3000', bed: 2, bath: 2, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
    { unit: 'E', rent: '$3000', deposit: '$3000', bed: 2, bath: 2, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
]*/

// Function to generate list of landlords with all of their info
function GenerateUnitList(units) {
    // Get original list item to clone
    var original = document.getElementById('unit-item');
    
    // Iterate unit list, clone a list item for each, set its info, and append to list
    for (var i = 0; i < units.length; i++) {

        // Clone original list item and give it a unique id
        var clone = original.cloneNode(true);
        clone.id = 'unit-item-' + i;

        // Fill the name and logo
        clone.querySelectorAll('[id="unit-num"]')[0].innerHTML = 'Unit ' + units[i].unit;
        clone.querySelectorAll('[id="logo"]')[0].src = units[i].imageURL;

        // Fill the rating, link to details page, phone number, address, and website link
		// TODO: Fix placeholders
        clone.querySelectorAll('[id="unit-rent"]')[0].innerHTML = 'Monthly Rent: ' + units[i].rent;
        clone.querySelectorAll('[id="unit-deposit"]')[0].innerHTML = 'Deposit: ' + '$2000';
        clone.querySelectorAll('[id="unit-bed-bath"]')[0].innerHTML = '3' + ' bed, ' + '2' + ' bath ';
        clone.querySelectorAll('[id="unit-utilities"]')[0].innerHTML = 'Utilities Included: ' + 'W/T, cable, wifi';
        clone.querySelectorAll('[id="unit-parking"]')[0].innerHTML = 'Parking: ' + '$300';
        //clone.querySelectorAll('[id="view-properties-on-map"]')[0].href = "map.html?type='property'&value='" + units[i].propertyID + "'";

        // Append new list item to list
        original.parentNode.appendChild(clone);
    }

    // Remove the original (dummy) list item
    original.remove();
}

// Obtain the address that was clicked from the URL
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("'");
var placeID = queries[1];

// ---------- INSERT FIREBASE CODE HERE ----------
// Get all landlord information using the address of the property (addr)

document.addEventListener("DOMContentLoaded", function (event) {

    // Generate list of units
    getProperties().then(function(properties){
		var units = [];
		var reviewIDs = [];
		var landlord;
		var ids = Object.keys(properties);
		for (var i = 0; i < ids.length; ++i) {
			if (properties[ids[i]].placeID == placeID) {
				document.getElementById('property-name').innerHTML = properties[ids[i]].address;	
				landlord = properties[ids[i]].landlord;
				units.push(properties[ids[i]]);
				if ('reviews' in properties[ids[i]]) {
					var propReviewIDs = Object.keys(properties[ids[i]].reviews);
					reviewIDs = reviewIDs.concat(propReviewIDs);
				}
			}
		}
		GenerateUnitList(units);
		generateReviewList(reviewIDs);
		getPlaceRatings(placeID).then(function(ratings){
			generateRatingsDistribution(ratings);
		});
	});

    // Generate list of reviews
    //GenerateReviewList(PropertyReviews);

    // Set the landlord name
    
    // SET RENT, DEPOSIT, BD/BR, UTILITIES, PARKING
    // SET reviews LIST

});

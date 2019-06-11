// Function to generate list of landlords with all of their info
function generateLandlordList(landlordIDs) {

    // Get original list item to clone
    var original = document.getElementById('landlord-item');
	var originalParent = original.parentNode;
    var clones = {};

    // Iterate landlord list, clone a list item for each, set its info, and append to list
    for (var i = 0; i < landlordIDs.length; i++) {
		// Clone original list item and give it a unique id
		clones[landlordIDs[i]] = original.cloneNode(true);
		clones[landlordIDs[i]].id = 'landlord-item-' + i;
		getLandlord(landlordIDs[i]).then(function(landlord){
        	var clone = clones[landlord.id];

        	// Fill the name and logo
        	clone.querySelectorAll('[id="landlord-name"]')[0].innerHTML = landlord.name;
        	clone.querySelectorAll('[id="logo"]')[0].src = landlord.iconURL;

        	// Fill stars based on rating
        	getLandlordRatings(landlord.id).then(function(ratings){
        		var sum = 0;
				for (k = 0; k < ratings.length; ++k) {
					sum += ratings[k];
				}
				var rating = sum / ratings.length;
				for (j = 0; j < 5; j++) {
            		var star = '[id="star' + j + '"]';
            		if (j+1 <= rating) {
                		clone.querySelectorAll(star)[0].classList.remove('btn-default');
                		clone.querySelectorAll(star)[0].classList.remove('btn-grey');
                		clone.querySelectorAll(star)[0].classList.add('btn-warning');
            		}
            		else {
                		clone.querySelectorAll(star)[0].classList.add('btn-default');
                		clone.querySelectorAll(star)[0].classList.add('btn-grey');
                		clone.querySelectorAll(star)[0].classList.remove('btn-warning');
            		}
        		}
				clone.querySelectorAll('[id="avg-rating"]')[0].innerHTML = ratings.length == 0 ? "None" : rating.toFixed(2); // Truncate for styling
			});

        	// Fill the rating, phone number, address, and website link
        	clone.querySelectorAll('[id="link-to-details"]')[0].href = "LandlordDetails.html?landlord_id='" + landlord.id + "'";
        	clone.querySelectorAll('[id="landlord-phone-address"]')[0].innerHTML = landlord.phone + ' · ' + landlord.address;
        	clone.querySelectorAll('[id="go-to-website"]')[0].href = landlord.website;

        	// Append new list item to list
        	originalParent.appendChild(clone);
		});
    }

    // Remove the original (dummy) list item
    original.remove();
}

// Generate Landlord List
document.addEventListener("DOMContentLoaded", function(event) {
	getLandlords().then(function(landlordIDs){
		generateLandlordList(landlordIDs);
	});
});

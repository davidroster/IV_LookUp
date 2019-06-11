function monthOf(date) {
    var monthNum = date.getMonth() + 1;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return monthNames[monthNum];
}

function stringForTimeSince(date) {
	var curr_date = new Date();
	// Find out approximately how long ago the review was posted
    var diff_year = curr_date.getFullYear() - date.getFullYear();
    if (diff_year == 1) {
       return '1 Year Ago';
    }
    else if (diff_year > 1) {
       return diff_year + ' Years Ago';
    }
    else {  // Year difference is 0
        var diff_month = curr_date.getMonth() - date.getMonth();
        if (diff_month == 1) {
            return '1 Month Ago';
        }
        else if (diff_month > 0) {
            return diff_month + ' Months Ago';
        }
        else { // Month difference is 0
            var diff_day = curr_date.getDate() - date.getDate();
            if (diff_day == 1) {
                return '1 Day Ago';
            }
            else if (diff_day > 0) {
                return diff_day + ' Days Ago';
            }
            else { // Day difference is 0
                return 'Today';
            }
        }
    }
}

function ratingDistribution(ratings) {
	var counts = [0, 0, 0, 0, 0];
	for (var i = 0; i < ratings.length; ++i) {
		counts[ratings[i]-1]++;
	}
	return counts;
}

// Function to generate side scrolling list of properties
function generatePropertyList(propertyIDs) {

    // Get original carousel item (group of 4 properties that is shown at one time) to clone
    var original_carousel_item = document.getElementById('carousel-item');

    // Get original property item (one single carousel item, consisting of a photo and a caption) to clone
    var original_property_item = original_carousel_item.querySelectorAll('[id="property-item"]')[0];

    // Get original indicator (small lines at the bottom of carousel indicating which page you're on) to clone
    var original_indicator = document.getElementById('indicator0');

    // Declare clones
    var clone_carousel_item;
    var clone_property_item;
    var prev_property_item; // used to append next child
    var clone_indicator;

	// We load async, so keep track of what goes where
	var clone_property_items = {};

    // Iterate properties list, creating a new property item each iteration and one carousel item every 4 iterations
    for (var i = 0; i < propertyIDs.length; i++) {
        if (i % 4 == 0) { // If i is a multiple of 4, create a new carousel item
            // Clone carousel item and give it unique id
            clone_carousel_item = original_carousel_item.cloneNode(true);
            clone_carousel_item.id = "carousel-item-" + i / 4;

            // Make clone_property_item equal to the one existing property item in clone_carousel_item
            clone_property_item = clone_carousel_item.querySelectorAll('[id="property-item"]')[0];

            // Every time a new carousel item is created, add an indicator showing a new page
            if (i != 0) {
                // Clone original indicator, set some attributes, and give it a unique id
                clone_indicator = original_indicator.cloneNode(true);
                clone_indicator.classList.remove('active');
                clone_indicator.setAttribute('data-slide-to', i / 4);
                clone_indicator.id = 'indicator' + i / 4;

                // Append new indicator to list of indicators
                original_indicator.parentNode.appendChild(clone_indicator);

                // Remove active class from carousel item
                clone_carousel_item.classList.remove('active');
            }
        }
        else { // If i is not a multiple of 4, create a new clone of the original property item
            clone_property_item = original_property_item.cloneNode(true);
        }

        // Give the new property item a unique id, set the image, and set the address
        clone_property_items[propertyIDs[i]] = clone_property_item;
		clone_property_item.id = "property-item-" + i;	
		getProperty(propertyIDs[i]).then(function(property) {	
        	clone_property_items[property.propertyID].querySelectorAll('[id="property-thumbnail"]')[0].src = property.imageURL;
        	clone_property_items[property.propertyID].querySelectorAll('[id="property-caption"]')[0].innerHTML = property.address;
			clone_property_items[property.propertyID].querySelectorAll('[id="property-link"]')[0].href = "PropertyDetails.html?id='" + property.propertyID + "'";	
		});

        if (i % 4 == 0) { // If i is a multiple of 4, append the new carousel item
            original_carousel_item.parentNode.appendChild(clone_carousel_item);
        }
        else { // If i is not a multiple of 4, append the new property item within the current carousel item
            prev_property_item.parentNode.appendChild(clone_property_item);
        }

        // Set the previous property item to be the current one, for the next iteration
        prev_property_item = clone_property_item;
    }

    // Remove the original (dummy) carousel item
    original_carousel_item.remove();
}

// Function to generate list of reviews 
function generateReviewList(landlordID, reviewIDs) {

    // Get original rating to clone
    var original_review = document.getElementById('original-review');
	var original_parent = original_review.parentNode;
	var clones = {};

    // Iterate through reviews list and create a new list item for each
    for (var i = 0; i < reviewIDs.length; i++) {

        // Clone original list item and give it a unique id
        clone = original_review.cloneNode(true);
        clone.id = 'review' + i;
		clones[reviewIDs[i]] = clone;

		getReview(reviewIDs[i]).then(function(review){
        	// Set the name of the person who posted the review
        	clones[review.reviewID].querySelectorAll('[id="review-block-name"]')[0].innerHTML = '<a href="#">' + review.author + '<\a>';

       		var date = new Date(review.date);
			// Split date posted into day, month, year, and then combine them into a string
			var diffStr = stringForTimeSince(date); 
			var dateStr = monthOf(date) + ' ' + date.getDate() + ', ' + date.getFullYear();
        	// Set date posted and time since posted
        	clones[review.reviewID].querySelectorAll('[id="review-block-date"]')[0].innerHTML = dateStr + '<br />' + diffStr;

        	// Set stars based on rating
        	for (j = 0; j < 5; j++) {
            	var star = '[id="star' + j + '"]';
            	if (j + 1 <= review.rating) {
                	clones[review.reviewID].querySelectorAll(star)[0].classList.remove('btn-default');
                	clones[review.reviewID].querySelectorAll(star)[0].classList.remove('btn-grey');
                	clones[review.reviewID].querySelectorAll(star)[0].classList.add('btn-warning');
            	}
            	else {
                	clones[review.reviewID].querySelectorAll(star)[0].classList.add('btn-default');
                	clones[review.reviewID].querySelectorAll(star)[0].classList.add('btn-grey');
                	clones[review.reviewID].querySelectorAll(star)[0].classList.remove('btn-warning');
            	}
        	}

        	// Fill in the title and the review itself
        	clones[review.reviewID].querySelectorAll('[id="review-block-title"]')[0].innerHTML = '<strong>' + review.title + '<\strong>';
        	clones[review.reviewID].querySelectorAll('[id="review-block-description"]')[0].innerHTML = review.text;

        	// Append new review to the list
        	original_parent.appendChild(clones[review.reviewID]);

        	// Append a thin line to the bottom of the review
        	var hr = document.createElement('hr');
        	original_parent.appendChild(hr);
		});
    }

    // Calculate average rating and set it
	getLandlordRatings(landlordID).then(function(ratings){
    	var dist = ratingDistribution(ratings);
		var sum = 0;
		for (var i = 0; i < ratings.length; ++i) {
			sum += ratings[i];
		}
		var rating_avg = Math.round(sum / reviews.length * 10) / 10; //?
    	document.getElementById('rating-num').innerHTML = rating_avg;

    	// Set stars based on average rating
    	for (j = 0; j < 5; j++) {
        	var star = 'avg_star' + j;
        	if (j + 1 <= rating_avg) {
            	document.getElementById(star).classList.remove('btn-default');
            	document.getElementById(star).classList.remove('btn-grey');
            	document.getElementById(star).classList.add('btn-warning');
        	}
        	else {
            	document.getElementById(star).classList.add('btn-default');
            	document.getElementById(star).classList.add('btn-grey');
            	document.getElementById(star).classList.remove('btn-warning');
        	}
    	}

		var bars = ["num-ones-bar", "num-twos-bar", "num-threes-bar", "num-fours-bar", "num-fives-bar"];
		var nums = ["num-ones", "num-twos", "num-threes", "num-fours", "num-fives"];

    	for (var i = 0; i < 5; ++i) {
			var percent_num = Math.round(100 * dist[i] / reviews.length);
    		// Set progress bars based on rating percentages
    		document.getElementById(bars[i]).setAttribute("style", 'width: ' + percent_num + '%;');
    		// Set rating percentages
    		document.getElementById(nums[i]).innerHTML = percent_num + '%';
		}
	});

    // Remove original (dummy) review
    original_review.remove();
}

// Obtain the landlord that was clicked from the URL
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("'");
landlord_id = queries[1];

// ---------- INSERT FIREBASE CODE HERE ----------
// Get all landlord information using the name

document.addEventListener("DOMContentLoaded", function (event) {

    // Generate list of properties
    //GeneratePropertyList(properties);
	getLandlord(landlord_id).then(function(landlord){
		// Set the landlord name
    	document.getElementById('landlord-name').innerHTML = landlord.name;
    	document.getElementById('landlord-name').innerHTML = landlord_name;
    	// SET INFORMATION SECTION
    	document.getElementById('view-properties-on-map').href = "map.html?type='landlord'&value='" + landlord_name + "'";
    	// SET properties LIST
    	// SET reviews LIST	
			
		if ('properties' in landlord) {
			generatePropertyList(Object.keys(landlord.properties));
		} else {
			generatePropertyList([]);
		}
	});

    // Generate list of reviews
    //GenerateReviewList(reviews); 
	getLandlordReviews(landlord_id).then(function(reviewIDs){
		generateReviewList(landlord_id, reviewIDs);
	});
});

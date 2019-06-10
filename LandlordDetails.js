// Test data. Input for GeneratePropertyList() must be in this format
var properties = [
    { address: '6694 Picasso', image: 'house1.jpg' },
    { address: '6710 Trigo', image: 'house2.jpg' },
    { address: '6753 Abrego', image: 'house3.jpg' },
    { address: '6763 Abrego', image: 'house4.jpg' },
    { address: '776 Camino del Sur', image: 'house5.jpg' },
    { address: '6519 Cervantes', image: 'house6.jpg' },
    { address: '6761 Del Playa', image: 'house7.jpg' },
    { address: '750 Embarcadero del Mar', image: 'house8.jpg' },
    { address: '760 Embarcadero del Mar', image: 'house9.jpg' },
    { address: '755 Embarcadero del Norte', image: 'house10.jpg' }
];

// Test data. Input for GenerateReviewList() must be in this format
var LandlordReviews = [
    { name: 'Kari', date: new Date(1997, 5, 5), rating: 5, title: 'I love tacos', review: 'Tacos are just great, like you can have steak, carnitas, or chicken, and you can put whatever you want on them. Like you can throw some cheese, pico de gallo, onions, and cilantro on that bitch, and its delicious.' },
    { name: 'Scotty', date: new Date(1995, 0, 9), rating: 5, title: 'Well I love icecream', review: 'I think icecream is the best. There are so many flavors, like chocolate, strawberry, vanilla, pistachio, caramel, and my personal fave, half-baked. You can have ice cream by itself or in a cake, and itll be amazeballs!!' },
    { name: 'Ahsan', date: new Date(1996, 11, 22), rating: 4, title: 'Chocolate chip cookies are the best tho', review: 'They are so simple, but chocolate chip cookies are always a crowd favorite. You can celebrate any occasion and eat them, or cry after a breakup and eat them. Theyre hella versitile and thats why theyre the best.' }
]

// Function to generate side scrolling list of properties
function GeneratePropertyList(properties) {

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

    // Iterate properties list, creating a new property item each iteration and one carousel item every 4 iterations
    for (var i = 0; i < properties.length; i++) {

        // If i is a multiple of 4, create a new carousel item
        if (i % 4 == 0) {

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

        // If i is not a multiple of 4, create a new clone of the original property item
        else {
            clone_property_item = original_property_item.cloneNode(true);
        }

        // Give the new property item a unique id, set the image, and set the address
        clone_property_item.id = "property-item-" + i;
        clone_property_item.querySelectorAll('[id="property-thumbnail"]')[0].src = properties[i].image;
        clone_property_item.querySelectorAll('[id="property-caption"]')[0].innerHTML = properties[i].address;
        clone_property_item.querySelectorAll('[id="property-link"]')[0].href = "PropertyDetails.html?addr='" + properties[i].address + "'";

        // If i is a multiple of 4, append the new carousel item
        if (i % 4 == 0) {
            original_carousel_item.parentNode.appendChild(clone_carousel_item);
        }
        // If i is not a multiple of 4, append the new property item within the current carousel item
        else {
            prev_property_item.parentNode.appendChild(clone_property_item);
        }

        // Set the previous property item to be the current one, for the next iteration
        prev_property_item = clone_property_item;
    }

    // Remove the original (dummy) carousel item
    original_carousel_item.remove();
}

// Function to generate list of reviews 
function GenerateReviewList(reviews) {

    // Get original rating to clone
    var original_review = document.getElementById('original-review');

    // A bunch of variables used to calculate the date from the Date object
    var date = null;
    var day = 0;
    var month_num = 0;
    var month_str = '';
    var year = 0;
    var date_str = '';

    // A bunch of variables used to calculate the days since the review was written
    var curr_date = new Date();
    var curr_day = curr_date.getDate();
    var curr_month = curr_date.getMonth() + 1;
    var curr_year = curr_date.getFullYear();
    var diff_year = 0;
    var diff_month = 0;
    var diff_day = 0;
    var diff_str = '';

    // Variables used to calculate the average rating and rating breakdown
    var rating_sum = 0;
    var num_ones = 0;
    var num_twos = 0;
    var num_threes = 0;
    var num_fours = 0;
    var num_fives = 0;


    // Iterate through reviews list and create a new list item for each
    for (var i = 0; i < reviews.length; i++) {

        // Clone original list item and give it a unique id
        clone = original_review.cloneNode(true);
        clone.id = 'review' + i;

        // Set the name of the person who posted the review
        clone.querySelectorAll('[id="review-block-name"]')[0].innerHTML = '<a href="#">' + reviews[i].name + '<\a>';

        // Split date posted into day, month, year, and then combine them into a string
        date = reviews[i].date;
        day = date.getDate();
        month_num = date.getMonth() + 1;
        switch (month_num) {
            case 1:
                month_str = 'January';
                break;
            case 2:
                month_str = 'February';
                break;
            case 3:
                month_str = 'March';
                break;
            case 4:
                month_str = 'April';
                break;
            case 5:
                month_str = 'May';
                break;
            case 6:
                month_str = 'June';
                break;
            case 7:
                month_str = 'July';
                break;
            case 8:
                month_str = 'August';
                break;
            case 9:
                month_str = 'September';
                break;
            case 10:
                month_str = 'October';
                break;
            case 11:
                month_str = 'November';
                break;
            case 12:
                month_str = 'December';
                break;
        }
        year = date.getFullYear();
        date_str = month_str + ' ' + day + ', ' + year;

        // Find out approximately how long ago the review was posted
        if (date == curr_date) {
            diff_str = 'Today';
        }
        else {
            diff_year = curr_year - year;
            if (diff_year == 1) {
                diff_str = '1 Year Ago';
            }
            else if (diff_year != 0) {
                diff_str = diff_year + ' Years Ago';
            }
            else {  // Year difference is 0
                diff_month = curr_month - month_num;
                if (diff_month == 1) {
                    diff_str = '1 Month Ago';
                }
                else if (diff_month != 0) {
                    diff_str = diff_month + ' Months Ago';
                }
                else { // Month difference is 0
                    diff_day = curr_day - day;
                    if (diff_day == 1) {
                        diff_str = '1 Day Ago';
                    }
                    else if (diff_day != 0) {
                        diff_str = diff_day + ' Days Ago';
                    }
                    else { // Day difference is 0
                        diff_str = 'Today';
                    }
                }
            }
        }

        // Set date posted and time since posted
        clone.querySelectorAll('[id="review-block-date"]')[0].innerHTML = date_str + '<br />' + diff_str;

        // Add rating to rating_sum to find the average later, and keep track of what the rating was
        rating = reviews[i].rating;
        rating_sum += rating;
        switch (rating) {
            case 1:
                num_ones++;
                break;
            case 2:
                num_twos++;
                break;
            case 3:
                num_threes++;
                break;
            case 4:
                num_fours++;
                break;
            case 5:
                num_fives++;
                break;
        }

        // Set stars based on rating
        for (j = 0; j < 5; j++) {
            var star = '[id="star' + j + '"]';
            if (j + 1 <= rating) {
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

        // Fill in the title and the review itself
        clone.querySelectorAll('[id="review-block-title"]')[0].innerHTML = '<strong>' + reviews[i].title + '<\strong>';
        clone.querySelectorAll('[id="review-block-description"]')[0].innerHTML = reviews[i].review;

        // Append new review to the list
        original_review.parentNode.appendChild(clone);

        // Append a thin line to the bottom of the review
        var hr = document.createElement('hr');
        original_review.parentNode.appendChild(hr);
    }

    // Calculate average rating and set it
    var rating_avg = Math.round(rating_sum / reviews.length * 10) / 10;
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

    // Find percentages of each rating
    var percent_fives = Math.round(100 * num_fives / reviews.length);
    var percent_fours = Math.round(100 * num_fours / reviews.length);
    var percent_threes = Math.round(100 * num_threes / reviews.length);
    var percent_twos = Math.round(100 * num_twos / reviews.length);
    var percent_ones = Math.round(100 * num_ones / reviews.length);

    // Set progress bars based on rating percentages
    document.getElementById("num-fives-bar").setAttribute("style", 'width: ' + percent_fives + '%;');
    document.getElementById("num-fours-bar").setAttribute("style", 'width: ' + percent_fours + '%;');
    document.getElementById("num-threes-bar").setAttribute("style", 'width: ' + percent_threes + '%;');
    document.getElementById("num-twos-bar").setAttribute("style", 'width: ' + percent_twos + '%;');
    document.getElementById("num-ones-bar").setAttribute("style", 'width: ' + percent_ones + '%;');

    // Set rating percentages
    document.getElementById("num-fives").innerHTML = percent_fives + '%';
    document.getElementById("num-fours").innerHTML = percent_fours + '%';
    document.getElementById("num-threes").innerHTML = percent_threes + '%';
    document.getElementById("num-twos").innerHTML = percent_twos + '%';
    document.getElementById("num-ones").innerHTML = percent_ones + '%';

    // Remove original (dummy) review
    original_review.remove();
}

// Obtain the landlord that was clicked from the URL
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("'");
landlord_name = queries[1];

// ---------- INSERT FIREBASE CODE HERE ----------
// Get all landlord information using the name

document.addEventListener("DOMContentLoaded", function (event) {

    // Generate list of properties
    GeneratePropertyList(properties);

    // Generate list of reviews
    GenerateReviewList(LandlordReviews);

    // Set the landlord name
    document.getElementById('landlord-name').innerHTML = landlord_name;
    // SET INFORMATION SECTION
    document.getElementById('view-properties-on-map').href = "map.html?type='landlord'&value='" + landlord_name + "'";
    // SET properties LIST
    // SET reviews LIST

});




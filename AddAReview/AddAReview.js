var rating = 3;

function setStars(stars) {
	rating = stars;
	// Set stars based on rating
	for (j = 0; j < 5; j++) {
    	var star = document.getElementById('star' + j);
        if (j + 1 <= stars) {
        	star.classList.remove('btn-default');
            star.classList.remove('btn-grey');
            star.classList.add('btn-warning');
        }
        else {
             star.classList.add('btn-default');
             star.classList.add('btn-grey');
             star.classList.remove('btn-warning');
        }
    }
}

function callAddReview() {
  var sel = document.getElementById("locationInput");
  var propertyID = sel.options[sel.selectedIndex].value;
  var author = $("input[name='authorInput']").val();
  var title = $("input[name='nameInput']").val();
  var review = document.getElementById('reviewInput').value;

  if (author && title && review) {
  	addReview(propertyID, author, rating, title, review);

  	document.getElementById('authorInput').value = "";
  	document.getElementById('nameInput').value = "";
  	document.getElementById('reviewInput').value = "";
  	setStars(3);

     $('#addWarning').hide();
     $('#addSuccess').show();
  } else {
     $('#addWarning').show();
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
	$('#addSuccess').hide();
	$('#addWarning').hide();
		
	getProperties().then(function(properties){
		var select = document.getElementById("locationInput");
		var inner_string = '';
		var keys = Object.keys(properties);
		for (var i = 0; i < keys.length; i++) {
    		inner_string += '<option value="';
			inner_string += properties[keys[i]].propertyID;
			inner_string += '">';
    		inner_string += properties[keys[i]].address + " #" + properties[keys[i]].unit;
    		inner_string += '</option>';
		}
		select.innerHTML = inner_string;	
	});
});

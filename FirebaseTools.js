var rootRef = firebase.database().ref();
var landlordIDsRef = rootRef.child('LANDLORD_IDS');
var landlordsRef = rootRef.child('LANDLORDS');
var propertyIDsRef = rootRef.child('PROPERTY_IDS');
var propertiesRef = rootRef.child('PROPERTIES');
var reviewsRef = rootRef.child('REVIEWS');

function addLandlord(landlordID, name, website, phone, address, iconURL) {
	var landlord = {
		id: landlordID,
		name: name,
		website: website,
		phone: phone,
		address: address,
		iconURL: iconURL,
	};

	landlordIDsRef.child(landlordID).set(landlordID);
	landlordsRef.child(landlordID).set(landlord);
}

function removeLandlord(landlordID) {
	landlordsRef.remove(landlordID);
}

async function getLandlords() {
	return new Promise(function(resolve, reject) {
			landlordIDsRef.once('value').then(function(snapshot) {
				var landlordIDs = snapshot.val();
				var ids = [];
				for (var landlordID in landlordIDs) {
					ids.push(landlordID);
				}
				resolve(ids);
			});
    	}
	);
}

async function getLandlord(landlordID) {
	return new Promise(function(resolve, reject) {
			landlordsRef.child(landlordID).once('value').then(function(snapshot) {
				resolve(snapshot.val());
			})
	});
}

async function getLandlordRatings(landlordID) {
	return new Promise(function(resolve, reject) {
		getLandlord(landlordID).then(function(landlord) {
			var propertyPromises = [];
			if ('properties' in landlord) {
				Object.keys(landlord.properties).forEach(function(propertyID){	
					propertyPromises.push(new Promise(function(resolve, reject){
						getProperty(propertyID).then(function(property){
							var reviewPromises = [];
							if ('reviews' in property) {
								Object.keys(property.reviews).forEach(function(reviewID) {
									reviewPromises.push(new Promise(function(resolve, reject) {
										getReview(reviewID).then(function(review) {
											resolve(review.rating);
										});
									}));
								});
								Promise.all(reviewPromises).then(function(ratings){
									resolve(ratings.flat());
								});
							} else {
								resolve([]);
							}
						});
					}));
				});
				Promise.all(propertyPromises).then(function(ratings){
					resolve(ratings.flat());
				});
			} else {
				resolve([]);
			}
		});
	});
}

async function getLandlordReviews(landlordID) {
	return new Promise(function(resolve, reject) {
		getLandlord(landlordID).then(function(landlord) {
			var propertyPromises = [];
			if ('properties' in landlord) {
				Object.keys(landlord.properties).forEach(function(propertyID){	
					propertyPromises.push(new Promise(function(resolve, reject){
						getProperty(propertyID).then(function(property){
							var reviewPromises = [];
							if ('reviews' in property) {
								resolve(Object.keys(property.reviews));
							} else {
								resolve([]);
							}
						});
					}));
				});
				Promise.all(propertyPromises).then(function(ratings){
					resolve(ratings.flat());
				});
			} else {
				resolve([]);
			}
		});
	});
}

function addProperty(placeID, address, unit, landlordID, occupancy, squareFoot, totalRent, imageURL) {
	var propertyID = placeID;
	if (unit != "") {
		propertyID = placeID + "^" + unit;
	}
	var property = {
		propertyID: propertyID,
		placeID: placeID,
		address: address,
		unit: unit,
		landlord: landlordID,
		occupancy: occupancy,
		squareFoot: squareFoot,
		totalRent: totalRent,
		imageURL: imageURL,
	}

	landlordsRef.child(landlordID).child("properties").child(propertyID).set(propertyID);
	propertyIDsRef.child(propertyID).set(propertyID);
	propertiesRef.child(propertyID).set(property);	
}

function removeProperty(propertyID) {
    propertyIDsRef.remove(propertyID);
    propertiesRef.remove(propertyID);
}

async function getProperties() {
    return new Promise(function(resolve, reject) {
		propertiesRef.once('value').then(function(snapshot) {
			var IDs = [];
			snapshot.forEach(function(childSnapshot) {
				IDs.push(childSnapshot.val());
			});
			resolve(IDs);
		});
	});
}

async function getProperty(propertyID) {
    return new Promise(function(resolve, reject) {
		propertiesRef.child(propertyID).once('value').then(function(snapshot) {
        	resolve(snapshot.val());
    	});
	});
}
/*
addReview('ChIJ28tFSWY_6YARmDq2aaxRltI^2', 'Kari', 5, 'I love tacos', 'Tacos are just great, like you can have steak, carnitas, or chicken, and you can put whatever you want on them. Like you can throw some cheese, pico de gallo, onions, and cilantro on that bitch, and its delicious.');
addReview('ChIJIY7Ps2c_6YARZfhFuYdUKv0^3', 'Scotty', 5, 'Well I love ice cream', 'I think ice cream is the best. There are so many flavors, like chocolate, strawberry, vanilla, pistachio, caramel, and my personal fave, half-baked. You can have ice cream by itself or in a cake, and itll be amazing!!');
addReview('ChIJkc0RQkM_6YARnFuOziYhc9k^2', 'Ahsan', 4, 'Chocolate chip cookies are the best tho', 'They are so simple, but chocolate chip cookies are always a crowd favorite. You can celebrate any occasion and eat them, or cry after a breakup and eat them. Theyre hella versitile and thats why theyre the best.');
*/
function addReview(propertyID, author, rating, title, text) {
	var date = Date.now();
	var reviewID = propertyID + '_' + date;
	
	var review = {
			reviewID: reviewID,
			propertyID: propertyID,
			author: author,
			rating: rating,
			title: title,
			text: text,
			date: date,
	};

	propertiesRef.child(propertyID).child('reviews').child(reviewID).set(reviewID);
	reviewsRef.child(reviewID).set(review);
}

function removeReviewByID(reviewID) {
	reviewsRef.child(reviewID).remove();
}

async function getReview(reviewID) {
	return new Promise(function(resolve, reject) {
		reviewsRef.child(reviewID).once('value').then(function(snapshot) {
        	resolve(snapshot.val());
    	});
	});
}
function callAddReview() {
  var address = $("input[name='locationInput']:selected").val();
  var rating_string = $("input[name='rating']:checked").val();
  rating = ParseInt(rating_string, 10)
  var name = $("input[name='nameInput']").val();
  var date = $("input[name='dateInput']").val()
  var review = $("input[name='reviewInput']").val();

  AddReview(address, rating, name, date, review);
}

function AddReview(address, rating, name, date, review) {
  var currentReview = {
    address: address,
    rating: rating,
    name: name,
    date: date,
    review: review
  }

}

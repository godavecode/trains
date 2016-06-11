

// Create Firebase link
var url ='https://trainstime.firebaseio.com/'
var dataRef = new Firebase(url);

// Setting Initial Values
var trainName = "";
var trainDestination = "";
var tstartTime= 0;
var ftrainFrequency= 0;


// Submit Button Click
$("#runTrain").on("click", function() {
	// Grabbing new train input from form.
	// Dont forget to provide initial data to your Firebase database.
	trainName = $('#trainInput').val().trim();
	trainDestination = $('#destinationInput').val().trim();
	tstartTime = $('#tstartInput').val().trim();
	trainFrequency = $('#frequencyInput').val().trim();
	
	// Code for the push
	dataRef.push({
		trainName: trainName,
		trainDestination: trainDestination,
		tstartTime: tstartTime,
		trainFrequency: trainFrequency
	})


	
});

//Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.on("child_added", function(childSnapshot) {
	// Log everything that's coming out of snapshot
	
	var trainName = childSnapshot.val().trainName;
	var trainDestination = childSnapshot.val().trainDestination;
	var tstartTime = childSnapshot.val().tstartTime;
	var trainFrequency = childSnapshot.val().trainFrequency;

	// Difference between the times
	var diffTime = (moment().diff(moment(tstartTime, "HH:mm"), "minutes"));
	console.log(diffTime);
	
	// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency;

	// Minute Until Train
	var tMinutesTillTrain = trainFrequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"))
	
	// full list of items to the well
		//$('#full-member-list').append("<div class='well'><span id='name'> "+childSnapshot.val().name+" </span><span id='email'> "+childSnapshot.val().email+" </span><span id='age'> "+childSnapshot.val().age+" </span><span id='comment'> "+childSnapshot.val().comment+" </span></div>")
    
    // Add new train information to the table
	$("#tableTrains > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td> " + trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});



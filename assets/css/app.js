
$(document).ready(function(){

	var config = {
    apiKey: "AIzaSyDYKpPE7-RaeC60WLIEYyoRQ-e8gMC3kRA",
    authDomain: "trainscheduler-df994.firebaseapp.com",
    databaseURL: "https://trainscheduler-df994.firebaseio.com",
    projectId: "trainscheduler-df994",
    storageBucket: "trainscheduler-df994.appspot.com",
    messagingSenderId: "852219257851"
  };
  firebase.initializeApp(config);

	var database = firebase.database();
	console.log(data);

	//1. Link to Firebase
	var trainData = new Firebase("https://www.gstatic.com/firebasejs/4.5.0/firebase.js");

	//2. Button for adding Trains
	$("#addTrainBtn").on("click",function(){

		//Grab user input and assign to variables
		var trainName = $("#trailNameInput").val().trim();
		var destination = $("destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("frequencyInput").val().trim();

		//Test for variables entered
		console.log(trainName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		//Create local "temporary" object for holding train data
		//Will push this to firebase
		var newTrain = {
			name:trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		// pushing trainInfo to Firebase
		trainData.ref().push(newTrain);
		//Alert to confirm Train addition
		alert("Train Added!");

		//clear text-boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequency").val("");

		//Prevents page from refreshing
		return false;
	});

	trainData.ref().on("child_added", function(snapshot){
		//Confirmation of Snapshot added
		console.log(snapshot.val());

		//assign firebase variables to snapshots.

		var firebaseName = snapshot.val().name;
		var firebaseLine = snapshot.val().destination;
		var firebaseLine = snapshot.val().trainInput;
		var firebaseLine = snapshot.val().frequency;

		var timeRemainder = moment().diff(moment.unix(TrainInput), "minutes")%frequency;
		var minutes = frequency - timeRemainder;
		var nextTrainArrival = moment().add(minutes,"m").format("hh:mm A");

		//Test for correct times and info
		console.log(timeRemainder);
		console.log(minutes);
		console.log(arrival);
		
		//Append train info to table on page
		$("#trainTable" > tbody").append("<tr><td>"+ name + "</td><td>" + destination + "</td><td>" + frequency + "mins" + arrival + "</td><td>" + minutes + "</td></tr>");
	})
	


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
	$("#addTrainBtn").on("click", function(){

		//Grab user input and assign to variables
		var trainName = $("#trailNameInput").val().trim();
		var lineName = $("#lineInput").val().trim();
		var destination = $("destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("frequencyInput").val().trim();

		//Test for variables entered
		console.log(trainName);
		console.log(lineName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		//Create local "temporary" object for holding train data
		//Will push this to firebase
		var newTrain = {
			name:trainName,
			line: lineName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		// pushing trainInfo to Firebase
		trainData.push(newTrain);

		//clear text-boxes
		$("#trainNameInput").val("");
		$("#lineInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequency").val("");

		//Prevents page from refreshing
		return false;
	});

	trainData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		//assign firebase variables to snapshots.

		var firebaseName = childSnapshot.val().name;
		var firebaseLine = childSnapshot.val().line;
		var firebaseLine = childSnapshot.val().destination;
		var firebaseLine = childSnapshot.val().trainTime;
		var firebaseLine = childSnapshot.val().frequency;

		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

		//Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		//Append train info to table on page
		$("#trainTable" > tbody").append("<tr><td>" + firebaseName + "</tr><td>" + firebaseLine + "<tr><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + "mins" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
	}
	}
}

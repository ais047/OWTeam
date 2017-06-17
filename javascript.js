var config = {
    apiKey: "AIzaSyCG6p9pu7DvLtnhiAIxhu1kJjJ_eAE7AYs",
    authDomain: "yefei-8e467.firebaseapp.com",
    databaseURL: "https://yefei-8e467.firebaseio.com",
    projectId: "yefei-8e467",
    storageBucket: "yefei-8e467.appspot.com",
    messagingSenderId: "371896912674"
  };
firebase.initializeApp(config);
var database = firebase.database();

$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();
  var empName = $("#name-input").val().trim();
  var empBNet = $("#bnet-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var empRate = $("#rate-input").val().trim();
  var empSR;
  var temp = empBNet.split("#");
  var empAvatar;
  temp = temp[0] + "-" + temp[1];

  $.ajax({
  	url: "https://owapi.net/api/v3/u/"+ temp +"/stats"
  }).done(function(response){
  	empSR = response.us.stats.competitive.overall_stats.comprank;
  	empAvatar = response.us.stats.competitive.overall_stats.avatar;
  });

  if(empName !== "" && empRole !== "" && empStart !== "" && empRate !== ""){
    if(moment(empStart, "X", true).isValid()){
      if($.isNumeric(empRate)){
        database.ref().push({
          name: empName,
          Bnet: empBNet,
          role: empRole,
          currentsr: empSR,
          avatar: empAvatar,
          start: empStart,
          rate: empRate
        });
      console.log("Employee added");
        $("#name-input").val("");
        $("#role-input").val("");
        $("#start-input").val("");
        $("#rate-input").val("");
      }
      else{
        console.log("Rate is not a number.")
        }
      }
    else{
      console.log("Date is wrong");
      }
  }
  else{
  console.log("Invalid input.");
  }
});

var sort = "name";


database.ref().orderByChild(sort).on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var role = snapshot.val().role;
  var currentsr = snapshot.val().currentsr;
  var avatar = snapshot.val().avatar;
  var start = snapshot.val().start;
  var rate = snapshot.val().rate;
  var startDate = moment.unix(start).format("dddd, MMMM Do YYYY");
  var now = moment();
  var monthsEmployed = now.diff(moment.unix(start, "X"), 'months');
  console.log(monthsEmployed);
  var totalBill = monthsEmployed * rate;
  console.log(snapshot.val());


  if(name !== undefined && role !== undefined && start !== undefined && rate !== undefined){
  
    $("#employee-table > tbody").append(
      "<tr><td>" + name + 
      "</td><td>" + role + 
      "</td><td>" + currentsr + 
      "</td><td>" + avatar + 
      "</td><td>" + rate + 
      "</td><td>" + totalBill +
      "</td><td><button class='rm'>x</button>");  
    }
});

$(document).on('click' , '.rm', function(){
  $(this).parent().parent().empty();
  

});

//compare prices of share rides
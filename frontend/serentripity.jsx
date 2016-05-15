var React = require("react");
var ReactDOM = require('react-dom');
var SearchBar = require('./components/searchBar');
var DirectionStore = require('./stores/directionStore');
var Directions = require('./components/directions');



document.addEventListener("DOMContentLoaded", function() {
  console.log("meredith and chris accept no responsibility for outcome.");
  ReactDOM.render(
    <div>
      <SearchBar/>
      <Directions/>
    </div>
    ,
    document.getElementById('content')
  );
//   var directionsService = new google.maps.DirectionsService();
//   var directionsRequest = {
//             origin: "35 Highland Ave Piedmont CA",
//             destination: "201 Harrison St San Francisco",
//             travelMode: google.maps.DirectionsTravelMode.WALKING,
//             unitSystem: google.maps.UnitSystem.METRIC
//   };
//   directionsService.route(directionsRequest, function (response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       var directions = response.routes[0].legs[0].steps;
//
//       // debugger;
//       var firstDirection = directions[0].instructions.split(" ").slice(0, 2);
//       firstDirection.push("for " + directions[0].distance.text);
//       firstDirection[1] = firstDirection[1].slice(3, firstDirection[1].length - 4);
//       var startInstruction = <li>{firstDirection.join(" ")}</li>;
//       var allDirections = response.routes[0].legs[0].steps.slice(1).map(function(step) {
//         var maneuver = step.maneuver.split("-").join(" ");
//         return (<li>{maneuver[0].toUpperCase() + maneuver.slice(1) + " for " + step.distance.text}</li>);
//       });
//       allDirections.unshift(startInstruction);
//   ReactDOM.render(
//     <div>
//       <ul>{allDirections}</ul>
//       <h1>Good Luck :)</h1>
//     </div>,
//   document.getElementById('content')
// );
//             //do work with response data
//             }
//             else{
//             }    //Error has occured
//         });
});

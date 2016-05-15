var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var DirectionActions = require('../actions/directionActions');


var SearchBar = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      street: "51 Prospect Rd",
      city: "Piedmont",
      state: "CA"
    };
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var origin = {result: [this.state.street, this.state.city, this.state.state].join(" ") };
    $.ajax({
      url: "api/directions",
      method: "get",
      data: origin,
      success: function(locations) {
        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
                  origin: locations[0],
                  destination: locations[1],
                  travelMode: google.maps.DirectionsTravelMode.WALKING,
                  unitSystem: google.maps.UnitSystem.METRIC
        };
        directionsService.route(directionsRequest, function (response, status){
          if (status == google.maps.DirectionsStatus.OK){
            var directions = response.routes[0].legs[0].steps;

            DirectionActions.sendDirections(directions);
            //put in directions store
          } else {
            debugger;
            //put error message in directions store
          }
        });

      }
    })


  //

  //   directionsService.route(directionsRequest, function (response, status) {
  //     if (status == google.maps.DirectionsStatus.OK) {
  //       var directions = response.routes[0].legs[0].steps;
  //       var firstDirection = directions[0].instructions.split(" ").slice(0, 2);
  //       firstDirection.push("for " + directions[0].distance.text);
  //       firstDirection[1] = firstDirection[1].slice(3, firstDirection[1].length - 4);
  //       var startInstruction = <li>{firstDirection.join(" ")}</li>;
  //       var allDirections = response.routes[0].legs[0].steps.slice(1).map(function(step) {
  //         var maneuver = step.maneuver.split("-").join(" ");
  //         return (<li>{maneuver[0].toUpperCase() + maneuver.slice(1) + " for " + step.distance.text}</li>);
  //       });
  //       allDirections.unshift(startInstruction);
  //     }
  },

  render: function() {
    return (
      <div>
        <h3 id='slogan' >Enter your location</h3>
          <form className='searchbar' onSubmit={this.handleSubmit}>
            <label id='street' >Street Address: <input type='text' valueLink={this.linkState('street')}/>
            </label>
            <br></br>
            <label id='city' >City: <input type='text' valueLink={this.linkState('city')}/>
            </label>
            <br></br>
            <label id='state' >State: <input type='text' valueLink={this.linkState('state')}/>
            </label>
            <br></br>
            <input id="searchButton" className='account' type='submit' value='Go!'/>
          </form>
      </div>
    );
  }
});

module.exports = SearchBar;

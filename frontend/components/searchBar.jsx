var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var DirectionActions = require('../actions/directionActions');


var SearchBar = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      street: "",
      city: "",
      state: ""
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
          console.log(locations);
          if (status == google.maps.DirectionsStatus.OK){
            var directions = response.routes[0].legs[0].steps;
            DirectionActions.sendDirections(directions);
          } else {
            //put error message in directions store
          }
        });

      }
    })

  },

  render: function() {
    return (
      <div className="searchbar-container">
        <h3 id='slogan' >Serentripity</h3>
          <form className='searchbar-form' onSubmit={this.handleSubmit}>
            <div id='label_div'>
              <label id='street' >Street: <input type='text' valueLink={this.linkState('street')}/>
              </label>
              <br></br>
              <label id='city' >City: <input type='text' valueLink={this.linkState('city')}/>
              </label>
              <br></br>
              <label id='state' >State: <input type='text' valueLink={this.linkState('state')}/>
              </label>
            </div>

            <input id="searchButton" className='account' type='submit' value='Go!'/>
          </form>
      </div>
    );
  }
});

module.exports = SearchBar;

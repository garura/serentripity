var React = require('react');
var DirectionStore = require('../stores/directionStore');

var Directions = React.createClass({

  getInitialState: function() {
    return {
      steps: []
    };
  },

  componentDidMount: function() {
    this.directionToken = DirectionStore.addListener(this.updateSteps);
  },

  componentWillUnmount: function() {
    this.directionToken.remove();
  },

  updateSteps: function() {
    this.setState({steps: DirectionStore.all()});
  },

  generateSteps: function() {
    if (this.state.steps.length > 0) {
      var directions = this.state.steps;
      var firstDirection = directions[0].instructions.split(" ").slice(0, 2);
      firstDirection.push("for " + directions[0].distance.text);
      firstDirection[1] = firstDirection[1].slice(3, firstDirection[1].length - 4);
      var startInstruction = <li>{firstDirection.join(" ")}</li>;
      var allDirections = directions.slice(1).map(function(step) {
        var maneuver = step.maneuver.split("-").join(" ");
        if (maneuver) {
          maneuver = maneuver[0].toUpperCase() + maneuver.slice(1);
        }
        else {
          var verbs = ["Continue", "Sprint", "Powerwalk", "Crawl", "Lightly jog", "Uber", "Lyft"];
          maneuver = verbs[Math.floor(Math.random() * verbs.length)];
        }
        // maneuver[0].toUpperCase() + maneuver.slice(1)
        return (<li>{maneuver + " for " + step.distance.text}</li>);
      });
      allDirections.unshift(startInstruction);
      return allDirections;
    }
    else {
      return (<li>Enter your location to discover your fate</li>);
    }
  },

  render: function() {
    var directions = this.generateSteps();
    var message;
    if (directions.length) {
      message = "Good luck.";
    }
    else {
      message = "Where will you end up?";
    }
    return (
      <div>
        <ul>{directions}</ul>
        <h1>{message}</h1>
      </div>
    )

  }

});


module.exports = Directions;

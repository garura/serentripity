var AppDispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  sendDirections: function(directions) {
    AppDispatcher.dispatch({
      actionType: "RECEIVE_DIRECTIONS",
      directions: directions
    });
  }
};

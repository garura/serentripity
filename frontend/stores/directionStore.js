var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var DirectionStore = new Store(AppDispatcher);
var _directions = [];

DirectionStore.all = function(){
  return _directions.slice();
};
var _resetDirections = function(directions) {
  _directions = directions;
};

DirectionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "RECEIVE_DIRECTIONS":
      _resetDirections(payload.directions);
      DirectionStore.__emitChange();
      break;
  }
};

module.exports = DirectionStore;
window.DirectionStore = DirectionStore;

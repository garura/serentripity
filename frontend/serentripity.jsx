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
//  
});

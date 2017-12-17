import React, { Component } from 'react';
import MovieSearch from './MovieSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container text-center">
        	<h1>The Best Movie Search</h1>
          <MovieSearch />
        </div>
      </div>
    );
  }
}

export default App;

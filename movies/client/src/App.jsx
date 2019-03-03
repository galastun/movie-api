import React, { Component } from 'react';
import './app.css';

import Header from './Header';
import MovieInfo from './MovieInfo';

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="app-wrapper">
        <Header title="Movie DB"/>
        <main>
          <MovieInfo />
        </main>
        <aside></aside>
        <footer></footer>
      </div>
    );
  }
}
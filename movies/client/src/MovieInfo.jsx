import React, { Component } from 'react';

import MovieTile from './MovieTile';

export default class MovieInfo extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/movies').then((res) => res.json())
    .then((data) => {
      const movies = [];
      data.data.movies.forEach((movie, i) => {
        movies.push(<MovieTile { ...movie } key={ i } />);

        this.setState({ movies });
      });
    });
  }

  render() {
    return (
      <main className="app-main">
        { this.state.movies }
      </main>
    );
  }
}

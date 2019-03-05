import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';

import Header from './Header';
import MovieList from './MovieList';
import MovieInfo from './MovieInfo';

/**
 * Main JSX template and state handler for the application
 */
export default class App extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();

    this.categories = [];

    this.state = {
      movies: [],
    };
  }

  /**
   * Get all movie and all categories.
   */
  componentDidMount() {
    Promise.all([
      fetch('http://localhost:3000/api/v1/categories').then(res => res.json()),
      fetch('http://localhost:3000/api/v1/movies').then(res => res.json()),
    ])
      .then((data) => {
        const { categories } = data[0].data;
        const { movies } = data[1].data;

        this.categories = categories;
        this.setState({ movies });
      });
  }

  /**
   * Returns the movie that has the given ID.
   *
   * @param {String} id The movie ID to get
   * @return {Object}
   */
  getMovieById(id) {
    const { movies } = this.state;
    const { length } = movies;

    for (let i = 0; i < length; i++) {
      const { film_id: filmId } = movies[i];

      if (filmId === id) {
        return movies[i];
      }
    }

    return null;
  }

  /**
   * Renders the BrowserRouter and the main layout of the application.
   *
   * @return {ReactElement}
   */
  render() {
    const { movies } = this.state;
    return (
      <Router>
        <div className="app-wrapper">
          <Header title="FakeFlix" />
          <main className="main-content">
            <MovieList movies={movies} categories={this.categories} />
            <Route
              path="/movie/:id"
              render={(data) => {
                const { id } = data.match.params;
                return (
                  movies.length && <MovieInfo movie={this.getMovieById(id)} />
                );
              }}
            />
          </main>
          <footer className="app-footer" />
        </div>
      </Router>
    );
  }
}

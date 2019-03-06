import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/app.css';

import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieInfo from './components/MovieInfo';
import MaxRating from './components/MaxRating';

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

    this.ratings = [
      'NC-17',
      'R',
      'PG-13',
      'PG',
      'G',
    ];

    this.state = {
      movies: [],
      rating: 'NC-17',
    };

    this.updateRating = this.updateRating.bind(this);
  }

  /**
   * Get all movie and all categories.
   */
  componentDidMount() {
    Promise.all([
      fetch('/api/v1/categories').then(res => res.json()),
      fetch('/api/v1/movies').then(res => res.json()),
    ])
      .then((data) => {
        const { categories } = data[0].data;
        const { movies } = data[1].data;

        this.categories = categories;
        this.setState({ movies });
      })
      .catch(() => {
        // Use this as an opportunity to display an error message
        // Unimplemented for this project
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

  updateRating(rating) {
    this.setState({ rating });
  }

  /**
   * Renders the BrowserRouter and the main layout of the application.
   *
   * @return {ReactElement}
   */
  render() {
    const { movies, rating } = this.state;
    const filter = this.ratings.slice(this.ratings.indexOf(rating));
    return (
      <Router>
        <div className="app-wrapper">
          <Header title="FakeFlix" />
          <main className="main-content">
            <MovieList movies={movies} categories={this.categories} filter={filter}>
              <MaxRating selected={rating} ratings={this.ratings} onChange={this.updateRating} />
            </MovieList>
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

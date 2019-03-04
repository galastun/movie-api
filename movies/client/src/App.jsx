import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';

import Header from './Header';
import MovieList from './MovieList';
import MovieInfo from './MovieInfo';

export default class App extends Component {
  constructor() {
    super();

    this.categories = [];

    this.state = {
      movies: [],
    };
  }

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

  getMovieById(id) {
    const { length } = this.state.movies;

    for (let i = 0; i < length; i++) {
      const { film_id } = this.state.movies[i];

      if (film_id === id) {
        return this.state.movies[i];
      }
    }

    return null;
  }

  render() {
    return(
      <Router>
        <div className="app-wrapper">
          <Header title="FakeFlix"/>
          <main className="main-content">
            <MovieList movies={ this.state.movies } categories={ this.categories } />
            <Route
              path={`/movie/:id`}
              render={(data) => {
                const { id } = data.match.params;
                return (
                  this.state.movies.length && <MovieInfo movie={this.getMovieById(id)} />
                );
              }}
            />
          </main>
          <footer className="app-footer"></footer>
        </div>
      </Router>
    );
  }
}
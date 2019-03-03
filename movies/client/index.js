import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/App';

// const name = 'Hello World';

// const movies = [];

// fetch('http://localhost:3000/api/v1/movies').then((res) => res.json())
// .then((data) => {
//   data.data.movies.forEach((movie) => {
//     movies.push(<p>{movie.title}</p>);

    
//   });
// });

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();

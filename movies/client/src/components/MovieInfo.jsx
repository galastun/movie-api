import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ActorInfo from './ActorInfo';
import utilities from '../utilities/index';

/**
 * Container for displaying extended movie information to include actor info.
 */
export default class MovieInfo extends Component {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      actors: [],
    };
  }

  /**
   * Gets the list of actors for the given movie.
   */
  componentWillMount() {
    const { movie } = this.props;
    fetch(`/api/v1/movies/${movie.film_id}/actors`)
      .then(res => res.json())
      .then((json) => {
        this.setState({ actors: json.data.actors });
      });
  }

  /**
   * Combines Actor information and movie information in an information panel.
   *
   * @returns {ReactElement}
   */
  render() {
    const { movie } = this.props;
    const { actors } = this.state;
    if (movie) {
      const {
        title,
        category,
        rating,
        description,
        _image,
      } = movie;
      const _actors = [];

      actors.forEach((actor, i) => {
        const imageNumber = Math.floor(Math.random() * 10);
        _actors.push(
          <ActorInfo
            image={`/images/person${imageNumber}.jpeg`}
            name={utilities.toTitleCase(`${actor.first_name} ${actor.last_name}`)}
            key={i}
          />,
        );
      });

      return (
        <aside className="movie-info">
          <Link to="/" className="cancel-button fas fa-times" />
          <div className="movie-info-header">
            <img src={_image} alt={title} width="100px" height="150px" />
            <div className="flex-col movie-info-title">
              <h3>{ utilities.toTitleCase(title) }</h3>
              <i>{ rating }</i>
              <i>{ category }</i>
            </div>
          </div>

          <p>{ description }</p>

          <div className="actor-list">
            <h4>Cast</h4>
            { _actors }
          </div>
        </aside>
      );
    }

    return null;
  }
}

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired,
};

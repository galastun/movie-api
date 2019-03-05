import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieTile from './MovieTile';

configure({ adapter: new Adapter() });

describe('MovieTile', () => {
  let element;
  beforeEach(() => {
    element = shallow(
      <MovieTile
        title="New Movie"
        rating="G"
        image="http://"
        id="1"
        key="1"
      />,
    );
  });

  test('should display movie name', () => {
    expect(element.contains('New Movie')).toBe(true);
  });

  test('should display the movie image', () => {
    expect(
      element.contains(<img src="http://" className="movie-tile" alt="New Movie" />),
    ).toBe(true);
  });

  test('should display the movie rating', () => {
    expect(element.contains('G')).toBe(true);
  });
});

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategorySlider from './CategorySlider';
import MovieTile from './MovieTile';

configure({ adapter: new Adapter() });

describe('CategorySlider', () => {
  let element;
  beforeEach(() => {
    element = shallow(
      <CategorySlider id={1} title="Adventure">
        <MovieTile
          title="New Movie"
          rating="G"
          image="http://"
          id="1"
          key="1"
        />
      </CategorySlider>,
    );
  });

  test('should display category name', () => {
    expect(element.contains(<h2>Adventure</h2>)).toBe(true);
  });

  test('should have children', () => {
    expect(element.children.length).toEqual(1);
  });
});

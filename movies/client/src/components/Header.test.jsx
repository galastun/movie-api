import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';

configure({ adapter: new Adapter() });

describe('Header', () => {
  let element;
  beforeEach(() => {
    element = shallow(
      <Header title="My App" />,
    );
  });

  test('should display app name', () => {
    expect(element.contains('My App')).toBe(true);
  });
});

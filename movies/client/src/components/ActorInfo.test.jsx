import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActorInfo from './ActorInfo';

configure({ adapter: new Adapter() });

describe('ActorInfo', () => {
  let element;
  beforeEach(() => {
    element = shallow(
      <ActorInfo name="Brandon" image="http://" />,
    );
  });

  test('should display actor name', () => {
    expect(element.text()).toBe('Brandon');
  });

  test('should display actor image', () => {
    expect(element.contains(<img src="http://" className="actor-image" alt="Brandon" />)).toBe(true);
  });
});

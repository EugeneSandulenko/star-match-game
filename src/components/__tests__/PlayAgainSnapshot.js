import React from 'react';
import PlayAgain from '../PlayAgain';
import renderer from 'react-test-renderer';

describe('PlayAgain', () => {
  it('renders PlayAgain correctly', () => {
    const tree = renderer
      .create(<PlayAgain onClick={() => {}} gameStatus="Active" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

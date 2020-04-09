import PlayNumber from '../PlayNumber';
import renderer from 'react-test-renderer';
import React from 'react';
/* eslint-disable no-console */
describe('Test play number', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-console
    console.log('Before each');
  });

  afterEach(() => {
    console.log('After each');
  });

  //   it('when play component is build then return button', () => {
  //     expect(2 + 2).toEqual(4);
  //   });

  //   it('async test', (done) => {
  //     setTimeout(done, 100);
  //   });

  it('when status is available then button is lightgray', () => {
    const tree = renderer
      .create(<PlayNumber status='available' number={1} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('when status is invalid then button is undefined', () => {
    const tree = renderer
      .create(<PlayNumber status='not_existing_status' number={1} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

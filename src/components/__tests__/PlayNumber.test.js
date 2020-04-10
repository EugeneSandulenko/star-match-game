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
    // eslint-disable-next-line no-console
    console.log('After each');
  });

  //   it('when play component is build then return button', () => {
  //     expect(2 + 2).toEqual(4);
  //   });

  //   it('async test', (done) => {
  //     setTimeout(done, 100);
  //   });

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  it('when number is provided then button display the number', () => {
    const number = getRandomInt(9) + 1;
    const tree = renderer.create(
      <PlayNumber status="available" number={number} />,
    );

    const instance = tree.root;
    const button = instance.findByProps({ className: 'number' });
    const text = button.children[0];

    expect(text).toEqual(String(number));
  });

  it('when status is available then button is rendered correctly', () => {
    const tree = renderer
      .create(<PlayNumber status="available" number={1} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('when status is invalid then button is rendered correctly', () => {
    const tree = renderer
      .create(<PlayNumber status="not_existing_status" number={1} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

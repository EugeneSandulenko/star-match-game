import PlayNumber from '../PlayNumber';
import renderer from 'react-test-renderer';
import React from 'react';
import utils from '../../math-utils';

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

  it('when number is provided then button display the number', () => {
    const number = utils.random(1, 9);
    const tree = renderer.create(
      <PlayNumber status="available" number={number} />,
    );

    const instance = tree.root;
    const button = instance.findByProps({ className: 'number' });
    const text = button.children[0];

    expect(text).toEqual(String(number));
  });

  it('when status is available then backgroundColor is lightgray', () => {
    const tree = renderer.create(<PlayNumber status="available" number={1} />);
    const instance = tree.root;
    const button = instance.findByType('button');

    expect(button.props['style']['backgroundColor']).toEqual('lightgray');
  });

  it('when status is used then backgroundColor is lightgreen', () => {
    const tree = renderer.create(<PlayNumber status="used" number={1} />);
    const instance = tree.root;
    const button = instance.findByType('button');

    expect(button.props['style']['backgroundColor']).toEqual('lightgreen');
  });

  it('when status is wrong then backgroundColor is lightcoral', () => {
    const tree = renderer.create(<PlayNumber status="wrong" number={1} />);
    const instance = tree.root;
    const button = instance.findByType('button');

    expect(button.props['style']['backgroundColor']).toEqual('lightcoral');
  });

  it('when status is candidate then backgroundColor is deepskyblue', () => {
    const tree = renderer.create(<PlayNumber status="candidate" number={1} />);
    const instance = tree.root;
    const button = instance.findByType('button');

    expect(button.props['style']['backgroundColor']).toEqual('deepskyblue');
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

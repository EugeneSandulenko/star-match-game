import React from 'react';

class PlayAgain extends React.Component {
  state ={
    name : 'Eugene',
  };

  render() {
    return (
      <div className="game-done">
        <div
          className="message"
          style={{ color: this.props.gameStatus === 'lost' ? 'red' : 'green' }}
        >
          {this.props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
        </div>
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
          />
        </label>
        <br />
        <button onClick={()=>  this.props.onClick(this.state.name)}>Play Again</button>
      </div>
    );
  }
}

export default PlayAgain;

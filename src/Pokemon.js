import React from "react";
import "./App.css";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.listMoves = props.listMoves.map((move) => (
      <li key={move.props.id}>{move}</li>
    ));
    this.isEnemy = props.isEnemy;
    this.imageLink = props.name.toLowerCase();
  }


  render() {

    let displayedMoves = null;
    if (!this.isEnemy) {
      displayedMoves = <ol>{this.listMoves}</ol>;
    }

    return (
      <div>
        <img
          src={require('./pokemon-pics/' + this.imageLink + '.png')}
          alt={this.name}
        />
        {/* <label>HP: </label> */}
        <div className="hp" data-label={this.props.hp}>
          <span className="value"></span>
        </div>
        {displayedMoves}
      </div>
    );
  }
}

export default Pokemon;

import React from "react";
import charmander from "./pokemon-pics/charmander.png";
import bulbasaur from "./pokemon-pics/bulbasaur.png";
import squirtle from "./pokemon-pics/squirtle.png";
import Field from "./Field";
import "./App.css";

class PokemonChooser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPicker: true,
			showBattle: false,
			pokemon1: {
				name: "Bulbasaur",
				hp: 20,
				speed: 2,
				type: "grass",
				moves: [
					{ id: 1, name: "Tackle", type: "normal", power: 1 },
					{ id: 2, name: "Vine Whip", type: "grass", power: 4 },
				],
			},
			pokemon2: {
				name: "Charmander",
				hp: 20,
				speed: 3,
				type: "fire",
				moves: [
					{ id: 1, name: "Scratch", type: "normal", power: 1 },
					{ id: 2, name: "Ember", type: "fire", power: 4 },
				],
			},
			pokemon3: {
				name: "Squirtle",
				hp: 20,
				speed: 1,
				type: "water",
				moves: [
					{ id: 1, name: "Tackle", type: "normal", power: 1 },
					{ id: 2, name: "Bubble", type: "water", power: 4 },
				],
			},
			userPokemonToPass: null,
			enemyPokemonToPass: null,
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(choice) {
		let userPokemonPicked = null;
		let enemyPokemonPicked = null;
		let randomNum = Math.floor(Math.random() * 3) + 1;
		if (choice === 1) {
			userPokemonPicked = this.state.pokemon1;
		}
		if (choice === 2) {
			userPokemonPicked = this.state.pokemon2;
		}
		if (choice === 3) {
			userPokemonPicked = this.state.pokemon3;
		}
		if (randomNum === 1) {
			enemyPokemonPicked = this.state.pokemon1;
		}
		if (randomNum === 2) {
			enemyPokemonPicked = this.state.pokemon2;
		}
		if (randomNum === 3) {
			enemyPokemonPicked = this.state.pokemon3;
		}
		this.setState({
			showPicker: false,
			showBattle: true,
			userPokemonToPass: userPokemonPicked,
			enemyPokemonToPass: enemyPokemonPicked,
		});
	}

	render() {
		const pokemonButton1 = (
			<button onClick={() => this.handleClick(1)}>
				<img src={bulbasaur} alt="bulbasaur" />
			</button>
		);
		const pokemonButton2 = (
			<button onClick={() => this.handleClick(2)}>
				<img src={charmander} alt="charmander" />
			</button>
		);
		const pokemonButton3 = (
			<button onClick={() => this.handleClick(3)}>
				<img src={squirtle} alt="squirtle" />
			</button>
		);
		let pickerElement = this.state.showPicker ? (
			<Picker
				pokemon1={pokemonButton1}
				pokemon2={pokemonButton2}
				pokemon3={pokemonButton3}
			/>
		) : null;

		let battleElement = this.state.showBattle ? (
			<Field
				pokemonUser={JSON.parse(JSON.stringify(this.state.userPokemonToPass))}
				pokemonEnemy={JSON.parse(JSON.stringify(this.state.enemyPokemonToPass))}
			/>
		) : null;
		return (
			<div>
				{pickerElement}
				{battleElement}
			</div>
		);
	}
}

function Picker(props) {
	return (
		<div>
			<h1>Choose your Pokemon!</h1>
			<div>
				{props.pokemon1}
				{props.pokemon2}
				{props.pokemon3}
			</div>
		</div>
	);
}

export default PokemonChooser;

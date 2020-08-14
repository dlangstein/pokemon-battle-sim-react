import React from "react";
import Pokemon from "./Pokemon";
import "./App.css";

class Field extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// userPokemon: {
			//   name: "Charmander",
			//   hp: 20,
			//   speed: 3,
			//   type: "fire",
			//   moves: [
			//     { id: 1, name: "Scratch", type: "normal", power: 1 },
			//     { id: 2, name: "Ember", type: "Fire", power: 4 },
			//   ],
			// },
			// enemyPokemon: {
			//   name: "Bulbasaur",
			//   hp: 20,
			//   speed: 6,
			//   type: "grass",
			//   moves: [
			//     { id: 1, name: "Tackle", type: "normal", power: 1 },
			//     { id: 2, name: "Vine Whip", type: "Grass", power: 4 },
			//   ],
			// },
			messageTop: "",
			messageBottom: "",
			messageWin: "",
			matchDecided: false,
		};
		this.types = [
			{
				name: "fire",
				weak: ["water", "fire"],
				strong: ["grass"],
			},
			{
				name: "grass",
				weak: ["fire", "grass"],
				strong: ["water"],
			},
			{
				name: "water",
				weak: ["grass", "water"],
				strong: ["fire"],
			},
			{
				name: "normal",
				weak: [""],
				strong: [""],
			},
		];
		this.state.userPokemon = props.pokemonUser;
		this.state.enemyPokemon = props.pokemonEnemy;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id) {
		const randomOrderNum = Math.floor(Math.random() * 2);
		let fasterPokemon = null;
		let slowerPokemon = null;
		let userIsFirst = null;
		let attackMultiplierFast = 1;
		let attackMultiplierSlow = 1;
		let messageToWrite = "";

		if (!this.state.matchDecided) {
			if (
				this.state.userPokemon.speed > this.state.enemyPokemon.speed ||
				(this.state.userPokemon.speed === this.state.enemyPokemon.speed &&
					randomOrderNum === 0)
			) {
				fasterPokemon = this.state.userPokemon;
				slowerPokemon = this.state.enemyPokemon;
				userIsFirst = true;
			} else {
				fasterPokemon = this.state.enemyPokemon;
				slowerPokemon = this.state.userPokemon;
				userIsFirst = false;
			}
			let firstMove = null;
			let secondMove = null;
			if (userIsFirst) {
				firstMove = id;
				secondMove = Math.floor(Math.random() * 2);
			} else {
				firstMove = Math.floor(Math.random() * 2);
				secondMove = id;
			}
			attackMultiplierFast = this.checkType(
				fasterPokemon.moves[firstMove].type,
				slowerPokemon.type
			);
			if (attackMultiplierFast === 2) {
				messageToWrite = "It's Super Effective!";
			} else if (attackMultiplierFast === 0.5) {
				messageToWrite = "It's not Very Effective!";
			}

			this.setState({
				messageTop:
					fasterPokemon.name +
					" used " +
					fasterPokemon.moves[firstMove].name +
					"! " +
					messageToWrite,
			});

			if (
				slowerPokemon.hp -
					Math.floor(
						fasterPokemon.moves[firstMove].power * attackMultiplierFast
					) <=
				0
			) {
				slowerPokemon.hp = 0;
				this.setState({
					slowerPokemon,
					messageBottom: "",
					messageWin: fasterPokemon.name + " won!",
					matchDecided: true,
				});
			} else {
				attackMultiplierSlow = this.checkType(
					slowerPokemon.moves[secondMove].type,
					fasterPokemon.type
				);
				if (attackMultiplierSlow === 2) {
					messageToWrite = "It's Super Effective!";
				} else if (attackMultiplierSlow === 0.5) {
					messageToWrite = "It's not Very Effective!";
				} else {
					messageToWrite = "";
				}

				slowerPokemon.hp -= Math.floor(
					fasterPokemon.moves[firstMove].power * attackMultiplierFast
				);
				this.setState({
					slowerPokemon,
					messageBottom:
						slowerPokemon.name +
						" used " +
						slowerPokemon.moves[secondMove].name +
						"! " +
						messageToWrite,
				});

				if (
					fasterPokemon.hp -
						Math.floor(
							slowerPokemon.moves[secondMove].power * attackMultiplierSlow
						) <=
					0
				) {
					fasterPokemon.hp = 0;
					this.setState({
						messageWin: slowerPokemon.name + " won!",
						matchDecided: true,
					});
				} else {
					fasterPokemon.hp -= Math.floor(
						slowerPokemon.moves[secondMove].power * attackMultiplierSlow
					);
				}
				this.setState({
					fasterPokemon,
				});
			}
		}
	}

	checkType(attacking, defending) {
		let attackMultiplier = 1;
		const attackingType = this.types.filter((type) => {
			return type.name.toUpperCase() === attacking.toUpperCase();
		})[0];
		const defendingType = this.types.filter((type) => {
			return type.name.toUpperCase() === defending.toUpperCase();
		})[0];

		if (attackingType.strong.includes(defendingType.name)) {
			attackMultiplier = 2;
		} else if (attackingType.weak.includes(defendingType.name)) {
			attackMultiplier = 0.5;
		}
		return attackMultiplier;
	}

	render() {
		function Move(props) {
			return (
				<button move-id={props.id} onClick={props.onClick}>
					{props.name}
				</button>
			);
		}

		const userMoves = [
			<Move
				id={this.state.userPokemon.moves[0].id}
				name={this.state.userPokemon.moves[0].name}
				onClick={() => this.handleClick(0)}
			/>,
			<Move
				id={this.state.userPokemon.moves[1].id}
				name={this.state.userPokemon.moves[1].name}
				onClick={() => this.handleClick(1)}
			/>,
		];

		const enemyMoves = [
			<Move
				id={this.state.enemyPokemon.moves[0].id}
				name={this.state.userPokemon.moves[0].name}
				onClick={() => this.handleClick(0)}
			/>,
			<Move
				id={this.state.enemyPokemon.moves[1].id}
				name={this.state.enemyPokemon.moves[1].name}
				onClick={() => this.handleClick(1)}
			/>,
		];

		let pokemonUser = (

			<Pokemon
				name={this.state.userPokemon.name}
				listMoves={userMoves}
				hp={this.state.userPokemon.hp}
				isEnemy={false}
			/>
		);

		let pokemonEnemy = (
			<Pokemon
				name={this.state.enemyPokemon.name}
				listMoves={enemyMoves}
				hp={this.state.enemyPokemon.hp}
				isEnemy={true}
			/>
		);

		return (
			<div>
				<div className="user-pokemon">{pokemonUser}</div>
				<div className="enemy-pokemon">{pokemonEnemy}</div>
				<span>{this.state.messageTop}</span>
				<div></div>
				<span>{this.state.messageBottom}</span>
				<div></div>
				<span>{this.state.messageWin}</span>
			</div>
		);
	}
}

export default Field;

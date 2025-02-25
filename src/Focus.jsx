import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import "./css/App.css";

export default function Focus() {
	const [pokemon, setPokemon] = useState("");
	const [type, setType] = useState("");
	const [description, setDescription] = useState("");
	const [moveList, setMoveList] = useState([]);
	const [stat, setStats] = useState("");
	const [sprite, setSprite] = useState("");
	const [isShown, setIsShown] = useState(true);

	let { id } = useParams();

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
			.then((response) => response.json())
			.then((data) => {
				setPokemon(data.forms[0].name);
				setSprite(data.sprites.front_default);

				let typeString = "";
				data.types.forEach((types, index) => {
					typeString +=
						index === 0 ? types.type.name : `, ${types.type.name}`;
				});
				setType(typeString);

				let moves = [];
				data.moves.forEach((move) => {
					moves.push(
						<li key={move.move.name}>
							{move.move.name.replace("-", "")}
						</li>
					);
				});
				setMoveList(moves);

				let statString = "";
				data.stats.forEach((stats) => {
					if (statString.length == 0) {
						statString += `${stats.stat.name}: ${stats.base_stat}`;
					} else {
						statString += `, ${stats.stat.name}: ${stats.base_stat}`;
					}
				});
				setStats(statString);
			});
	});

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
			.then((response) => response.json())
			.then((data) => {
				let entry = [];
				data.flavor_text_entries.forEach((flavor) => {
					if (flavor.language.name == "en") {
						entry.push(flavor.flavor_text);
					}
				});
				setDescription(entry[Math.random() * (entry.length - 1)]);
			});
	});
	return (
		<Card className="card-focus">
			<Link
				to="/"
				className="exit"
				onMouseEnter={() => setIsShown(true)}
				onMouseLeave={() => setIsShown(false)}
			>
				{isShown && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="bi bi-x-square"
						viewBox="0 0 16 16"
						id="unFilledExit"
					>
						<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
					</svg>
				)}
				{!isShown && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="bi bi-x-square-fill"
						viewBox="0 0 16 16"
						id="filledExit"
					>
						<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
					</svg>
				)}
			</Link>
			<Card.Img style={{ width: "20%" }} variant="top" src={sprite} />
			<Card.Body>
				<Card.Title>
					<h3>{pokemon}</h3>
				</Card.Title>
				<Card.Text>{description}</Card.Text>
			</Card.Body>
			<ListGroup className="list-group-flush">
				<ListGroup.Item>
					<h5>Stats</h5>
					{stat}
				</ListGroup.Item>
				<ListGroup.Item>
					<h5>Type</h5>
					{type}
				</ListGroup.Item>
				<ListGroup.Item>
					<h5>Moves</h5>
					<div className="moves">{moveList}</div>
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
}

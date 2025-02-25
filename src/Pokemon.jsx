/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router";

const Pokemon = ({ num }) => {
	const [name, setName] = useState("");
	const [sprite, setSprite] = useState("");

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon-form/${num}/`)
			.then((res) => res.json())
			.then((data) => {
				setSprite(data.sprites.front_default);
				setName(data.name);
			})
			.catch((error) => console.log("error", error));
	});

	return (
		<Link to={`/focus/${num}`}>
			<Card className="pokemon" style={{ width: "10rem" }}>
				<Card.Img variant="top" src={sprite} />
				<Card.Body style={{ borderTop: "solid" }}>
					<Card.Title style={{ textAlign: "center" }}>
						{name}
					</Card.Title>
				</Card.Body>
			</Card>
		</Link>
	);
};

export default Pokemon;

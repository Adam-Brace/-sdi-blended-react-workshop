/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import FocusContext from "./FocusContext";

const Pokemon = ({ num }) => {
	const [name, setName] = useState("");
	const [sprite, setSprite] = useState("");
	const { setFocus } = useContext(FocusContext);

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
		<>
			<Card
				className="pokemon"
				style={{ width: "10rem" }}
				onClick={() => {
					setFocus({ id: num, inFocus: true });
				}}
			>
				<Card.Img
					variant="top"
					style={{ backgroundColor: "#2d5976" }}
					src={sprite}
				/>
				<Card.Body>
					<Card.Title style={{ textAlign: "center" }}>
						{name}
					</Card.Title>
				</Card.Body>
			</Card>
		</>
	);
};

export default Pokemon;

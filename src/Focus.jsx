import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import FocusContext from "./FocusContext";

export default function Focus() {
	const { details } = useContext(FocusContext); //{id, bool}
	const [pokemon, setPokemon] = useState("");
	const [type, setType] = useState("");
	const [description, setDescription] = useState("");
	const [moveList, setMoveList] = useState([]);
	const [stat, setStats]
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${details.id}/`)
			.then((response) => response.json())
			.then((data) => {
				let moves = [];
				setPokemon(data.forms.name);

				data.types.forEach((types) => {
					if (type.length == 0) {
						setType(types.type.name);
					}
					setType(`${type}, ${types.type.name}`);
				});
				data.moves.forEach((move) => {
					moves.push(<li>{move.name}</li>);
				});
				setMoveList(moves);

				data.stats.forEach((base) => {
					if (stats.length == 0) {
						setStats(stats.stat.name);
					}
				});
			});
	});

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${details.id}/`)
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
}

// hp: 45, attack: 49 ...

// "stats": [
//         {
//             "base_stat": 45,
//             "effort": 0,
//             "stat": {
//                 "name": "hp",
//                 "url": "https://pokeapi.co/api/v2/stat/1/"
//             }
//         },
//         {
//             "base_stat": 49,
//             "effort": 0,
//             "stat": {
//                 "name": "attack",
//                 "url": "https://pokeapi.co/api/v2/stat/2/"
//             }
//         },
//         {
//             "base_stat": 49,
//             "effort": 0,
//             "stat": {
//                 "name": "defense",
//                 "url": "https://pokeapi.co/api/v2/stat/3/"
//             }
//         },
//         {
//             "base_stat": 65,
//             "effort": 1,
//             "stat": {
//                 "name": "special-attack",
//                 "url": "https://pokeapi.co/api/v2/stat/4/"
//             }
//         },
//         {
//             "base_stat": 65,
//             "effort": 0,
//             "stat": {
//                 "name": "special-defense",
//                 "url": "https://pokeapi.co/api/v2/stat/5/"
//             }
//         },
//         {
//             "base_stat": 45,
//             "effort": 0,
//             "stat": {
//                 "name": "speed",
//                 "url": "https://pokeapi.co/api/v2/stat/6/"
//             }
//         }
//     ],

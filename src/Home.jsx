/* eslint-disable react-hooks/rules-of-hooks */
import Pokemon from "./Pokemon";

const Home = () => {
	let pokemon = [];
	for (let i = 0; i < 151; i++) {
		pokemon.push(<Pokemon num={i + 1}></Pokemon>);
	}

	return (
		<>
			<h1 className="text-center my-4">Pokedex Generation 1</h1>
			{/* Adds vertical margin */}

			<div className="pokedex-container">{pokemon}</div>
		</>
	);
};

export default Home;

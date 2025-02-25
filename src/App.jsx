import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./css/App.css";
import Focus from "./Focus";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/focus/:id" element={<Focus />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

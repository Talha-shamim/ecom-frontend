import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import "./App.css";
import EcomHome from "./components/ecomHome";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			{/* hi */}
			<Routes>
				<Route path="/" element={<Login></Login>}></Route>
				<Route path="/ecomhome" element={<EcomHome></EcomHome>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="/signup" element={<Signup></Signup>}></Route>
			</Routes>
		</div>
	);
}

export default App;

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./pages/AppLayout";

function App() {
	return (
		<Router>
			<AppLayout />
		</Router>
	);
}

export default App;

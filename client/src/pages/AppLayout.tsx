import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Layout from "./Layout";
import Sell from "./Sell";
import Buy from "./Buy";
import AddProperty from "./AddProperty";
const AppLayout = () => {
	if (location.pathname === "/") {
	}
	return (
		<Routes>
			<Route path="/auth" element={<Auth />} />
			<Route path="/app" element={<Layout />}>
				<Route path="/app/*" />
				<Route path="/app/sell" element={<Sell />} />
				<Route path="/app/sell/add" element={<AddProperty />} />
				<Route path="/app/rent" element={<Buy />} />
			</Route>
		</Routes>
	);
};

export default AppLayout;

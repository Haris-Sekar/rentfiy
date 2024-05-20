import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
	return (
		<div className="pageLayoutContainer">
			<div className="rhsContainer">
				<Navbar />
				<div className="main">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;

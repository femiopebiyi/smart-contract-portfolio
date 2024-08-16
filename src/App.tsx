import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "./thirdweb.svg";
import { client } from "./client";
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Erc_20 from "./projects/Erc20";
import Erc_721 from "./projects/Erc721";
import Erc_1155 from "./projects/Erc1155";
import Staking from "./projects/Staking";
import Profile from "./projects/Profile";
import Tipjar from "./projects/Tipjar";

export function App() {
	return (
		<main>
			<Router>
				<NavBar />
				<Routes>
					<Route index element = {<Home/>}/>
					<Route path="/Erc20" element = {<Erc_20/>}/>
					<Route path="/Erc721" element = {<Erc_721/>}/>
					<Route path="/Erc1155" element = {<Erc_1155/>}/>
					<Route path="/staking" element = {<Staking/>}/>
					<Route path="/profile" element = {<Profile/>}/>
					<Route path="/tipjar" element = {<Tipjar/>}/>
				</Routes>
			</Router>
		</main>

		
	);
}





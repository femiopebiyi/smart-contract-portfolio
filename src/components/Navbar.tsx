import { ConnectButton } from "thirdweb/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import thirdwebIcon from "../thirdweb.svg";
import {client} from "../client"
import { useNavigate } from "react-router-dom";

export default function NavBar() {
	const navigate = useNavigate()

	return (
		<header className="nav">
			
			<img
				src={thirdwebIcon}
				alt=""
				className="size-[150px] md:size-[150px]"
				style={{
					filter: "drop-shadow(0px 0px 24px #a726a9a8)",
					width: "70px",
					height: "70px",
					cursor: "pointer"
				}}
				onClick={()=> navigate("/")}
			/>

			<div className="connect">
					<ConnectButton 
						client={client}
						appMetadata={{
							name: "Example app",
							url: "https://example.com",
						}}
						connectButton={{
							label: "Connect Wallet"
						}}
						connectModal={{title: "Choose Wallet"}}
					/>
				</div>
		</header>
	);
}
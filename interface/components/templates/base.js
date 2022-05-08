import { Container } from "@mui/material";
import MainNavbar from "../layouts/navbar/main";
import AccountMenu from "../elements/account-menu";
import React from "react";
import Authenticate from "../../utils/authenticate";

const BaseTemplate = (props) => {
	const auth = new Authenticate();
	React.useEffect(() => {
		auth.tokenExpire();

	}, [])
	return (
		<>
			<MainNavbar />
			<Container sx={{ my: 5 }}>
				{props.accountMenu && <AccountMenu /> }
				{props.children}
			</Container>
		</>
	);
};

export default BaseTemplate;

import { Alert, LinearProgress } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";
import { activateUser } from "../../services/users";

export const ActivateUser = ({ setParentLoading }) => {
	const router = useRouter();
	const [error, setError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const [show, setShow] = React.useState(false);
	const { t } = useTranslation();

	React.useEffect(() => {
		if (router.isReady) {
			if (router.query.user) {
				setShow(true);
				activeUserRequest();
			}
		}
	}, [router]);

	async function activeUserRequest() {
		setParentLoading(true);
		setIsLoading(true);
		await activateUser(
			router.query.user,
			router.query.user_id,
			router.query.code
		)
			.then((response) => setError(false))
			.catch((error) => setError(true));
		setIsLoading(false);
		setParentLoading(false);
	}

	return (
		<>
			{show ? (
				isLoading ? (
					<LinearProgress sx={{ mb: 2 }} />
				) : (
					<Alert
						severity={error ? "error" : "success"}
						sx={{ width: "100%", mb: 2 }}
					>
						{error
							? t("validation:activate_failed")
							: t("validation:activate_success")}
					</Alert>
				)
			) : null}
		</>
	);
};

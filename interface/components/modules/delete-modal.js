import {
	CardActions,
	Backdrop,
	Modal,
	Fade,
	Container,
	Typography,
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";

const DeleteModal = (props) => {
	const { t } = useTranslation();

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={props.modal}
			onClose={props.handleModalClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.modal}>
				<Container
					maxWidth="sm"
					sx={{
						position: "absolute",
						left: "50%",
						transform: "translate(-50%, -50%)",
						top: "50%",
					}}
				>
					<Card>
						<CardHeader title={t("common:ask_delete_title")} />
						<Divider />
						<CardContent>
							<Typography variant="body" component="div">
								{t("common:ask_delete_desc")}
							</Typography>
						</CardContent>
						<CardActions>
							<Button color="error" onClick={props.removeHandler}>
								{t("common:ask_delete_button")}
							</Button>
						</CardActions>
					</Card>
				</Container>
			</Fade>
		</Modal>
	);
};

export default DeleteModal;

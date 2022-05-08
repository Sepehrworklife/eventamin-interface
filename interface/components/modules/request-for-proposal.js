import {
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	IconButton,
	Card,
	CardContent,
	CardHeader,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	Chip,
	Button,
	Popper,
	ButtonGroup,
} from "@mui/material";
import React from "react";
import { RFPContext } from "../../contexts/app-rfp-provider";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useTranslation from "next-translate/useTranslation";
const Api = require("../../constants/api.json");
//TODO: Fix translates

const RequestForProposal = ({ setGeneralModal, setProjectModal, accRef }) => {
	// Hooks
	const { t, lang } = useTranslation("modules");

	// Inital State
	const { rfp, setRfp } = React.useContext(RFPContext);
	const [expand, setExpand] = React.useState(false);
	const [sendPopper, setSendPopper] = React.useState(false);
	const [sendPopperAnchorEl, setSendPopperAnchorEl] = React.useState(null);

	function handleExpand() {
		setExpand(!expand);
	}

	function handleSend(event) {
		setSendPopperAnchorEl(event.currentTarget);
		setSendPopper(!sendPopper);
	}

	function handleDelete(event, data) {
		const deletedRFP = rfp.filter(
			(value) => JSON.stringify(value) !== JSON.stringify(data)
		);
		setRfp(deletedRFP);
	}

	React.useEffect(() => {
		if (rfp.length > 0) setExpand(true);
		else setExpand(false);
	}, [rfp]);

	return (
		<Accordion expanded={expand} id="rfp_list" ref={accRef}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon onClick={handleExpand} />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography fontWeight="600" variant="subtitle" component="div">
					<Chip label={rfp.length} size="small" />
					<span style={{ margin: "0 0.5rem" }}>{t("rfp.title")}</span>
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<List dense={false}>
					{rfp.map((item, index) => {
						return (
							<ListItem
								key={index}
								secondaryAction={
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={(e) =>
											handleDelete(e, {
												id: item.id,
												company: item.company,
												company_fa: item.company_fa,
												logo: item.logo,
											})
										}
									>
										<DeleteIcon />
									</IconButton>
								}
							>
								<ListItemAvatar>
									<Avatar
										sx={{ width: 30, height: 30 }}
										src={Api.url + item.logo}
										variant="square"
										alt={item.company}
									/>
								</ListItemAvatar>
								<ListItemText
									primary={
										lang === "fa"
											? item.company_fa
												? item.company_fa
												: item.company
											: item.company
									}
								/>
							</ListItem>
						);
					})}
				</List>

				{rfp.length > 0 && (
					<Box>
						<Button fullWidth variant="outlined" onClick={handleSend}>
							Send
						</Button>
						<Popper open={sendPopper} anchorEl={sendPopperAnchorEl}>
							<ButtonGroup orientation="vertical" variant="contained">
								<Button onClick={() => setGeneralModal(true)}>
									{t("rfp.general_request_button")}
								</Button>
								<Button onClick={() => setProjectModal(true)}>
									{t("rfp.project_request_button")}
								</Button>
							</ButtonGroup>
						</Popper>
					</Box>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default RequestForProposal;

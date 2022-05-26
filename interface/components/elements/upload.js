import {
	Button,
	FormHelperText,
	LinearProgress,
	Box,
	Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { upload } from "../../services/uploads";
import { FileUpload } from "@mui/icons-material";

const UploadField = (props) => {
	const [helper, setHelper] = React.useState({
		message: null,
		error: false,
		buttonColor: props.buttonColor,
	});
	const [isLoading, setIsLoading] = React.useState(false);
	const [isComplete, setIsComplete] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const { t } = useTranslation("validation");

	const onChange = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setProgress(0);
		setHelper({
			error: false,
			message: null,
			buttonColor: props.buttonColor,
		});

		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				return oldProgress + 4;
			});
		}, 400);

		let error = false;
		let uploads = [];
		const files = e.target.files;
		if (files.length > props.maxLength) {
			setHelper({
				message: t("file_upload_max_length_error", { length: "1" }),
				error: true,
				buttonColor: "error",
			});
			return;
		}
		var waitUntilUpload = new Promise((resolve, reject) => {
			Array.from(files).forEach(async (file, index) => {
				if (!props.fileType.includes(file.type)) {
					setHelper({
						message: t("file_upload_type_error", {
							types: props.fileType.toString(),
						}),
						buttonColor: "error",
						error: true,
					});
					error = true;
					return;
				}
				if (file.size > props.fileSize * 10 ** 6) {
					setHelper({
						message: t("file_upload_size_error", {
							size: props.fileSize * 10 ** 3,
						}),
						error: true,
						buttonColor: "error",
					});
					error = true;
					return;
				}
				await upload(file)
					.then((result) => {
						uploads.push(result.data);
					})
					.catch((error) => {
						setHelper({
							message: t("something_wrong"),
							error: true,
							buttonColor: "error",
						});
						error = true;
						return;
					});
				if (index === files.length - 1) resolve();
			});
		});
		waitUntilUpload.then(() => {
			clearInterval(timer);
			setProgress(100);
			setTimeout(() => {
				setIsLoading(false);
			}, 300);
			if (error) return;
			setIsComplete(true);
			props.setUpload(uploads);
		});
	};

	return (
		<>
			{isLoading ? (
				<>
					<LoadingButton variant="outlined" loading fullWidth size="large">
						S
					</LoadingButton>
					<Box sx={{ width: "100%" }}>
						<LinearProgress variant="determinate" value={progress} />
					</Box>
				</>
			) : isComplete ? (
				<Alert severity="success" sx={{ width: "94%" }}>
					{t("file_upload_success_message")}
				</Alert>
			) : (
				<>
					<Button
						variant={props.buttonVariant}
						id={props.inputID + "-button"}
						component="label"
						fullWidth={props.buttonFullWidth}
						size={props.buttonSize}
						color={helper.buttonColor}
					>
						<FileUpload />
						{props.buttonText}
						<input
							type="file"
							onChange={onChange}
							hidden
							accept={props.accept}
							multiple={props.multiple}
							id={props.inputID}
							name={props.inputName}
						/>
					</Button>
					<FormHelperText error={helper.error}>{helper.message}</FormHelperText>
				</>
			)}
		</>
	);
};

export default UploadField;

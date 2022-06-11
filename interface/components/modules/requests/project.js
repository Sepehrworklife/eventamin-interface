import React from "react";
import {
  CardActions,
  Backdrop,
  CircularProgress,
  Modal,
  Fade,
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Alert,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Authenticate from "../../../utils/authenticate";
import ContactForm from "./contact-form";
import ProjectForm from "./project-form";
import GeneralForm from "./general-form";
import { RFPContext } from "../../../contexts/app-rfp-provider";
import { createMessage } from "../../../services/messages";

export const Project = (props) => {
  const { t, lang } = useTranslation("modules");
  const auth = new Authenticate();

  //Initial States
  const { rfp, setRfp } = React.useContext(RFPContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [messageAlert, setMessageAlert] = React.useState(false);

  async function request() {
    if (activeStep === 3) {
      setIsLoading(true);
      let data = formValues;
      data["type"] = true;
      if (user) data["sender"] = user.id;
      else data["sender"] = 1;
      const promise = rfp.map(async (obj) => {
        data["receiver"] = obj.id;
        await createMessage(data)
          .then(() => {
            setMessageAlert({
              severity: "success",
              message: t("requests.success"),
            });
          })
          .catch((error) => {
            setMessageAlert({
              severity: "error",
              message: t("requests.error"),
            });
          });
      });
      await Promise.all(promise).then(() => {
        setActiveStep(0);
        setFormValues(false);
        setIsLoading(false);
      });
    }
  }

  React.useEffect(() => {
    request();
  }, [activeStep]);

  React.useEffect(() => {
    setUser(auth.getUserData());

    return () => {
      setActiveStep(0);
    };
  }, []);

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
          maxWidth="lg"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "50%",
          }}
        >
          <Card>
            <CardHeader title={t("requests.project.title")} />
            <Divider />
            <CardContent sx={{ maxHeight: "70vh", overflowY: "scroll" }}>
              {isLoading ? (
                <Box
                  sx={{ width: 1, display: "flex", justifyContent: "center" }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    <Step>
                      <StepLabel>{t("requests.contactform.title")}</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>{t("requests.project.form.title")}</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>{t("requests.general.form.title")}</StepLabel>
                    </Step>
                  </Stepper>

                  <Box marginTop={4}>
                    {activeStep === 0 && (
                      <>
                        {messageAlert && (
                          <Alert
                            id="project-request-message"
                            severity={messageAlert.severity}
                            sx={{ mb: 2 }}
                          >
                            {messageAlert.message}{" "}
                          </Alert>
                        )}
                        <ContactForm
                          setFormValues={setFormValues}
                          setActiveStep={setActiveStep}
                          activeStep={activeStep}
                        />
                      </>
                    )}
                    {activeStep === 1 && (
                      <ProjectForm
                        setFormValues={setFormValues}
                        setActiveStep={setActiveStep}
                        activeStep={activeStep}
                        formValues={formValues}
                      />
                    )}
                    {activeStep === 2 && (
                      <GeneralForm
                        setFormValues={setFormValues}
                        setActiveStep={setActiveStep}
                        activeStep={activeStep}
                        formValues={formValues}
                      />
                    )}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Container>
      </Fade>
    </Modal>
  );
};

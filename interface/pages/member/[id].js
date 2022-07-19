import {
  Box,
  Container,
  Grid,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { FooterOne } from "../../components/layouts/footer/one";
import { AccountDetails } from "../../components/modules/member/account-details";
import { Services } from "../../components/modules/member/services";
import BaseTemplate from "../../components/templates/base";
import { base } from "../../services/users";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RequestForProposal from "../../components/modules/request-for-proposal";
import { Project as ProjectRequest } from "../../components/modules/requests/project";
import { General as GeneralRequest } from "../../components/modules/requests/general";
import { Overview } from "../../components/modules/member/overview";
import useTranslation from "next-translate/useTranslation";

const MemberProfile = () => {
  const router = useRouter();
  const { t } = useTranslation();

  // Initial States
  const [member, setMember] = React.useState(false);
  const [servicesExpand, setServicesExpand] = React.useState(false);
  const [projectModal, setProjectModal] = React.useState(false);
  const [generalModal, setGeneralModal] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);

  function handleModalClose() {
    setProjectModal(false);
    setGeneralModal(false);
  }

  async function fetchMember() {
    await base("get", "", router.query.id)
      .then((response) => {
        if (response.data.role === "buyer") router.push("/");
        setMember(response.data);
      })
      .catch((error) => {
				if(400 < error.response.status < 500) 
					router.push('/');
				setOpenErrorMessage(true);
      });
  }
  React.useEffect(() => {
    fetchMember();
  }, []);

  return (
    <>
      <Head>
        <title>
          {t("head:member.title")} | {member && member.username}
        </title>
        <meta name="description" content={t("head:member.description")} />
        <meta name="keywords" content={t("head:member.keywords")} />
      </Head>

      <BaseTemplate>
        {openErrorMessage && errorMessage(t("validation:something_wrong"))}
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs="12" md="5" lg="4">
              {projectModal && (
                <ProjectRequest
                  modal={projectModal}
                  handleModalClose={handleModalClose}
                />
              )}
              {generalModal && (
                <GeneralRequest
                  modal={generalModal}
                  handleModalClose={handleModalClose}
                />
              )}
              <RequestForProposal
                setProjectModal={setProjectModal}
                setGeneralModal={setGeneralModal}
              />
              <AccountDetails data={member} />
            </Grid>
            <Grid item xs="12" md="7" lg="8">
              <Overview userId={router.query.id} />
              <Services userId={router.query.id} />
            </Grid>
          </Grid>
        </Container>
      </BaseTemplate>
      <FooterOne />
    </>
  );
};

export default MemberProfile;

const errorMessage = (message) => (
  <Snackbar open={true} autoHideDuration={10000}>
    <Alert severity="error" sx={{ width: "100%" }} variant="filled">
      {message}
    </Alert>
  </Snackbar>
);

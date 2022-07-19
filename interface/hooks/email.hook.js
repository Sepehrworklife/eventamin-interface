import React from "react";
import { sendSingleEmail } from "../services/email";

export const useSendSingleEmail = () => {
  const [response, setResponse] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function sendEmail({email, subject, body}) {
		setLoading(true);
    await sendSingleEmail(email, subject, body)
      .then((response) => setResponse(response))
      .catch((error) => setError(error))
		setLoading(false);
  }

  return [ sendEmail, response, loading, error ];
};

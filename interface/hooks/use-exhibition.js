import React from "react";
import { create, getMulti } from "../services/exhibitions";

export function useFetchMultiExhibition(limit = 20, skip = 0) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      getMulti(limit, skip)
        .then((response) => setData(response.data))
        .catch((error) => setError(error));
      setLoading(false);
    }
		fetchData();
  }, [limit, skip]);

  return { data, loading, error };
}

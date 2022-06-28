import React from "react";
import { searchUser } from "../services/users";

export const useSearch = ({ category, company, country, company_fa }) => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await searchUser({
        category: category,
        company: company,
        country: country,
        company_fa: company_fa,
      })
        .then((response) => {
          const users = destructureUsers(response.data);
          setResults(users);
        })
        .catch((error) => setError(error));
      setLoading(false);
    }
    fetchData();

    return () => {
      setResults([]);
      setLoading(false);
      setError(null);
    };
  }, [category, company_fa, company, country]);
  return { results, error, loading };
};

// Destructuring the usersmetadata into the users
export function destructureUsers(users = []) {
  const destructuredUsers = [];
  users.map((user) => {
    user.user_metadata.map((userMetadata) => {
      user[userMetadata.meta_key] = userMetadata.meta_value;
    });
    destructuredUsers.push(user);
  });
  return destructuredUsers;
}

import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_CURRENT_USER } from "../graphql/queries/users"; 

export const useCurrentUser = () => {
  const whereCondition = {
    status: {
      contains: "new"
    }
  };
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { where: whereCondition },
  });

  const [user, setUser] = useState(data?.authenticatedItem || null);

  useEffect(() => {
    if (data?.authenticatedItem) {
      setUser(data.authenticatedItem);
    }
  }, [data]);

  if (loading) {
    return { user: null, loading: true, error: null }; // Still fetching
  }

  if (error) {
    console.error("Error fetching current user:", error);
    return { user: null, loading: false, error }; // Error occurred
  }

 if (!data || !data.authenticatedItem) {
    console.warn("No user data found.");
    return { user: null, loading: false, error: null }; // No user found
  }

  return {
    user,
    setUser,
    loading,
    error,
  };
};

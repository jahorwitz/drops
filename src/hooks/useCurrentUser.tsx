import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries/users"; 

export const useCurrentUser = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

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
    user: data?.authenticatedItem,
    loading,
    error,
  };
};

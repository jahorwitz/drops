import { useMutation } from '@apollo/client';
import { USER_UPDATE, USER_LOGIN } from '../graphql/mutations/users';
import { GET_CURRENT_USER } from '../graphql/queries/users';

export const useUserUpdate = () => {
  const [authorizeUser] = useMutation(USER_LOGIN);
  const [updateUser] = useMutation(USER_UPDATE, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  const handleAuthorization = async (email: string, password: string) => {
    try {
      const response = await authorizeUser({
        variables: { email, password },
      });
      if (response.data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordSuccess') {
        return true;
      }
    } catch (err) {
      console.error('Authorization failed:', err);
    }
    return false;
  }

  const handleUpdate = async (currentEmail: string, data: object) => {
    const variables = {
      where: {
        email: currentEmail
      },
      data: data,
    };

    try {
      const response = await updateUser({ variables });
      return response;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };

  return { handleUpdate, handleAuthorization }
}
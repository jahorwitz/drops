import { useMutation } from '@apollo/client';
import { USER_UPDATE } from '../graphql/mutations/users';

export const useUserUpdate = () => {
  const [ updateUser ] = useMutation(USER_UPDATE)
  
  const handleUpdate = async (currentEmail: string, data: object) => {
    const variables = {
      where: {
        email: currentEmail
      },
      data: data,
    };

    try {
      const response = await updateUser({ variables });
      console.log('Updated user:', response?.data?.updateUser);
      return response;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };

  return { handleUpdate }
}
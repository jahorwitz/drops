import { gql } from "../../__generated__/gql";

export const USER_LOGIN = gql(`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
          email
          isOnboardingComplete
          isRegistrationComplete
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`);

export const USER_LOGOUT = gql(`
  mutation Mutation { 
    endSession
  }`);

export const USER_UPDATE = gql(`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      name
      email
      height
      sex
      weight
      dateOfBirth
      diabetesType
    }
  }
`);


export const CREATE_USER = gql(`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      password {
        isSet
      }
      isRegistrationComplete
    }
  }`)
import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query User {
    authenticatedItem {
      ... on User {
        id
        name
      }
    }
  }
`;
import { gql } from "@apollo/client";


export const GET_CURRENT_USER = gql(`
  query User {
    authenticatedItem {
      ... on User {
        id
        name
      }
    }
  }
`);
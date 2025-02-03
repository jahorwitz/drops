import { gql } from "@apollo/client";


export const GET_CURRENT_USER = gql(`
  query User($where: NotificationWhereInput) {
    authenticatedItem {
      ... on User {
        name
        email
        notificationsCount(where: $where)
      }
    }
  }
`);

export const GET_CURRENT_USER_HEALTH = gql(`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        dateOfBirth
        diabetesType
        height
        sex
        weight
      }
    }
  }
`)
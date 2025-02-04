import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql(`
  query User($where: NotificationWhereInput) {
    authenticatedItem {
      ... on User {
        name
        email
        notificationsCount(where: $where)
        dateOfBirth
        diabetesType
        height
        sex
        weight
      }
    }
  }
`);
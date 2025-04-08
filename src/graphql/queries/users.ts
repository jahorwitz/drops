import { gql } from "@apollo/client";


export const GET_CURRENT_USER = gql(`
  query User($where: NotificationWhereInput) {
    authenticatedItem {
      ... on User {
        name
        email
        isOnboardingComplete
        isRegistrationComplete
        notificationsCount(where: $where)
      }
    }
  }
`);
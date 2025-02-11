import { gql } from "@apollo/client";

export const GET_USER_ACTIVITIES = gql`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        activities {
          daysOfWeek
          duration
          id
          name
          reminder
          time
        }
      }
    }
  }
`;

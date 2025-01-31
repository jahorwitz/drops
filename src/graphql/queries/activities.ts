import { gql } from "@apollo/client";

export const GET_ACTIVITIES = gql`
  query Activities($userId: ID!) {
    activities(where: { user: { id: { equals: $userId } } }) {
      id
      name
      reminder
      unitOfMeasure
      duration
      daysOfWeek
    }
  }
`;

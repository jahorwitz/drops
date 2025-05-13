import { gql } from "@apollo/client";

export const GET_USER_DIET = gql`
  query GetUserDiet {
    authenticatedItem {
      ... on User {
        id
        diet {
          id
          mealsPerDay
          snacksPerDay
          carbsPerDay
          fiberPerDay
          waterPerDay
          calorieLimit
        }
      }
    }
  }
`;

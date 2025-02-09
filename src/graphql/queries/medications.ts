import { gql } from "@apollo/client";


export const GET_MEDICATIONS = gql`
  query GetMedications($where: MedicationWhereInput) {
    authenticatedItem {
      ... on User {
        medications(where: $where) {
          id
          name
          amount
          unitOfMeasure
          time
        }
      }
    }
  }
`;

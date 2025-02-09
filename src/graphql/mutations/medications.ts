import { gql } from "@apollo/client";

export const ADD_MEDICATION = gql`
  mutation AddMedication(
    $name: String!
    $amount: Int!
    $unitOfMeasure: String!
    $time: String!
    $id: ID!
  ) {
    createMedication(
      data: {
        name: $name
        amount: $amount
        unitOfMeasure: $unitOfMeasure
        time: $time
        user: { connect: { id: $id } }
      }
    ) {
      id
      name
      amount
      unitOfMeasure
      time
    }
  }
`;

export const UPDATE_MEDICATION = gql`
  mutation UpdateMedication(
    $id: ID!
    $name: String
    $amount: Int
    $unitOfMeasure: String
    $time: String
  ) {
    updateMedication(
      where: { id: $id }
      data: {
        name: $name
        amount: $amount
        unitOfMeasure: $unitOfMeasure
        time: $time
      }
    ) {
      id
      name
      amount
      unitOfMeasure
      time
    }
  }
`;

export const DELETE_MEDICATION = gql`
  mutation DeleteMedication($id: ID!) {
    deleteMedication(where: { id: $id }) {
      id
    }
  }
`;

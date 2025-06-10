import { gql } from "@apollo/client";

export const CREATE_DIET = gql`
  mutation CreateDiet($data: DietCreateInput!) {
    createDiet(data: $data) {
      id
    }
  }
`;
export const UPDATE_DIET = gql`
  mutation UpdateDiet($where: DietWhereUniqueInput!, $data: DietUpdateInput!) {
    updateDiet(where: $where, data: $data) {
      id
    }
  }
`;

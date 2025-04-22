import { gql } from "@apollo/client";

// Fetch all reminders for the authenticated user
export const GET_REMINDERS = gql`
  query GetReminders {
    authenticatedItem {
      ... on User {
        id
        reminders {
          id
          time
          label
          type
        }
      }
    }
  }
`;

// Create a new reminder
export const CREATE_REMINDER = gql`
  mutation CreateReminder($data: ReminderCreateInput!) {
    createReminder(data: $data) {
      id
      time
      label
      type
    }
  }
`;

// Delete an existing reminder
export const DELETE_REMINDER = gql`
  mutation DeleteReminder($where: ReminderWhereUniqueInput!) {
    deleteReminder(where: $where) {
      id
    }
  }
`;

// Update an existing reminder 
export const UPDATE_REMINDER = gql`
  mutation UpdateReminder($where: ReminderWhereUniqueInput!, $data: ReminderUpdateInput!) {
    updateReminder(where: $where, data: $data) {
      id
      time
    }
  }
`;
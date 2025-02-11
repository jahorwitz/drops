import { gql } from "@apollo/client";

export const GET_USER_ID = gql`
  query GetAuthenticatedUser {
    authenticatedItem {
      ... on User {
        id
      }
    }
  }
`;

export const GET_GLUCOSE_GOAL = gql`
  query GetGlucoseGoal($userId: ID!) {
    goals(
      where: { type: { equals: Diet }, user: { id: { equals: $userId } } }
    ) {
      id
      name
      amount
      unitOfMeasure
    }
  }
`;

export const UPDATE_GLUCOSE_GOAL = gql`
  mutation UpdateGoal(
    $id: ID!
    $name: String!
    $amount: Int!
    $unitOfMeasure: String!
  ) {
    updateGoal(
      where: { id: $id }
      data: { name: $name, amount: $amount, unitOfMeasure: $unitOfMeasure }
    ) {
      id
      name
      amount
      unitOfMeasure
    }
  }
`;

export const CREATE_GLUCOSE_GOAL = gql`
  mutation CreateGoal(
    $userId: ID!
    $name: String!
    $amount: Int!
    $unitOfMeasure: String!
  ) {
    createGoal(
      data: {
        user: { connect: { id: $userId } }
        type: Diet
        name: $name
        amount: $amount
        unitOfMeasure: $unitOfMeasure
      }
    ) {
      id
      name
      amount
    }
  }
`;

export const GET_GLUCOSE_REMINDERS = gql`
  query GetGlucoseReminders($userId: ID!) {
    user(where: { id: $userId }) {
      id
      notifications(where: { type: { equals: Glucose } }) {
        id
        description
        notificationTime
      }
    }
  }
`;

export const ADD_GLUCOSE_REMINDER = gql`
  mutation AddGlucoseReminder(
    $userId: ID!
    $description: String!
    $notificationTime: DateTime!
  ) {
    createNotification(
      data: {
        user: { connect: { id: $userId } }
        type: Glucose
        description: $description
        notificationTime: $notificationTime
      }
    ) {
      id
      description
      notificationTime
    }
  }
`;

export const UPDATE_GLUCOSE_REMINDER = gql`
  mutation UpdateGlucoseReminder(
    $id: ID!
    $notificationTime: DateTime!
    $description: String!
  ) {
    updateNotification(
      where: { id: $id }
      data: { notificationTime: $notificationTime, description: $description }
    ) {
      id
      notificationTime
      description
    }
  }
`;

export const DELETE_GLUCOSE_REMINDER = gql`
  mutation DeleteGlucoseReminder($id: ID!) {
    deleteNotification(where: { id: $id }) {
      id
    }
  }
`;

export const GET_MEAL_REMINDERS = gql`
  query GetMealReminders($userId: ID!) {
    user(where: { id: $userId }) {
      id
      notifications(where: { type: { equals: Diet } }) {
        id
        description
        notificationTime
      }
    }
  }
`;

export const ADD_MEAL_REMINDER = gql`
  mutation AddMealReminder(
    $userId: ID!
    $description: String!
    $notificationTime: DateTime!
  ) {
    createNotification(
      data: {
        user: { connect: { id: $userId } }
        type: Diet
        description: $description
        notificationTime: $notificationTime
      }
    ) {
      id
      description
      notificationTime
    }
  }
`;

export const UPDATE_MEAL_REMINDER = gql`
  mutation UpdateMealReminder(
    $id: ID!
    $notificationTime: DateTime!
    $description: String!
  ) {
    updateNotification(
      where: { id: $id }
      data: { notificationTime: $notificationTime, description: $description }
    ) {
      id
      notificationTime
      description
    }
  }
`;

export const DELETE_MEAL_REMINDER = gql`
  mutation DeleteMealReminder($id: ID!) {
    deleteNotification(where: { id: $id }) {
      id
    }
  }
`;

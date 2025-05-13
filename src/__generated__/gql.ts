/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateDiet($data: DietCreateInput!) {\n    createDiet(data: $data) {\n      id\n    }\n  }\n": types.CreateDietDocument,
    "\n  mutation UpdateDiet($where: DietWhereUniqueInput!, $data: DietUpdateInput!) {\n    updateDiet(where: $where, data: $data) {\n      id\n    }\n  }\n": types.UpdateDietDocument,
    "\n  query GetReminders {\n    authenticatedItem {\n      ... on User {\n        id\n        reminders {\n          id\n          time\n          label\n          type\n        }\n      }\n    }\n  }\n": types.GetRemindersDocument,
    "\n  mutation CreateReminder($data: ReminderCreateInput!) {\n    createReminder(data: $data) {\n      id\n      time\n      label\n      type\n    }\n  }\n": types.CreateReminderDocument,
    "\n  mutation DeleteReminder($where: ReminderWhereUniqueInput!) {\n    deleteReminder(where: $where) {\n      id\n    }\n  }\n": types.DeleteReminderDocument,
    "\n  mutation UpdateReminder($where: ReminderWhereUniqueInput!, $data: ReminderUpdateInput!) {\n    updateReminder(where: $where, data: $data) {\n      id\n      time\n    }\n  }\n": types.UpdateReminderDocument,
    "\n  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {\n    authenticateUserWithPassword(email: $email, password: $password) {\n      ... on UserAuthenticationWithPasswordSuccess {\n        sessionToken\n        item {\n          id\n          name\n          email\n          isOnboardingComplete\n          isRegistrationComplete\n        }\n      }\n      ... on UserAuthenticationWithPasswordFailure {\n        message\n      }\n    }\n  }\n": types.AuthenticateUserWithPasswordDocument,
    "\n  mutation Mutation { \n    endSession\n  }": types.MutationDocument,
    "\n  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {\n    updateUser(where: $where, data: $data) {\n      name\n      email\n      height\n      sex\n      weight\n      dateOfBirth\n      diabetesType\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query GetUserDiet {\n    authenticatedItem {\n      ... on User {\n        id\n        diet {\n          id\n          mealsPerDay\n          snacksPerDay\n          carbsPerDay\n          fiberPerDay\n          waterPerDay\n          calorieLimit\n        }\n      }\n    }\n  }\n": types.GetUserDietDocument,
    "\n  query NewNotifications {\n    notifications(\n      where: {\n        status: { equals: \"new\" },\n        notificationTime: {\n          gte: \"\"\n          lte: \"\"\n        }\n      }\n      orderBy: [{ notificationTime: asc }]\n    ) {\n      notificationTime\n      status\n      type\n      description\n    }\n  }\n": types.NewNotificationsDocument,
    "\n  query OldNotifications {\n    notifications(\n      where: {\n        status: { equals: \"archived\" },\n        notificationTime: {\n          gte: \"\"\n          lte: \"\"\n        }\n      }\n      orderBy: [{ notificationTime: desc }]\n    ) {\n      notificationTime\n      status\n      type\n      description\n    }\n  }\n": types.OldNotificationsDocument,
    "\n  query User($where: NotificationWhereInput) {\n    authenticatedItem {\n      ... on User {\n        name\n        email\n        isOnboardingComplete\n        isRegistrationComplete\n        notificationsCount(where: $where)\n        dateOfBirth\n        diabetesType\n        height\n        sex\n        weight\n      }\n    }\n  }\n": types.UserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateDiet($data: DietCreateInput!) {\n    createDiet(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDiet($data: DietCreateInput!) {\n    createDiet(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateDiet($where: DietWhereUniqueInput!, $data: DietUpdateInput!) {\n    updateDiet(where: $where, data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDiet($where: DietWhereUniqueInput!, $data: DietUpdateInput!) {\n    updateDiet(where: $where, data: $data) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetReminders {\n    authenticatedItem {\n      ... on User {\n        id\n        reminders {\n          id\n          time\n          label\n          type\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetReminders {\n    authenticatedItem {\n      ... on User {\n        id\n        reminders {\n          id\n          time\n          label\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateReminder($data: ReminderCreateInput!) {\n    createReminder(data: $data) {\n      id\n      time\n      label\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation CreateReminder($data: ReminderCreateInput!) {\n    createReminder(data: $data) {\n      id\n      time\n      label\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteReminder($where: ReminderWhereUniqueInput!) {\n    deleteReminder(where: $where) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteReminder($where: ReminderWhereUniqueInput!) {\n    deleteReminder(where: $where) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateReminder($where: ReminderWhereUniqueInput!, $data: ReminderUpdateInput!) {\n    updateReminder(where: $where, data: $data) {\n      id\n      time\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateReminder($where: ReminderWhereUniqueInput!, $data: ReminderUpdateInput!) {\n    updateReminder(where: $where, data: $data) {\n      id\n      time\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {\n    authenticateUserWithPassword(email: $email, password: $password) {\n      ... on UserAuthenticationWithPasswordSuccess {\n        sessionToken\n        item {\n          id\n          name\n          email\n          isOnboardingComplete\n          isRegistrationComplete\n        }\n      }\n      ... on UserAuthenticationWithPasswordFailure {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {\n    authenticateUserWithPassword(email: $email, password: $password) {\n      ... on UserAuthenticationWithPasswordSuccess {\n        sessionToken\n        item {\n          id\n          name\n          email\n          isOnboardingComplete\n          isRegistrationComplete\n        }\n      }\n      ... on UserAuthenticationWithPasswordFailure {\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation { \n    endSession\n  }"): (typeof documents)["\n  mutation Mutation { \n    endSession\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {\n    updateUser(where: $where, data: $data) {\n      name\n      email\n      height\n      sex\n      weight\n      dateOfBirth\n      diabetesType\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {\n    updateUser(where: $where, data: $data) {\n      name\n      email\n      height\n      sex\n      weight\n      dateOfBirth\n      diabetesType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserDiet {\n    authenticatedItem {\n      ... on User {\n        id\n        diet {\n          id\n          mealsPerDay\n          snacksPerDay\n          carbsPerDay\n          fiberPerDay\n          waterPerDay\n          calorieLimit\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserDiet {\n    authenticatedItem {\n      ... on User {\n        id\n        diet {\n          id\n          mealsPerDay\n          snacksPerDay\n          carbsPerDay\n          fiberPerDay\n          waterPerDay\n          calorieLimit\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query NewNotifications {\n    notifications(\n      where: {\n        status: { equals: \"new\" },\n        notificationTime: {\n          gte: \"\"\n          lte: \"\"\n        }\n      }\n      orderBy: [{ notificationTime: asc }]\n    ) {\n      notificationTime\n      status\n      type\n      description\n    }\n  }\n"): (typeof documents)["\n  query NewNotifications {\n    notifications(\n      where: {\n        status: { equals: \"new\" },\n        notificationTime: {\n          gte: \"\"\n          lte: \"\"\n        }\n      }\n      orderBy: [{ notificationTime: asc }]\n    ) {\n      notificationTime\n      status\n      type\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query OldNotifications {\n    notifications(\n      where: {\n        status: { equals: \"archived\" },\n        notificationTime: {\n          gte: \"\"\n          lte: \"\"\n        }\n      }\n      orderBy: [{ notificationTime: desc }]\n    ) {\n      notificationTime\n      status\n      type\n      description\n    }\n  }\n"): (typeof documents)["\n  query OldNotifications {\n    notifications(\n      where: {\n        status: { equals: \"archived\" },\n        notificationTime: {\n          gte: \"\"\n          lte: \"\"\n        }\n      }\n      orderBy: [{ notificationTime: desc }]\n    ) {\n      notificationTime\n      status\n      type\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($where: NotificationWhereInput) {\n    authenticatedItem {\n      ... on User {\n        name\n        email\n        isOnboardingComplete\n        isRegistrationComplete\n        notificationsCount(where: $where)\n        dateOfBirth\n        diabetesType\n        height\n        sex\n        weight\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($where: NotificationWhereInput) {\n    authenticatedItem {\n      ... on User {\n        name\n        email\n        isOnboardingComplete\n        isRegistrationComplete\n        notificationsCount(where: $where)\n        dateOfBirth\n        diabetesType\n        height\n        sex\n        weight\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
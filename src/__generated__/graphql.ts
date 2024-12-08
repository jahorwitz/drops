/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  amount?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  unitOfMeasure?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ActivityCreateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  unitOfMeasure?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type ActivityManyRelationFilter = {
  every?: InputMaybe<ActivityWhereInput>;
  none?: InputMaybe<ActivityWhereInput>;
  some?: InputMaybe<ActivityWhereInput>;
};

export type ActivityOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  endTime?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  startTime?: InputMaybe<OrderDirection>;
  unitOfMeasure?: InputMaybe<OrderDirection>;
};

export type ActivityRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ActivityWhereUniqueInput>>;
  create?: InputMaybe<Array<ActivityCreateInput>>;
};

export type ActivityRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ActivityWhereUniqueInput>>;
  create?: InputMaybe<Array<ActivityCreateInput>>;
  disconnect?: InputMaybe<Array<ActivityWhereUniqueInput>>;
  set?: InputMaybe<Array<ActivityWhereUniqueInput>>;
};

export type ActivityUpdateArgs = {
  data: ActivityUpdateInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpdateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  unitOfMeasure?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type ActivityWhereInput = {
  AND?: InputMaybe<Array<ActivityWhereInput>>;
  NOT?: InputMaybe<Array<ActivityWhereInput>>;
  OR?: InputMaybe<Array<ActivityWhereInput>>;
  amount?: InputMaybe<IntNullableFilter>;
  endTime?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  startTime?: InputMaybe<DateTimeFilter>;
  unitOfMeasure?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type ActivityWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AuthenticatedItem = User;

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Goal = {
  __typename?: 'Goal';
  amount?: Maybe<Scalars['Int']['output']>;
  daysOfWeek?: Maybe<Array<GoalDaysOfWeekType>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GoalTypeType>;
  unitOfMeasure?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type GoalCreateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  daysOfWeek?: InputMaybe<Array<GoalDaysOfWeekType>>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<GoalTypeType>;
  unitOfMeasure?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export enum GoalDaysOfWeekType {
  Friday = 'Friday',
  Monday = 'Monday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  Thursday = 'Thursday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday'
}

export type GoalManyRelationFilter = {
  every?: InputMaybe<GoalWhereInput>;
  none?: InputMaybe<GoalWhereInput>;
  some?: InputMaybe<GoalWhereInput>;
};

export type GoalOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  unitOfMeasure?: InputMaybe<OrderDirection>;
};

export type GoalRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<GoalWhereUniqueInput>>;
  create?: InputMaybe<Array<GoalCreateInput>>;
};

export type GoalRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<GoalWhereUniqueInput>>;
  create?: InputMaybe<Array<GoalCreateInput>>;
  disconnect?: InputMaybe<Array<GoalWhereUniqueInput>>;
  set?: InputMaybe<Array<GoalWhereUniqueInput>>;
};

export enum GoalTypeType {
  Diet = 'Diet',
  Exercise = 'Exercise'
}

export type GoalTypeTypeNullableFilter = {
  equals?: InputMaybe<GoalTypeType>;
  in?: InputMaybe<Array<GoalTypeType>>;
  not?: InputMaybe<GoalTypeTypeNullableFilter>;
  notIn?: InputMaybe<Array<GoalTypeType>>;
};

export type GoalUpdateArgs = {
  data: GoalUpdateInput;
  where: GoalWhereUniqueInput;
};

export type GoalUpdateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  daysOfWeek?: InputMaybe<Array<GoalDaysOfWeekType>>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<GoalTypeType>;
  unitOfMeasure?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type GoalWhereInput = {
  AND?: InputMaybe<Array<GoalWhereInput>>;
  NOT?: InputMaybe<Array<GoalWhereInput>>;
  OR?: InputMaybe<Array<GoalWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<GoalTypeTypeNullableFilter>;
  unitOfMeasure?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type GoalWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Medication = {
  __typename?: 'Medication';
  amount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  unitOfMeasure?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type MedicationCreateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  unitOfMeasure?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type MedicationManyRelationFilter = {
  every?: InputMaybe<MedicationWhereInput>;
  none?: InputMaybe<MedicationWhereInput>;
  some?: InputMaybe<MedicationWhereInput>;
};

export type MedicationOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  time?: InputMaybe<OrderDirection>;
  unitOfMeasure?: InputMaybe<OrderDirection>;
};

export type MedicationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<MedicationWhereUniqueInput>>;
  create?: InputMaybe<Array<MedicationCreateInput>>;
};

export type MedicationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<MedicationWhereUniqueInput>>;
  create?: InputMaybe<Array<MedicationCreateInput>>;
  disconnect?: InputMaybe<Array<MedicationWhereUniqueInput>>;
  set?: InputMaybe<Array<MedicationWhereUniqueInput>>;
};

export type MedicationUpdateArgs = {
  data: MedicationUpdateInput;
  where: MedicationWhereUniqueInput;
};

export type MedicationUpdateInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  unitOfMeasure?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type MedicationWhereInput = {
  AND?: InputMaybe<Array<MedicationWhereInput>>;
  NOT?: InputMaybe<Array<MedicationWhereInput>>;
  OR?: InputMaybe<Array<MedicationWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  time?: InputMaybe<StringFilter>;
  unitOfMeasure?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type MedicationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createActivities?: Maybe<Array<Maybe<Activity>>>;
  createActivity?: Maybe<Activity>;
  createGoal?: Maybe<Goal>;
  createGoals?: Maybe<Array<Maybe<Goal>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createMedication?: Maybe<Medication>;
  createMedications?: Maybe<Array<Maybe<Medication>>>;
  createNotification?: Maybe<Notification>;
  createNotifications?: Maybe<Array<Maybe<Notification>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteActivities?: Maybe<Array<Maybe<Activity>>>;
  deleteActivity?: Maybe<Activity>;
  deleteGoal?: Maybe<Goal>;
  deleteGoals?: Maybe<Array<Maybe<Goal>>>;
  deleteMedication?: Maybe<Medication>;
  deleteMedications?: Maybe<Array<Maybe<Medication>>>;
  deleteNotification?: Maybe<Notification>;
  deleteNotifications?: Maybe<Array<Maybe<Notification>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  updateActivities?: Maybe<Array<Maybe<Activity>>>;
  updateActivity?: Maybe<Activity>;
  updateGoal?: Maybe<Goal>;
  updateGoals?: Maybe<Array<Maybe<Goal>>>;
  updateMedication?: Maybe<Medication>;
  updateMedications?: Maybe<Array<Maybe<Medication>>>;
  updateNotification?: Maybe<Notification>;
  updateNotifications?: Maybe<Array<Maybe<Notification>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateActivitiesArgs = {
  data: Array<ActivityCreateInput>;
};


export type MutationCreateActivityArgs = {
  data: ActivityCreateInput;
};


export type MutationCreateGoalArgs = {
  data: GoalCreateInput;
};


export type MutationCreateGoalsArgs = {
  data: Array<GoalCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateMedicationArgs = {
  data: MedicationCreateInput;
};


export type MutationCreateMedicationsArgs = {
  data: Array<MedicationCreateInput>;
};


export type MutationCreateNotificationArgs = {
  data: NotificationCreateInput;
};


export type MutationCreateNotificationsArgs = {
  data: Array<NotificationCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteActivitiesArgs = {
  where: Array<ActivityWhereUniqueInput>;
};


export type MutationDeleteActivityArgs = {
  where: ActivityWhereUniqueInput;
};


export type MutationDeleteGoalArgs = {
  where: GoalWhereUniqueInput;
};


export type MutationDeleteGoalsArgs = {
  where: Array<GoalWhereUniqueInput>;
};


export type MutationDeleteMedicationArgs = {
  where: MedicationWhereUniqueInput;
};


export type MutationDeleteMedicationsArgs = {
  where: Array<MedicationWhereUniqueInput>;
};


export type MutationDeleteNotificationArgs = {
  where: NotificationWhereUniqueInput;
};


export type MutationDeleteNotificationsArgs = {
  where: Array<NotificationWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateActivitiesArgs = {
  data: Array<ActivityUpdateArgs>;
};


export type MutationUpdateActivityArgs = {
  data: ActivityUpdateInput;
  where: ActivityWhereUniqueInput;
};


export type MutationUpdateGoalArgs = {
  data: GoalUpdateInput;
  where: GoalWhereUniqueInput;
};


export type MutationUpdateGoalsArgs = {
  data: Array<GoalUpdateArgs>;
};


export type MutationUpdateMedicationArgs = {
  data: MedicationUpdateInput;
  where: MedicationWhereUniqueInput;
};


export type MutationUpdateMedicationsArgs = {
  data: Array<MedicationUpdateArgs>;
};


export type MutationUpdateNotificationArgs = {
  data: NotificationUpdateInput;
  where: NotificationWhereUniqueInput;
};


export type MutationUpdateNotificationsArgs = {
  data: Array<NotificationUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  archivedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notificationTime?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<NotificationTypeType>;
  user?: Maybe<User>;
};

export type NotificationCreateInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  notificationTime?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationTypeType>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type NotificationManyRelationFilter = {
  every?: InputMaybe<NotificationWhereInput>;
  none?: InputMaybe<NotificationWhereInput>;
  some?: InputMaybe<NotificationWhereInput>;
};

export type NotificationOrderByInput = {
  archivedAt?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  notificationTime?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type NotificationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  create?: InputMaybe<Array<NotificationCreateInput>>;
};

export type NotificationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  create?: InputMaybe<Array<NotificationCreateInput>>;
  disconnect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  set?: InputMaybe<Array<NotificationWhereUniqueInput>>;
};

export enum NotificationTypeType {
  Activity = 'Activity',
  Diet = 'Diet',
  Glucose = 'Glucose',
  Medicaton = 'Medicaton',
  Other = 'other'
}

export type NotificationTypeTypeNullableFilter = {
  equals?: InputMaybe<NotificationTypeType>;
  in?: InputMaybe<Array<NotificationTypeType>>;
  not?: InputMaybe<NotificationTypeTypeNullableFilter>;
  notIn?: InputMaybe<Array<NotificationTypeType>>;
};

export type NotificationUpdateArgs = {
  data: NotificationUpdateInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpdateInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  notificationTime?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationTypeType>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  archivedAt?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  notificationTime?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<NotificationTypeTypeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type NotificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  activities?: Maybe<Array<Activity>>;
  activitiesCount?: Maybe<Scalars['Int']['output']>;
  activity?: Maybe<Activity>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  goal?: Maybe<Goal>;
  goals?: Maybe<Array<Goal>>;
  goalsCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  medication?: Maybe<Medication>;
  medications?: Maybe<Array<Medication>>;
  medicationsCount?: Maybe<Scalars['Int']['output']>;
  notification?: Maybe<Notification>;
  notifications?: Maybe<Array<Notification>>;
  notificationsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryActivitiesArgs = {
  cursor?: InputMaybe<ActivityWhereUniqueInput>;
  orderBy?: Array<ActivityOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ActivityWhereInput;
};


export type QueryActivitiesCountArgs = {
  where?: ActivityWhereInput;
};


export type QueryActivityArgs = {
  where: ActivityWhereUniqueInput;
};


export type QueryGoalArgs = {
  where: GoalWhereUniqueInput;
};


export type QueryGoalsArgs = {
  cursor?: InputMaybe<GoalWhereUniqueInput>;
  orderBy?: Array<GoalOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: GoalWhereInput;
};


export type QueryGoalsCountArgs = {
  where?: GoalWhereInput;
};


export type QueryMedicationArgs = {
  where: MedicationWhereUniqueInput;
};


export type QueryMedicationsArgs = {
  cursor?: InputMaybe<MedicationWhereUniqueInput>;
  orderBy?: Array<MedicationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MedicationWhereInput;
};


export type QueryMedicationsCountArgs = {
  where?: MedicationWhereInput;
};


export type QueryNotificationArgs = {
  where: NotificationWhereUniqueInput;
};


export type QueryNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  orderBy?: Array<NotificationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NotificationWhereInput;
};


export type QueryNotificationsCountArgs = {
  where?: NotificationWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  activities?: Maybe<Array<Activity>>;
  activitiesCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  diabetesType?: Maybe<Array<UserDiabetesTypeType>>;
  email?: Maybe<Scalars['String']['output']>;
  goals?: Maybe<Array<Goal>>;
  goalsCount?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  lastLoginDate?: Maybe<Scalars['DateTime']['output']>;
  medications?: Maybe<Array<Medication>>;
  medicationsCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Notification>>;
  notificationsCount?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<PasswordState>;
  sex?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
};


export type UserActivitiesArgs = {
  cursor?: InputMaybe<ActivityWhereUniqueInput>;
  orderBy?: Array<ActivityOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ActivityWhereInput;
};


export type UserActivitiesCountArgs = {
  where?: ActivityWhereInput;
};


export type UserGoalsArgs = {
  cursor?: InputMaybe<GoalWhereUniqueInput>;
  orderBy?: Array<GoalOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: GoalWhereInput;
};


export type UserGoalsCountArgs = {
  where?: GoalWhereInput;
};


export type UserMedicationsArgs = {
  cursor?: InputMaybe<MedicationWhereUniqueInput>;
  orderBy?: Array<MedicationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MedicationWhereInput;
};


export type UserMedicationsCountArgs = {
  where?: MedicationWhereInput;
};


export type UserNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  orderBy?: Array<NotificationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NotificationWhereInput;
};


export type UserNotificationsCountArgs = {
  where?: NotificationWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  activities?: InputMaybe<ActivityRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  diabetesType?: InputMaybe<Array<UserDiabetesTypeType>>;
  email?: InputMaybe<Scalars['String']['input']>;
  goals?: InputMaybe<GoalRelateToManyForCreateInput>;
  height?: InputMaybe<Scalars['Int']['input']>;
  lastLoginDate?: InputMaybe<Scalars['DateTime']['input']>;
  medications?: InputMaybe<MedicationRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notifications?: InputMaybe<NotificationRelateToManyForCreateInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export enum UserDiabetesTypeType {
  Gestational = 'gestational',
  Type1 = 'type1',
  Type2 = 'type2'
}

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  dateOfBirth?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  height?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastLoginDate?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  sex?: InputMaybe<OrderDirection>;
  weight?: InputMaybe<OrderDirection>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  activities?: InputMaybe<ActivityRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  diabetesType?: InputMaybe<Array<UserDiabetesTypeType>>;
  email?: InputMaybe<Scalars['String']['input']>;
  goals?: InputMaybe<GoalRelateToManyForUpdateInput>;
  height?: InputMaybe<Scalars['Int']['input']>;
  lastLoginDate?: InputMaybe<Scalars['DateTime']['input']>;
  medications?: InputMaybe<MedicationRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notifications?: InputMaybe<NotificationRelateToManyForUpdateInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  activities?: InputMaybe<ActivityManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  goals?: InputMaybe<GoalManyRelationFilter>;
  height?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  lastLoginDate?: InputMaybe<DateTimeNullableFilter>;
  medications?: InputMaybe<MedicationManyRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notifications?: InputMaybe<NotificationManyRelationFilter>;
  sex?: InputMaybe<StringNullableFilter>;
  weight?: InputMaybe<IntNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AuthenticateUserWithPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AuthenticateUserWithPasswordMutation = { __typename?: 'Mutation', authenticateUserWithPassword?: { __typename?: 'UserAuthenticationWithPasswordFailure', message: string } | { __typename?: 'UserAuthenticationWithPasswordSuccess', sessionToken: string, item: { __typename?: 'User', id: string, name?: string | null, email?: string | null } } | null };

export type MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationMutation = { __typename?: 'Mutation', endSession: boolean };

export type UserQueryVariables = Exact<{
  where: NotificationWhereInput;
}>;


export type UserQuery = { __typename?: 'Query', authenticatedItem?: { __typename?: 'User', name?: string | null, notificationsCount?: number | null } | null };


export const AuthenticateUserWithPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateUserWithPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateUserWithPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAuthenticationWithPasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionToken"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAuthenticationWithPasswordFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AuthenticateUserWithPasswordMutation, AuthenticateUserWithPasswordMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endSession"}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticatedItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"notificationsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
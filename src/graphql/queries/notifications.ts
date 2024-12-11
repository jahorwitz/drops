import { gql } from "../../__generated__/gql";

const now = new Date();
const oneDay = 24 * 60 * 60 * 1000;

const dayBefore = new Date(now.getTime() - oneDay).toISOString();
const dayAfter = new Date(now.getTime() + oneDay).toISOString();

export const CURRENT_NOTIFICATIONS = gql(`query NewNotifications {
    notifications(
      where: {
        status: { equals: "new" },
        notificationTime: {
          "${now}",
          "${dayAfter}",
        }
      },
      orderBy: [{ notificationTime: asc }]
    ) {
      notificationTime
      status
      type
      description
    }
  }`);

export const PAST_NOTIFICATIONS = gql(`query OldNotifications {
    notifications(
      where: {
        status: { equals: "archived" },
        notificationTime: {
          "${dayBefore}",
          "${now}",
        }
      },
      orderBy: [{ notificationTime: desc }]
    ) {
      notificationTime
      status
      type
      description
    }
  }`);

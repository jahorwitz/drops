import { gql } from "../../__generated__/gql";

const now = new Date();
const oneDay = 24 * 60 * 60 * 1000;

const dayBefore = new Date(now.getTime() - oneDay).toISOString();
const dayAfter = new Date(now.getTime() + oneDay).toISOString();

export const NOTIFICATIONS = gql(`query Notifications {
    notifications(
      where: {
        status: { in: ["new", "archived"] },
        notificationTime: {
          "${dayBefore}",
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

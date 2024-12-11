import { gql } from "@apollo/client";

const now = new Date();
const oneDay = 24 * 60 * 60 * 1000;

const dayBefore = new Date(now.getTime() - oneDay).toISOString();
const dayAfter = new Date(now.getTime() + oneDay).toISOString();

export const CURRENT_NOTIFICATIONS = gql`
  query NewNotifications {
    notifications(
      where: {
        status: { equals: "new" },
        notificationTime: {
          gte: "${now.toISOString()}"
          lte: "${dayAfter}"
        }
      }
      orderBy: [{ notificationTime: asc }]
    ) {
      notificationTime
      status
      type
      description
    }
  }
`;

export const PAST_NOTIFICATIONS = gql`
  query OldNotifications {
    notifications(
      where: {
        status: { equals: "archived" },
        notificationTime: {
          gte: "${dayBefore}"
          lte: "${now.toISOString()}"
        }
      }
      orderBy: [{ notificationTime: desc }]
    ) {
      notificationTime
      status
      type
      description
    }
  }
`;

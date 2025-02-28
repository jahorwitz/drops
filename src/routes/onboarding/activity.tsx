import React from "react";
import clsx from "clsx";
import ReminderItem from "../../components/reminder-item";
import { gql, useQuery } from "@apollo/client";
//

export interface ReminderProps {
  id: string;
  time: string;
  text: string;
  onClick?: (id: string) => void;
  className?: string;
}

const REMINDERS_QUERY = gql`
  query Query(
    $where: UserWhereUniqueInput!
    $notificationsWhere2: NotificationWhereInput!
  ) {
    user(where: $where) {
      notifications(where: $notificationsWhere2) {
        notificationTime
        description
        status
        type
      }
    }
  }
`;

const RemindersPage = () => {
  const reminders = useQuery(REMINDERS_QUERY, {
    variables: {
      where: {
        email: "juanaima520@gmail.com",
      },
      notificationsWhere2: {
        type: {
          equals: "Activity",
        },
      },
    },
  });

  console.log(reminders);
  // You'll need to implement the query and mutation
  const handleReminderClick = (id: string) => {
    // Update the reminder status
  };

  /*
  *return (
  <>
  {reminders.map(reminder => (
  <ReminderItem
      id="1"
      time={reminder.time}
      text={reminder.name}
      onClick={handleReminderClick}
      completed={reminder.status}
    />
  ))}
  </>
  )
  */
  return (
    <ReminderItem
      id="1"
      time="12:00pm"
      text="Mix of Vitamins"
      onClick={handleReminderClick}
      completed={true}
    />
  );
};

export default RemindersPage;

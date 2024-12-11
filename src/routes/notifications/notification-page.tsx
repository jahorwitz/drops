import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  CURRENT_NOTIFICATIONS,
  PAST_NOTIFICATIONS,
} from "../../graphql/queries/notifications";
import backbutton from "../../images/Backbutton.svg";
import { Notification } from "../../components/notification-group/notification-item";
import { NotificationType } from "../../components/notification-group/notification-item";

interface NotificationData {
  notificationTime: string;
  status: string;
  type: string;
  description: string;
}

export const Notifications: React.FC = () => {
  const [newNotifications, setNewNotifications] = useState<NotificationData[]>(
    [],
  );
  const [archivedNotifications, setArchivedNotifications] = useState<
    NotificationData[]
  >([]);

  const {
    data: newData,
    loading: newLoading,
    error: newError,
  } = useQuery(CURRENT_NOTIFICATIONS);

  const {
    data: archivedData,
    loading: archivedLoading,
    error: archivedError,
  } = useQuery(PAST_NOTIFICATIONS);

  useEffect(() => {
    if (newData) {
      setNewNotifications(newData.notifications);
    }
    if (archivedData) {
      setArchivedNotifications(archivedData.notifications);
    }
  }, [newData, archivedData]);

  if (newLoading || archivedLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (newError || archivedError) {
    return (
      <p className="text-center mt-10">
        An error occurred while fetching notifications.
      </p>
    );
  }

  return (
    <div className="flex flex-col bg-lightGray overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <Link
        to="/"
        className="z-10 flex flex-row absolute top-[15px] left-4 gap-1 cursor-pointer"
      >
        <img src={backbutton} className="mt-1 w-2 h-3" />
        <p className="text-paragraph-lg text-black leading-5">Back</p>
      </Link>
      <h1 className="text-section-subtext leading-6 text-black text-center mt-[15px] font-medium">
        Notifications
      </h1>
      <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-7 pl-2.5">
        Today
      </h2>
      <div className="flex flex-col gap-2 px-2.5 pt-3">
        {newNotifications.length > 0 ? (
          newNotifications.map((notification, index) => (
            <Notification
              key={index}
              type={notification.type.toLowerCase() as NotificationType}
              title={notification.type}
              message={notification.description}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No new notifications.</p>
        )}
      </div>
      <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-8 pl-2.5">
        Past
      </h2>
      <div className="flex flex-col gap-2 px-2.5 pt-3">
        {archivedNotifications.length > 0 ? (
          archivedNotifications.map((notification, index) => (
            <Notification
              key={index}
              type={notification.type.toLowerCase() as NotificationType}
              title={notification.type}
              message={notification.description}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No archived notifications.</p>
        )}
      </div>
    </div>
  );
};

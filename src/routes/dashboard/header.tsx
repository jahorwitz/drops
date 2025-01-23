import React from "react";
import { Link } from "react-router-dom";
import { icons } from "../../utils";
import { useAuth } from "../../hooks/useAuth";

export const Header: React.FC = () => {

  const { currentUser } = useAuth({});

  function hover(e: React.MouseEvent<HTMLImageElement>, image: string): void {
    (e.currentTarget as HTMLImageElement).src = image;
  }

  const notificationIcon = currentUser?.notificationsCount === 0
    ? icons.notification
    : icons.notificationPending;

  return (
    <div className="flex justify-between bg-lightGray px-4 py-5">
      <h2 className="font-text text-section-header font-medium leading-[32.8px]">
        Hi, {currentUser?.name}!
      </h2>
      <div className="flex gap-4">
        <Link to="/insights">
          <img
            src={icons.insights}
            alt="insights"
            onMouseOver={e => hover(e, icons.insightsHover)}
            onMouseOut={e => hover(e, icons.insights)}
          />
        </Link>
        <Link to="/notifications">
          <img
            src={notificationIcon}
            alt="notifications"
            onMouseOver={e => hover(e, icons.notificationHover)}
            onMouseOut={e => hover(e, icons.notification)}
          />
        </Link>
        <Link to="/settings">
          <img
            src={icons.avatar}
            alt="settings"
            onMouseOver={e => hover(e, icons.avatarHover)}
            onMouseOut={e => hover(e, icons.avatar)}
          />
        </Link>
      </div>
    </div>
  )
}
import React from "react";
import { Link } from "react-router-dom";
import insights from "../../images/Insights.png";
import notification from "../../images/Notifications.png";
import avatar from "../../images/Avatar.png";
import notificationHover from "../../images/Notifications-hover.png";
import avatarHover from "../../images/Avatar-hover.png";
import insightsHover from "../../images/Insights-hover.png";

export const Header: React.FC = () => {
  function hover(e: React.MouseEvent<HTMLImageElement>, image: string): void {
    (e.currentTarget as HTMLImageElement).src = image;
  }

  return (
    <div className="flex justify-between bg-lightGray px-4 py-5">
      <h2 className="font-text text-section-header font-medium leading-[32.8px]">Hi, Rachel!</h2>
      <div className="flex gap-4">
        <Link to="/insights">
          <img
            src={insights}
            onMouseOver={e => hover(e, insightsHover)} 
            onMouseOut={e => hover(e, insights)}
          />
        </Link>
        <Link to="/notifications">
         <img
            src={notification}
            onMouseOver={e => hover(e, notificationHover)} 
            onMouseOut={e => hover(e, notification)}
          />        
        </Link>
        <Link to="/settings">
          <img
            src={avatar}
            onMouseOver={e => hover(e, avatarHover)} 
            onMouseOut={e => hover(e, avatar)}
          />
        </Link>
      </div>
    </div>
  )
}
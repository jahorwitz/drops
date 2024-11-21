import React from "react";
import { Link } from "react-router-dom";
import insights from "../../images/Insights.png";
import notification from "../../images/Notifications.png";
import avatar from "../../images/Avatar.png";

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between bg-lightGray px-4 py-5">
      <p>Hi, Rachel!</p>
      <div className="flex gap-4">
        <Link to="/insights">
          <img src={insights} />
        </Link>
        <Link to="/notifications">
          <img src={notification} />
        </Link>
        <Link to="/settings">
          <img src={avatar} />
        </Link>
      </div>
    </div>
  )
}
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { icons } from "../../utils";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { setGraphqlHeaders, AUTH_TOKEN } from "../../store";

export const Header: React.FC = () => {

  const { user } = useCurrentUser();

  function hover(e: React.MouseEvent<HTMLImageElement>, image: string): void {
    (e.currentTarget as HTMLImageElement).src = image;
  }

  useEffect(() => {
    setGraphqlHeaders(AUTH_TOKEN);
  }, [])

  return (
    <div className="flex justify-between bg-lightGray px-4 py-5">
      <h2 className="font-text text-section-header font-medium leading-[32.8px]">
        Hi, {user?.name || "guest"}!
      </h2>
      <div className="flex gap-4">
        <Link to="/insights">
          <img
            src={icons.insights}
            onMouseOver={e => hover(e, icons.insightsHover)} 
            onMouseOut={e => hover(e, icons.insights)}
          />
        </Link>
        <Link to="/notifications">
         <img
            src={icons.notification}
            onMouseOver={e => hover(e, icons.notificationHover)} 
            onMouseOut={e => hover(e, icons.notification)}
          />        
        </Link>
        <Link to="/settings">
          <img
            src={icons.avatar}
            onMouseOver={e => hover(e, icons.avatarHover)} 
            onMouseOut={e => hover(e, icons.avatar)}
          />
        </Link>
      </div>
    </div>
  )
}
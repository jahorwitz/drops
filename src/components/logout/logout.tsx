import React from "react";
import { Button } from "../button/button";

const textStyles = {
    logout: "font-medium text-base text-black"
};

const Logout: React.FC = () => {
    return (
        <Button 
        className={textStyles.logout}
        variant="text"
        buttonText="Logout"
        onClick={() => alert("I am Logout Button")}
        />
    )
}
export default Logout;
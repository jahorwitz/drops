import { Button } from "./button";

export default {
  title: "Button",
  component: Button,
};

export const ButtonStory = () => {
  return (
    <> 
   {Button({variant:"primary", buttonText:"Value", onClick: ()=> alert("I'm primary button")})}
   {Button({variant:"secondary", buttonText:"Value", onClick: ()=> alert("I'm secondary button")})}
   {Button({variant:"text", buttonText:"Value", onClick: ()=> alert("I'm text button")})}
   {Button({variant:"icon", icon:"value", onClick: ()=> alert("I'm icon button")})}
    </>
  );
};

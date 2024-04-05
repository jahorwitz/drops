import {ButtonPrimary, ButtonSecondary, ButtonIcon, ButtonText} from "./button"

export default {
  title: "Button",
  component: ButtonPrimary,
};

export const ButtonStory = () => {
  return (
    <> 
    <ButtonPrimary /> 
    <ButtonSecondary /> 
    <ButtonText /> 
    <ButtonIcon /> 
    </>
  );
};

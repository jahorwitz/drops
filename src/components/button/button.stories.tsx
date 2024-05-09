import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Button } from "./button";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export default {
  title: "Button",
  component: Button,
};

export const Primary = () => (
  <Button
    variant="primary"
    buttonText="Value"
    onClick={() => alert("I'm primary button")}
  />
);

export const Secondary = () => (
  <Button
    variant="secondary"
    buttonText="Value"
    onClick={() => alert("I'm secondary button")}
  />
);

export const Text = () => (
  <Button
    variant="text"
    buttonText="Value"
    onClick={() => alert("I'm a text button")}
  />
);

export const Danger = () => (
  <Button
    variant="text"
    className="text-red opacity-100 hover:opacity-60"
    buttonText="Delete"
    onClick={() => alert("Item deleted!")}
  />
);

export const Icon = () => (
  <Button
    variant="icon"
    icon={faTrashCan as IconDefinition}
    onClick={() => alert("I'm an icon button")}
  />
);

import React, { ReactElement, useState } from "react";
import { Button } from "../button";

type ChildProps = {
  index: number;
}

type Props = {
  buttonText?: string;
  className?: string;
  children?: ReactElement<ChildProps>;
};

export const AddMoreButton = ({ buttonText, className, children, ...rest }: Props) => {
  const [childList, setChildList] = useState<number[]>([]);
  const [childIndex, setChildIndex] = useState<number>(1);

  const addChild = () => {
    setChildList((prevState) => [...prevState, childIndex]);
    setChildIndex(childIndex + 1);
  }

  return (
    <>
    {childList.map((child) => {
      const index = childList.indexOf(child) + 2;

      return (
        <div key={child}>
          {React.isValidElement(children)
            ? React.cloneElement(children, { index })
            : children}       
        </div>
      )
    })}
    <Button variant="text" className={className} buttonText={buttonText} onClick={() => addChild()} {...rest} />
    </>
  )
}
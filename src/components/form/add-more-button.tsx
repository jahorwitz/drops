import React, { ReactElement, useState } from "react";
import { Button } from "../button";

type ChildProps = {
  index: number;
  onDelete: (index:number) => void;
  elementId: number;
}

type Props = {
  buttonText?: string;
  className?: string;
  children?: ReactElement<ChildProps>;
};

export const AddMoreButton = ({ buttonText, className, children, ...rest }: Props) => {
  const [childList, setChildList] = useState<number[]>([1]);
  const [childIndex, setChildIndex] = useState<number>(2);

  const addChild = () => {
    setChildList((prevState) => [...prevState, childIndex]);
    setChildIndex(childIndex + 1);
  }

  const removeChild = (index: number) => {
    setChildList((prevState) => {
      return prevState.filter((item) => item != index);
    })
  }

  return (
    <>
    {childList.map((child, i) => {
      const index = i + 1;

      return (
        <div key={child}>
          {React.isValidElement(children)
          ? React.cloneElement(children, { index, onDelete: removeChild, elementId: child })
            : children}       
        </div>
      )
    })}
    <Button variant="text" className={className} buttonText={buttonText} onClick={() => addChild()} {...rest} />
    </>
  )
}
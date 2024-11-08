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

// The section will accept an element and dupclicate upon button press. It also passes an index numbber and delete function as props to the element.
export const AddMoreSection = ({ buttonText, className, children, ...rest }: Props) => {
  const [childList, setChildList] = useState<number[]>([1]);
  const [childIndex, setChildIndex] = useState<number>(2);

  const addChild = () => {
    setChildList((prevState) => [...prevState, childIndex]);
    setChildIndex(childIndex + 1);
  }

  //Only removes element if there is more than one
  const removeChild = (index: number) => {
    if (childList.length > 1) {
      setChildList((prevState) => {
        return prevState.filter((item) => item != index);
      })
    }
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
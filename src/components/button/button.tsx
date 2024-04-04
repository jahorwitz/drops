import { MouseEventHandler, ReactNode } from "react";

type buttonProps = {
    
    buttonText?: string;
    onClick?: MouseEventHandler;
    icon?:string;
  };

export const ButtonPrimary = ({buttonText="value", onClick}:buttonProps) => {
    return (
        <button className="text-lightGray bg-[#121212] px-10 rounded-lg grow-0 h-14  w-80 text-lg font-medium font-text" onClick={onClick}>{buttonText}</button>
    )
}

export const ButtonSecondary = ({buttonText, onClick}:buttonProps) => {
    return (
        <button className= "text-[#121212] bg-transparent px-10 border-[#121212] border rounded-lg grow-0 h-14 w-80 text-lg font-medium font-text" onClick={onClick}>{buttonText}</button>
    )
}

export const ButtonText = ({buttonText, onClick}:buttonProps) => {
        return (
            <button className = "text-[#121212] opacity-60 text-lg font-medium font-text" onClick={onClick}>{buttonText}</button>
        )
}

export const ButtonIcon = ({icon, onClick}:buttonProps) => {
    return (
        <button className="w-8 h-8" onClick={onClick}>
            <img className="p-1" src = {icon}/>
        </button>
    )
}


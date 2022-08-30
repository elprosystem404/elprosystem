import React from "react";
import { ErrorMessageProps } from "./types/types";

const ErrorMessage = (props:ErrorMessageProps) => {
  return (
    <div>{props.error}</div>
  )
}

export  {ErrorMessage}
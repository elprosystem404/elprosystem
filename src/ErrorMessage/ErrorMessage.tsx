import React from "react";
//import { Errors } from '../../types/error'


export interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = (props:ErrorMessageProps) => {
  return (
    <div>{props.error}</div>
  )
}

export default ErrorMessage
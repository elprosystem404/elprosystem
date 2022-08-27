import React from "react";
import { Errors } from '../../types/error'

const ErrorMessage = (props:Errors) => {
  return (
    <div>{props.error}</div>
  )
}

export default ErrorMessage
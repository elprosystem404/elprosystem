import React from "react";
import { ControllerProps } from "./types/types";


const Controller = (props:ControllerProps)=> {
  return (
    <div>{props.render}</div>
  )
}

export { Controller };


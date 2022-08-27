import React from "react";
import { ControllerRender } from '../../types/controller'


const Controller = (props:ControllerRender)=> {
  return (
    <div>{props.render}</div>
  )
}

export default  Controller
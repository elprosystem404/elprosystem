import React from "react";
// import  {ControllerRender}  from '../../types/controller'

export interface ControllerProps {
  render: string;
}

const Controller = (props:ControllerProps)=> {
  return (
    <div>{props.render}</div>
  )
}

export default  Controller
import React from "react";
//import styled from "@emotion/styled";
//import { font, primaryColors, shape } from "config/styles";

// const Wrapper = styled.button`
//   ${font}
//   ${primaryColors}
//   ${shape}
// `;

const cssWrapper = {
  textTransform: 'uppercase',
  fontSize: '1.5em',
  fontWeight: 'bold',
  letterSpacing: '4px',
  background: '#5cdb95',
  color: '#05385b',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
}

// onClick={onClick}
export default function Button({ text }) {
  return <button className={cssWrapper} >{text}</button>;
}
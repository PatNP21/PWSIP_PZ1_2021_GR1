import React from "react";
import "./Button.css";

const STYLES=[
    "btn--primary--solid",
    "btn--primary--outline",
]

const SIZES=[
"btn--medium",
"btn--small"
]

const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle: STYLES[0];
const checkButtonSize = STYLES.includes(buttonSize) ? buttonSize: SIZES[0];
export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  return (
    <button className={'btn ${checkButtonStyle} ${checkButtonSize}'} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

import React from "react";
import "./style.scss";

export function Button({ children, onClick, className, disabled, style }) {
  return (
    <button
      disabled={disabled}
      style={style}
      className={className}
      onClick={onClick}
      id="button-component"
    >
      {children}
    </button>
  );
}

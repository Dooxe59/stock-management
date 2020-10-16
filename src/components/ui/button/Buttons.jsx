import React from "react";
import PropTypes from "prop-types";

import "./button.scss";

const Button = ({ label, onClick, isDisabled = false, theme = "default", className = "", children }) => {
  return (
    <button
      className={`button button-${theme} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {label} {children}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  theme: PropTypes.oneOf(["default", "green", "red"]),
  className: PropTypes.string,
};

export default Button;

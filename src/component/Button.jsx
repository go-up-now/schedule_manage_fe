import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ className = "", label = "", onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded flex items-center bg-blue-500 text-black ${className} `}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;

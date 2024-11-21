import { Link } from "react-router-dom";

function Button({
  label,
  span,
  spanClassName,
  className,
  disabled,
  to,
  href,
  onClick,
  icon,
  ...passProps
}) {
  let Comp = "button";

  if (disabled) {
    //delete props.onClick;
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  const props = {
    onClick,
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  return (
    <button
      onClick={onClick}
      to={to}
      href={href}
      className={`rounded flex items-center bg-blue-500 text-black ${className} `}
      disabled={disabled}
    >
      {props.icon && <span>{props.icon}</span>}
      {label}
    </button>
  );
}

export default Button;

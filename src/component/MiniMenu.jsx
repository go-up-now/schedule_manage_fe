import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

function MiniMenu({
  menuItems = [{}],
  iconMenu,
  classNameBtn = '',
  classNameMiniBox = '',
}) {
  const [miniMenu, setMiniMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMiniMenu(!miniMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMiniMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        label={<FontAwesomeIcon icon={iconMenu} size={'xs'} />}
        onClick={toggleMenu}
        className={`block text-black text-3xl bg-transparent focus:outline-none ${classNameBtn}`}
      />

      {/* Conditional rendering for the mini-menu */}
      {miniMenu && (
        <div
          className={`absolute right-0 py-2 min-w-max bg-white border rounded shadow-md z-50 ${classNameMiniBox}`}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setMiniMenu(false); // Close the menu after clicking
              }}
              className={`block w-full px-4 py-1 text-left hover:bg-[#fafbfb] ${item.isDanger ? "text-red-500" : ""
                }`}
            >
              {item.icon && (
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
              )}
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MiniMenu;

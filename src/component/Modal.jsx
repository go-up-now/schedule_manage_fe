import React, { useState } from "react";
import Button from "./Button"; // Đảm bảo đường dẫn đúng

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className={`bg-white p-6 rounded shadow-lg relative ${className}`}>
        <Button
          onClick={onClose}
          label="X"
          className="bg-white w-[40px] flex justify-center text-center text-black hover:text-red-600 hover:bg-transparent absolute top-0 right-0 font-medium text-[20px] p-1"
        />
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};
export default Modal;

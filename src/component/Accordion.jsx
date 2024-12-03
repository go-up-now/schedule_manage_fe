import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="w-full flex flex-col items-center">
    <div className="w-full p-4 bg-gray-50 my-1 flex" onClick={onClick}>
      <h3 className="mr-4 font-medium text-xl">{title}</h3>
      <span>{isOpen ? "-" : "+"}</span>
    </div>
    {isOpen && (
      <div className="accordion-content w-11/12 px-4 py-3">{content}</div>
    )}
  </div>
);

const Accordion = ({ items, maxRow }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const totalPages = Math.ceil(items.length / maxRow);
  const startIndex = (currentPage - 1) * maxRow;
  const currentItems = items.slice(startIndex, startIndex + maxRow);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="w-full">
      {currentItems.map((item, index) => (
        <AccordionItem
          key={startIndex + index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === startIndex + index}
          onClick={() => handleClick(startIndex + index)}
        />
      ))}

      <div className="flex justify-center mt-4 items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="w-[150px] h-[40px] border rounded-md transition-all bg-blue-500 text-white flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faAnglesLeft} className="mr-2" />
          Back
        </button>
        <span className="flex-2 mx-4">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="w-[150px] h-[40px] border rounded-md transition-all bg-blue-500 text-white flex items-center justify-center"
        >
          Next <FontAwesomeIcon icon={faAnglesRight} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Accordion;

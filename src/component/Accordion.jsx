import React, { useState } from "react";
import Button from "./Button";

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="w-full flex flex-col items-center ">
    <div className="w-full p-4 bg-gray-50 my-1 flex" onClick={onClick}>
      <h3 className="mr-4 font-medium text-xl">{title}</h3>
      <span>{isOpen ? "-" : "+"}</span>
    </div>
    {isOpen && (
      <div className="accordion-content w-11/12 px-4 py-3 ">{content}</div>
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
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}

      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 w-3/12 text-white text-center bg-blue-400 rounded-md"
        >
          Previous
        </button>
        <span className="flex-2">
          {isNaN(currentPage) ? 1 : currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 w-3/12 text-white text-center bg-blue-400 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Accordion;

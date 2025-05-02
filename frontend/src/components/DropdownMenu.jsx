import { useState } from "react";

const Dropdown = ({ options = [], label = "Select", onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option); // Call parent handler if provided
  };

  return (
    <div className="relative w-44 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <span>{selected}</span>
        <svg
          className={`w-5 h-5 inline float-right transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6B7280"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

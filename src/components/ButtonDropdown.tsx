
import React, { useState } from "react";
import { RxCaretRight } from "react-icons/rx";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";

interface ButtonDropdownProps {
  onAdd?: () => void;
  onDelete?: () => void;
}

const ButtonDropdown = ({ onAdd, onDelete }: ButtonDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="rounded-[30px] flex items-center border border-gray-300 bg-white text-gray-500 text-lg px-3 py-1"
      >
        {/* <span
          className={`material-symbols-outlined transform transition-transform scale-1 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          chevron_right
        </span> */}
        <RxCaretRight
          className={`transform transition-transform scale-1 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-md">
          <a
            onClick={() => {
              if (onAdd) onAdd();
              setIsOpen(false);
            }}
            className="cursor-pointer flex items-center gap-x-2 p-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors"
          >
            <IoIosAdd className="text-lg" />
            Add new
          </a>
          <a
            onClick={() => {
              if (onDelete) onDelete();
              setIsOpen(false);
            }}
            className="cursor-pointer flex items-center gap-x-2 p-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors"
          >
            <IoIosRemove className="text-lg" />
            Delete
          </a>
        </div>
      )}
    </div>
  );
};

export default ButtonDropdown;

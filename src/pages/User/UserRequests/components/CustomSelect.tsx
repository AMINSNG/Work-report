import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  selected,
  options,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === selected);

  return (
    <div className="relative w-56  ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between p-3 border-2 border-[#DFE6E9] rounded-xl"
      >
        {selectedOption?.label}
        <ChevronDown className={`${isOpen ? "rotate-180" : ""}`} size={18} />
      </button>

      {isOpen && (
        <div
          className="absolute overflow-hidden top-full mt-2 w-full
         bg-white border-2 border-[#DFE6E9] rounded-xl shadow-lg z-50"
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="block w-full text-right p-3 hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

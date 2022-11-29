import { ChangeEvent } from "react";

import { Option } from "../../interfaces/select";

interface Props {
  label: string;
  id: string;
  options: Option[];
  multiple: boolean;
  value: string | string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ id, label, options, multiple, value, onChange }: Props) {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        multiple={multiple}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;

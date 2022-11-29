import { ChangeEvent } from "react";

interface Props {
  label: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ id, label, onChange }: Props) {
  return (
    <>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id={id}
        type="file"
        onChange={onChange}
      />
    </>
  );
}

export default FileInput;

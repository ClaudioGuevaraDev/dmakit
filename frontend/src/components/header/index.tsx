import Select from "../select";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  fileTypeOptions,
  vectorialServicesOptions,
  graphsServicesOptions,
} from "../../utils/options";
import FileInput from "../file_input";
import { HeaderOptions } from "../../interfaces/header";

interface Props {
  setSection: Dispatch<SetStateAction<string>>;
  headerOptions: HeaderOptions;
  setHeaderOptions: Dispatch<SetStateAction<HeaderOptions>>;
}

function Header({ setSection, headerOptions, setHeaderOptions }: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold">Machine Learning Tools</h1>

      <div className="bg-gray-200 p-4 rounded-md grid grid-cols-12 space-x-4 max-w-4xl">
        <div className="col-span-3">
          <Select
            label="File Type"
            id="fileTypesSelect"
            options={fileTypeOptions}
            multiple={false}
            value={headerOptions.fileTypeValue}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setHeaderOptions({
                ...headerOptions,
                fileTypeValue: e.target.value,
                selectServiceValue:
                  e.target.value === "vectorial"
                    ? vectorialServicesOptions[0].value
                    : e.target.value === "graphs"
                    ? graphsServicesOptions[0].value
                    : "",
              });
            }}
          />
        </div>
        <div className="col-span-3">
          <Select
            label="Select Service"
            id="selectServiceSelect"
            options={
              headerOptions.fileTypeValue === "vectorial"
                ? vectorialServicesOptions
                : headerOptions.fileTypeValue === "graphs"
                ? graphsServicesOptions
                : []
            }
            multiple={false}
            value={headerOptions.selectServiceValue}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setHeaderOptions({
                ...headerOptions,
                selectServiceValue: e.target.value,
              });
              setSection(e.target.value);
            }}
          />
        </div>

        <div className="col-span-6">
          <FileInput
            label="Upload File"
            id="uploadFile"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setHeaderOptions({
                ...headerOptions,
                file: e.target.files && e.target.files[0],
              });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Header;

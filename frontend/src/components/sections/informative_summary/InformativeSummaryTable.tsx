interface Props {
  dtypes: {
    column: string;
    type: string;
  }[];
}

function InformativeSummaryTable({ dtypes }: Props) {
  return (
    <div className="overflow-x-auto relative shadow-md rounded-lg">
      <table className="w-full text-sm text-center text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="py-3 px-6">
              Column
            </th>
            <th scope="col" className="py-3 px-6">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {dtypes.map((dtype) => (
            <tr
              key={dtype.column}
              className="bg-white border-b hover:bg-gray-50"
            >
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
              >
                {dtype.column}
              </th>
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
              >
                {dtype.type}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InformativeSummaryTable;

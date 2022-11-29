interface Props {
  totalRows: number;
  totalColumns: number;
}

function InformativeSummaryTotalRowsColumns({
  totalColumns,
  totalRows,
}: Props) {
  return (
    <>
      <h2 className="text-2xl font-semibold">Total rows and columns</h2>
      <p className="font-bold">
        Total rows: <span className="font-normal">{totalRows}</span>
      </p>
      <p className="font-bold">
        Total columns: <span className="font-normal">{totalColumns}</span>
      </p>
    </>
  );
}

export default InformativeSummaryTotalRowsColumns;

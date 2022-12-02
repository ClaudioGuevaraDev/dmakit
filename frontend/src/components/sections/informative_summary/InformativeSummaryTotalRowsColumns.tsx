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
      <h2 className="text-xl font-semibold">Total rows and columns</h2>
      <p className="font-semibold">
        Total rows: <span className="font-normal">{totalRows}</span>
      </p>
      <p className="font-semibold">
        Total columns: <span className="font-normal">{totalColumns}</span>
      </p>
    </>
  );
}

export default InformativeSummaryTotalRowsColumns;

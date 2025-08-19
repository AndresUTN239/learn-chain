export default function Table({ headers, rows }) {
  return (
    <div className="table-dapp table-responsive my-2">
      <table className="table-striped table-borderless align-middle mb-0 w-100">
        <thead className="table-dapp-head">
          <tr>
            {headers.map((header, index) => (
              <th className="tx-sm tx-bold" key={index} scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "table-dapp-row-even" : "table-dapp-row-odd"}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="tx-sm tx-color-gray" style={header === "Opciones" ? {width: '1%'} : undefined}>
                  {header === "ID" || header === "id" || header === "#" ? rowIndex + 1 : row[header] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

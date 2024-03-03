import React, { useState, useEffect } from "react";
import { fetchDataFromExcel } from "../Utils/FetchDataUtils";

function Table({ file }) {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await fetchDataFromExcel(file, null);
      setExcelData(jsonData);
    };

    fetchData();
  }, [file]);

  return (
    <div className="container h-96 mx-auto overflow-y-hidden overflow-x-scroll text-xs md:text-base">
      <table className="table-auto w-full border-collapse border border-gray-800">
        <thead>
          <tr className="bg-black text-white">
            {excelData.length > 0 &&
              excelData[0].map((cell, index) => (
                <th key={index} className="border border-gray-600 py-2 px-4">
                  {cell}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {excelData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-600 py-2 px-4 whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

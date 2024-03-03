import * as XLSX from "xlsx";

export const fetchDataFromExcel = async (file, sheetName) => {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${file}: ${response.status} ${response.statusText}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    if (!sheetName) {
      const firstSheetName = workbook.SheetNames[0];
      sheetName = firstSheetName; // Gunakan sheet pertama jika sheetName kosong
    }

    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    return jsonData;
  } catch (error) {
    console.error("Error fetching data from Excel:", error);
    return null;
  }
};

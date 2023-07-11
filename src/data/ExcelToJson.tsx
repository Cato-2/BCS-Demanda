import React, { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { writeFile, FsTextFileOption } from "@tauri-apps/api/fs";

const ExcelToJSON: React.FC = () => {
  const [xlsxDataTask, setXlsxDataTask] = useState<any[]>([]);
  const [xlsxDataRoles, setXlsxDataRoles] = useState<any[]>([]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });

        const headerRow = jsonData[0] as string[];
        const jsonDataWithHeaders = jsonData.slice(1).map((row: any[]) => {
          const rowData: any = {};
          headerRow.forEach((header: string, index: number) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        const secondSheetName = workbook.SheetNames[1];
        const worksheet2 = workbook.Sheets[secondSheetName];
        const jsonData2: any[] = XLSX.utils.sheet_to_json(worksheet2, {
          header: 1,
        });

        const headerRow2 = jsonData2[0] as string[];
        const jsonDataWithHeaders2 = jsonData2.slice(1).map((row2: any[]) => {
          const rowData2: any = {};
          headerRow2.forEach((header: string, index: number) => {
            rowData2[header] = row2[index];
          });
          return rowData2;
        });

        setXlsxDataTask(jsonDataWithHeaders);
        setXlsxDataRoles(jsonDataWithHeaders2);

        const f: FsTextFileOption = {
          path: "./tareas.json",
          contents: JSON.stringify(jsonDataWithHeaders), // Convert to string
        };
        writeFile(f)
          .then(() => {
            console.log("Tasks File written");
          })
          .catch((error: any) => {
            console.error("Error writing file:", error);
          });

        const f2: FsTextFileOption = {
          path: "./roles.json",
          contents: JSON.stringify(jsonDataWithHeaders2), // Convert to string
        };
        writeFile(f2)
          .then(() => {
            console.log("Roles File written");
          })
          .catch((error: any) => {
            console.error("Error writing file:", error);
          });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <div>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default ExcelToJSON;

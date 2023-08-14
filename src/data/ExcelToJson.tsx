import React, { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { writeFile, FsTextFileOption } from "@tauri-apps/api/fs";
import { trace, info, error, attachConsole } from "tauri-plugin-log-api";


const formatDate = (excelDate: number) => {
  const epochStart = new Date(Date.UTC(1899, 11, 30)); // Excel epoch starts from 1900-01-01, but has a bug for 1900 being a leap year
  const date = new Date(epochStart.getTime() + excelDate * 86400000);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


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
        const jsonDataWithHeaders:any = jsonData.slice(1).map((row: any[]) => {
          const rowData: any = {};

          headerRow.forEach((header: string, index: number) => {
            if (header === 'meses especificos') {
              // Split the comma-separated string back into an array
              if(row[index] != undefined || row[index] != null){
                rowData[header] = row[index].split(',').filter(Boolean); // filter(Boolean) to remove empty elements
              }
            } else {
              rowData[header] = row[index];
            }
            if(header == 'fecha de inicio' || header == 'fecha de termino') {
              if(row[index] != undefined){
                rowData[header] = formatDate(row[index]);
              }
            }
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
            info("Tasks File written");
          })
          .catch((error: any) => {
            console.error("Error writing file:", error);
            error("Error writing file:", error);

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
            error("Error writing file:", error);
          });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <div>
        <input type="file" accept=".xlsx" className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary hover:bg-blue-gray-200 hover:cursor-pointer" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default ExcelToJSON;

import React, { ChangeEvent, useState } from 'react';
import * as XLSX from 'xlsx';
import {writeFile, FsTextFileOption} from '@tauri-apps/api/fs';


const XlsxInput: React.FC = () => {
  const [xlsxData, setXlsxData] = useState<any[]>([]);

  const handleClick = async () => {
    const f: FsTextFileOption = {
      path: './test.txt',
      contents: 'Hello world!',
    };
    await writeFile(f);
    console.log('File written')
  };


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headerRow = jsonData[0] as string[];
        const jsonDataWithHeaders = jsonData.slice(1).map((row: any[]) => {
          const rowData: any = {};
          headerRow.forEach((header: string, index: number) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        setXlsxData(jsonDataWithHeaders);
        console.log(jsonDataWithHeaders);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
    </div>
    <div>
      <button onClick={handleClick}>Write file</button>
    </div>
    </div>
  );
};

export default XlsxInput;
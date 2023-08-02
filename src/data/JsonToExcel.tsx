import React, { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { writeFile, FsTextFileOption } from "@tauri-apps/api/fs";
import tasks from "../../src-tauri/tareas.json";
import roles from "../../src-tauri/roles.json";
import { Button } from "@material-tailwind/react";

export const JsonToExcel: React.FC = () => {
    const [JsonDataTask, setJsonDataTask] = useState<any[]>([]);
    const [JsonDataRoles, setJsonDataRoles] = useState<any[]>([]);

    const handleClick = () => {
        // Convert "meses especificos" array to comma-separated strings in "tasks" data.
        const tasksWithCommaSeparatedMonths = tasks.map((task:any) => ({
            ...task,
            'meses especificos': task['meses especificos'] ? task['meses especificos'].join(',') : '',
          }));
    
        const worksheet = XLSX.utils.json_to_sheet(tasksWithCommaSeparatedMonths);
        const workSheet2 = XLSX.utils.json_to_sheet(roles);
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tareas');
        XLSX.utils.book_append_sheet(workbook, workSheet2, 'Roles');
    
        XLSX.writeFile(workbook, 'demanda.xlsx');
      };
    return (
        <div>
            <div>
                <Button onClick={handleClick }>Descargar Excel</Button>
            </div>
        </div>
    );
};
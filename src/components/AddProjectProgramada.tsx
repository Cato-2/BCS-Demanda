import { Fragment, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Select from "react-select";
import { writeFile, FsTextFileOption } from "@tauri-apps/api/fs";
import path from "path";
import { start } from "repl";
import { ReadJson } from "../data/ReadJson";

function AddProjectProgramada(any:any) {
  const [open, setOpen] = useState(false);

  const [title, settitle] = useState();
  const [description, setdescription] = useState();
  const [startdate, setstartdate] = useState();
  const [duedate, setduedate] = useState();
  const [duration, setduration] = useState();
  const [roles, setroles] = useState({value:"", label:""}); // format {value: "nombre", label: "nombre"}
  const [Roles, setRoles] = useState<any[]>([]);
  const [Tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await  ReadJson("roles");
      const tareas = await  ReadJson("tareas");
      setRoles(roles);
      setTasks(tareas);
    };
    fetchData();
  }, [])

  const handleChangeStart = (e: any) => {
    setstartdate(e.target.value);
  };

  const handleChangeDue = (e: any) => {
    setduedate(e.target.value);
  };

  const handleChangeTitle = (e: any) => {
    settitle(e.target.value);
  };

  const handleChangeDescription = (e: any) => {
    setdescription(e.target.value);
  };
  const handleChangeDuration = (e: any) => {
    setduration(e.target.value);
  };
  const handleChangeRoles = (selectedOption:any) => {
    setroles(selectedOption);
  };
  const handleOpen = () => setOpen(!open);

  let data = Roles.map((role) => {
    return { value: role.nombre, label: role.nombre };
  });
  
  data.push({ value: "todos", label: "Todos" });

  const addnew = () => {
    let alltasks = JSON.parse(JSON.stringify(Tasks));

    // Step 2: Add the new task to the array of tasks
    let newtask = {
      id: alltasks.length + 1,
      titulo: title,
      descripcion: description,
      duracion: duration,
      roles: roles?.value,
      "fecha de creacion": startdate,
      "fecha de inicio": startdate,
      "fecha de termino": duedate,
      frecuencia: any.tipo,
    };
    alltasks.push(newtask);

    // Step 3: Convert the updated array back to a JSON string
    alltasks = JSON.stringify(alltasks);

    const f: FsTextFileOption = {
      path: "./tareas.json",
      contents: alltasks, // Convert to string
    };
    writeFile(f)
      .then(() => {
        console.log("Tasks File written");
      })
      .catch((error: any) => {
        console.error("Error writing file:", error);
      });
    handleOpen();
  };

  return (
    <>
      <Button
        className="flex items-center gap-3"
        color="blue"
        size="sm"
        onClick={handleOpen}
        variant="gradient"
      >
        <UserPlusIcon strokeWidth={2} className="h-4 w-4 " /> Agregar Tarea
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="flex flex-col overflow-y-auto max-h-[90%]"
      >
        <DialogHeader>Agregar tarea</DialogHeader>
        <DialogBody divider>
          <div>
            <div className="py-2 flex flex-col">
              <label htmlFor="">Titulo</label>
              <input
                onChange={handleChangeTitle}
                type="text"
                className="bg-gray-50 rounded-md border border-gray-300 focus:outline-none px-2 py-1 focus:border-blue-500 "
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="">Descripción</label>
              <textarea
                name=""
                id=""
                onChange={handleChangeDescription}
                rows={3}
                className="bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <div className="flex-row justify-between flex">
                <label htmlFor="" className="w-1/2 p-1">
                  Fecha de inicio
                </label>
                <label htmlFor="" className="w-1/2 p-1">
                  Fecha de término
                </label>
              </div>
              <div className="flex flex-row justify-between">
                <input
                  type="date"
                  onChange={handleChangeStart}
                  max={duedate}
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
                <input
                  type="date"
                  onChange={handleChangeDue}
                  min={startdate}
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
              </div>
            </div>
            <div className="pt-4 flex flex-row">
              <div className="flex flex-col w-1/2 p-1">
                <label htmlFor="">Duración total de la tarea (horas)</label>
                <input
                  type="number"
                  min="0"
                  onChange={handleChangeDuration}
                  className="m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
              </div>
              <div className="flex flex-col w-1/2 p-1">
                <label htmlFor="">Rol</label>
                <Select
                  name="colors"
                  onChange = {handleChangeRoles}
                  options={data}
                  className=" "
                  classNamePrefix="select"
                  maxMenuHeight={120}
                  value = {roles}
                />
              </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={addnew}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddProjectProgramada;

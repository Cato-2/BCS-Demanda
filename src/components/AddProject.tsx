import { Fragment, useState } from "react";
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
import Roles from "../../src-tauri/roles.json";
import { writeFile, FsTextFileOption } from "@tauri-apps/api/fs";
import Tasks from "../../src-tauri/tareas.json";

function AddProject(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [title, settitle] = useState<string>();
  const [description, setdescription] = useState<string>("");
  const [duration, setduration] = useState<number>(0);
  const [roles, setroles] = useState<{ value: string; label: string }>({
    value: "",
    label: "",
  });
  const [howmany, setHowmany] = useState<number>(0);
  const [frecuency, setFrecuency] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = event.target;
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const divArray = Array.from({ length: howmany }, (_, index) => index + 1);

  const handleOpen = () => setOpen(!open);

  const handleInputChangeHowmany = (e: any) => {
    setHowmany(e.target.value);
  };

  const handleFrecuency = (e: any) => {
    setFrecuency(e.target.value);
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
  const handleChangeRoles = (selectedOption: any) => {
    setroles(selectedOption);
  };
  function getFormattedToday(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; // Months are 0-based, so we add 1
    const day: number = today.getDate();

    // Pad single-digit months and days with leading zeros
    const formattedMonth: string = month.toString().padStart(2, "0");
    const formattedDay: string = day.toString().padStart(2, "0");

    // Combine the components in the "yyyy-mm-dd" format
    const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

    return formattedDate;
  }

  function extractNumberFromString(str: any) {
    const regex = /\d+/; // This regex will match one or more digits in the string.
    const match = str.match(regex);
    if (match) {
      return parseInt(match[0], 10); // Convert the matched string to an integer.
    }
    return 0; // Return 0 if no number is found.
  }

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
      duracion: extractNumberFromString(duration),
      roles: roles?.value,
      fecha_creacion: getFormattedToday(),
      frecuencia: frecuency,
      "cuantas veces": extractNumberFromString(howmany),
      tipo: props.tipo,
      "meses especificos": selectedOptions,
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
        <DialogHeader>Agregar tarea {props.tipo}</DialogHeader>
        <DialogBody divider>
          <div>
            <div className="py-2 flex flex-col">
              <label htmlFor="">Titulo</label>
              <input
                type="text"
                className="bg-gray-50 rounded-md border border-gray-300 focus:outline-none px-2 py-1 focus:border-blue-500 "
                onChange={handleChangeTitle}
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="">Descripción</label>
              <textarea
                name=""
                id=""
                rows={3}
                onChange={handleChangeDescription}
                className="bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <div className="flex-row justify-between flex">
                {props.tipo == "programadas" && (
                  <label htmlFor="" className="w-1/2 p-1">
                    Duración por mes (horas)
                  </label>
                )}
                {props.tipo == "rutinarias" && (
                  <label htmlFor="" className="w-1/2 p-1">
                    Duración total tarea (horas)
                  </label>
                )}

                <label htmlFor="" className="w-1/2 p-1">
                  Roles
                </label>
              </div>
              <div className="flex flex-row justify-between">
                <input
                  type="number"
                  min="0"
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                  onChange={handleChangeDuration}
                />
                <Select
                  name="colors"
                  onChange={handleChangeRoles}
                  options={data}
                  className=" w-1/2 m-1"
                  classNamePrefix="select"
                  maxMenuHeight={120}
                  value={roles}
                />
              </div>
            </div>
            <div className="pt-4">
              <div className="flex flex-row">
                <label htmlFor="" className="w-1/2 p-1">
                  Frecuencia
                </label>
                <label htmlFor="" className="w-1/2 p-1">
                  Cuantas veces
                </label>
              </div>
              <div className="flex flex-row">
                <select
                  name=""
                  id=""
                  onClick={handleFrecuency}
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="diaria">Diaria</option>
                  <option value="semanal">Semanal</option>
                  <option value="quincenal">Quincenal</option>
                  <option value="mensual">Mensual</option>
                  <option value="anual">Anual</option>
                </select>
                <input
                  onChange={handleInputChangeHowmany}
                  type="number"
                  min="0"
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
              </div>
              <div className="pt-4">
                {frecuency === "anual" &&
                  props.tipo === "programadas" &&
                  Array.from({ length: howmany }).map((_, index) => (
                    <div key={index}>
                      <label htmlFor="">Especificar</label>
                      <select
                        value={selectedOptions[index] || ""}
                        onChange={(event) => handleSelectChange(event, index)}
                        className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                      >
                        <option value="">Seleccione una opción</option>
                        <option value="enero">Enero</option>
                        <option value="febrero">Febrero</option>
                        <option value="marzo">Marzo</option>
                        <option value="abril">Abril</option>
                        <option value="mayo">Mayo</option>
                        <option value="junio">Junio</option>
                        <option value="julio">Julio</option>
                        <option value="agosto">Agosto</option>
                        <option value="septiembre">Septiembre</option>
                        <option value="octubre">Octubre</option>
                        <option value="noviembre">Noviembre</option>
                        <option value="diciembre">Diciembre</option>
                      </select>
                    </div>
                  ))}
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

export default AddProject;

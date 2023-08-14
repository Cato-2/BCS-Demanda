import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import tasks from "../../src-tauri/tareas.json";
import Roles from "../../src-tauri/roles.json";
import Select from "react-select";
import { writeFile, FsTextFileOption } from "@tauri-apps/api/fs";
import { trace, info, error, attachConsole } from "tauri-plugin-log-api";


let data = Roles.map((role:any) => {
  return { value: role.nombre, label: role.nombre };
});
function EditProject(props:
   any) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const handleOpen = () => {
    setOpen(!open);
    handleId();
  };
  const handleId = () => setId(props.id);

  const adaptroles = () => {
    let rol = props.tarea.roles;
    return { value: rol, label: rol };
  };

  const [title, settitle] = useState(props.tarea.titulo);
  const [description, setdescription] = useState(props.tarea.descripcion);
  const [startdate, setstartdate] = useState();
  const [duedate, setduedate] = useState();
  const [duration, setduration] = useState(props.tarea.duracion);
  const [roles, setroles] = useState(adaptroles); // format {value: "nombre", label: "nombre"}
  const [howmany, setHowmany] = useState<number>(props.tarea["cuantas veces"]);
  const [frecuency, setFrecuency] = useState<string>(props.tarea.frecuencia);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    props.tarea["meses especificos"]
  );
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value } = event.target;
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const divArray = Array.from({ length: howmany }, (_, index) => index + 1);

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
  const update = () => {
    tasks.map((task:any) => {
      if (task.id == id) {
        task.titulo = title;
        task.descripcion = description;
        task.duracion = duration;
        task.roles = roles.value;
        task["cuantas veces"] = howmany;
        task.frecuencia = frecuency;
        task["meses especificos"] = selectedOptions;
      }
    });
    let alltasks = JSON.parse(JSON.stringify(tasks));

    alltasks = JSON.stringify(alltasks);

    const f: FsTextFileOption = {
      path: "./tareas.json",
      contents: alltasks, // Convert to string
    };
    writeFile(f)
      .then(() => {
        console.log("Tasks File written");
        info("Tasks File written");

      })
      .catch((error: any) => {
        console.error("Error writing file:", error);
        error("Error writing file1:", error);

      });
    handleOpen();
  };

  return (
    <>
      <Tooltip content="Edit User">
        <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Editar Tarea {id}</DialogHeader>
        <DialogBody divider>
        <div>
            <div className="py-2 flex flex-col">
              <label htmlFor="">Titulo</label>
              <input
                type="text"
                value = {title}
                className="bg-gray-50 rounded-md border border-gray-300 focus:outline-none px-2 py-1 focus:border-blue-500 "
                onChange={handleChangeTitle}
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="">Descripción</label>
              <textarea
                value = {description}
                name=""
                id=""
                rows={3}
                onChange={handleChangeDescription}
                className="bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <div className="flex-row justify-between flex">
                <label htmlFor="" className="w-1/2 p-1">
                  Duración Total (horas)
                </label>
                <label htmlFor="" className="w-1/2 p-1">
                  Roles
                </label>
              </div>
              <div className="flex flex-row justify-between">
                <input
                  value = {duration}
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
                  value={frecuency}
                  name=""
                  id=""
                  onClick={handleFrecuency}
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="periodicas">Periodicas</option>
                  <option value="diaria">Diaria</option>
                  <option value="semanal">Semanal</option>
                  <option value="quincenal">Quincenal</option>
                  <option value="mensual">Mensual</option>
                  <option value="anual">Anual</option>
                </select>
                <input
                  onChange={handleInputChangeHowmany}
                  value={howmany}
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
                      className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1">
                        <option value="">Seleccione una opción</option>
                        <option value="Ene">Enero</option>
                        <option value="Feb">Febrero</option>
                        <option value="Mar">Marzo</option>
                        <option value="Abr">Abril</option>
                        <option value="May">Mayo</option>
                        <option value="Jun">Junio</option>
                        <option value="Jul">Julio</option>
                        <option value="Ago">Agosto</option>
                        <option value="Sep">Septiembre</option>
                        <option value="Oct">Octubre</option>
                        <option value="Nov">Noviembre</option>
                        <option value="Dic">Diciembre</option>
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
          <Button variant="gradient" color="green" onClick={update}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EditProject;

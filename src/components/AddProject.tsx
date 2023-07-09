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

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

function AddProject(props: any) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [howmany, setHowmany] = useState(0);
  const [frecuency, setFrecuency] = useState("");
  const divArray = Array.from({ length: howmany }, (_, index) => index + 1);

  const handleOpen = () => setOpen(!open);
  const handleInputChange = (e: any) => {
    setHowmany(e.target.value);
  };
  const handleChecked = () => {
    setChecked(!checked);
    console.log(checked);
  };
  const handleFrecuency = (e: any) => {
    setFrecuency(e.target.value);
    console.log(frecuency);
  };

  const specify = () => {
    if (frecuency != "Diaria" && frecuency != "" && frecuency != "Anual") {
      return (
        <div>
          <label htmlFor="">Especificar?</label>
          <Checkbox defaultChecked onClick={handleChecked} />
        </div>
      );
    }
  };

  const option = () => {
    if (checked === true) {
      if (frecuency === "Semanal") {
        return (
          <>
            <div>
              <label htmlFor="" className="pr-2">
                Cuando:
              </label>
              <select
                name=""
                id=""
                className="w-fit m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
              >
                <option value="">Seleccione una opción</option>
                <option value="">Lunes</option>
                <option value="">Martes</option>
                <option value="">Miercoles</option>
                <option value="">Jueves</option>
                <option value="">Viernes</option>
                <option value="">Sabado</option>
                <option value="">Domingo</option>
              </select>
            </div>
          </>
        );
      } else if (frecuency === "Mensual") {
        return (
          <div>
            <label htmlFor="" className="pr-2">
              Cuando:
            </label>
            <select
              name=""
              id=""
              className="w-fit m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
            >
              <option value="">Seleccione una opción</option>
              <option value="">Semana 1 (Días 1 a 7)</option>
              <option value="">Semana 2 (Días 8 a 14)</option>
              <option value="">Semana 3 (Días 15 a 21)</option>
              <option value="">Semana 4 (Días 22 a 28)</option>
              <option value="">Semana 5 (Días 29 a 31)</option>
            </select>
          </div>
        );
      } else if (frecuency === "Anual") {
        return (
          <div>
            <label htmlFor="" className="pr-2">
              Cuando:
            </label>
            <select
              name=""
              id=""
              className="w-fit m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
            >
              <option value="">Seleccione una opción</option>
              <option value="">Enero</option>
              <option value="">Febrero</option>
              <option value="">Marzo</option>
              <option value="">Abril</option>
              <option value="">Junio</option>
              <option value="">Julio</option>
              <option value="">Agosto</option>
              <option value="">Septiembre</option>
              <option value="">Octubre</option>
              <option value="">Noviembre</option>
              <option value="">Diciembre</option>
            </select>
          </div>
        );
      }
    }
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
      <Dialog open={open} handler={handleOpen} className="flex flex-col overflow-y-auto max-h-[90%]"> 
        <DialogHeader>Agregar tarea {props.tipo}</DialogHeader>
        <DialogBody divider>
          <div >
            <div className="py-2 flex flex-col">
              <label htmlFor="">Titulo</label>
              <input
                type="text"
                className="bg-gray-50 rounded-md border border-gray-300 focus:outline-none px-2 py-1 focus:border-blue-500 " 
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="">Descripción</label>
              <textarea
                name=""
                id=""
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
                  Duración (horas)
                </label>
              </div>
              <div className="flex flex-row justify-between">
                <input
                  type="date"
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
                <input
                  type="number"
                  min="0"
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
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
                  <option value="Diaria">Diaria</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensual">Mensual</option>
                  <option value="Anual">Anual</option>
                </select>
                <input
                  onChange={handleInputChange}
                  type="number"
                  min="0"
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
              </div>
            </div>
            {specify()}
            {divArray.map((item, index) => (
              <div key={index}>{option()}</div>
            ))}
            <div className="border-t border-gray-300 my-4"></div>

            <div className="flex flex-col h-[8rem]">
              <label htmlFor="" className="w-1/2 p-1">
                Rol
              </label>
                <Select
                  isMulti
                  name="colors"
                  options={colourOptions}
                  className=" w-full"
                  classNamePrefix="select"
                  maxMenuHeight={120}
                  
                />
            </div>
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddProject;

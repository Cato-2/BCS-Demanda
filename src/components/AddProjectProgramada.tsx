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

function AddProjectProgramada() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [howmany, setHowmany] = useState(0);
  const [frecuency, setFrecuency] = useState("");
  const [startdate, setstartdate] = useState();
  const [duedate, setduedate] = useState();
  const divArray = Array.from({ length: howmany }, (_, index) => index + 1);

  const handleChangeStart = (e:any) => {
    setstartdate(e.target.value)
  }

  const handleChangeDue= (e:any) => {
    setduedate(e.target.value)
  } 
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
        <DialogHeader>Agregar tarea Programada</DialogHeader>
        <DialogBody divider>
          <div>
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
                  Fecha de término
                </label>
              </div>
              <div className="flex flex-row justify-between">
                <input
                  type="date"
                  onChange={handleChangeStart}
                  value = {startdate}
                  max = {duedate}
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
                <input
                  type="date"
                  onChange={handleChangeDue}
                  value = {duedate}
                  min={startdate}
                  className="w-1/2 m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
              </div>
            </div>
            <div className="pt-4 flex flex-row">
              <div className="flex flex-col w-1/2 p-1">
                <label htmlFor="">
                  Duración total (horas)
                </label>
                <input
                  type="number"
                  min="0"
                  className="m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
                />
              </div>
              <div className="flex flex-col w-1/2 p-1">
              <label htmlFor="">
                Rol
              </label>
              <Select
                isMulti
                name="colors"
                options={colourOptions}
                className=" "
                classNamePrefix="select"
                maxMenuHeight={120}
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddProjectProgramada;

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
import Roles from "../../src-tauri/roles.json"
import { writeFile, FsTextFileOption } from "@tauri-apps/api/fs";


function AddRole() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [nombre, setnombre] = useState("");
  const [cantidad, setcantidad] = useState(0);
  const [horas, sethoras] = useState(0);

  const handleChangeNombre = (e: any) => {
    setnombre(e.target.value);
  };
  const handleChangeCantidad = (e: any) => {
    setcantidad(e.target.value);
  };
  const handleChangeHoras = (e: any) => {
    sethoras(e.target.value);
  };

  function extractNumberFromString(str:any) {
    const regex = /\d+/; // This regex will match one or more digits in the string.
    const match = str.match(regex);
    if (match) {
      return parseInt(match[0], 10); // Convert the matched string to an integer.
    }
    return 0; // Return 0 if no number is found.
  }

  const addnew = () => {
    let allroles = JSON.parse(JSON.stringify(Roles));

    // Step 2: Add the new task to the array of tasks
    let newrol = {
      id: allroles.length + 1,
      nombre: nombre,
      cantidad: extractNumberFromString(cantidad),
      "horas semanales": extractNumberFromString(horas),
    };
    allroles.push(newrol);

    // Step 3: Convert the updated array back to a JSON string
    allroles = JSON.stringify(allroles);

    const f: FsTextFileOption = {
      path: "./roles.json",
      contents: allroles, // Convert to string
    };
    writeFile(f)
      .then(() => {
        console.log("Roles File written");
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
        color="green"
        size="sm"
        onClick={handleOpen}
        variant="gradient"
      >
        <UserPlusIcon strokeWidth={2} className="h-4 w-4 " /> Agregar rol
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        className="flex flex-col overflow-y-auto max-h-[90%]"
      >
        <DialogHeader>Agregar rol</DialogHeader>
        <DialogBody divider>
          <div>
            <div className="py-2 flex flex-col">
              <label htmlFor="">Nombre</label>
              <input
                onChange={handleChangeNombre}
                type="text"
                className="bg-gray-50 rounded-md border border-gray-300 focus:outline-none px-2 py-1 focus:border-blue-500 "
              />
            </div>
            <div className="flex flex-col p-1">
              <label htmlFor="">Cantidad de personas</label>
              <input
                type="number"
                min="0"
                onChange={handleChangeCantidad}
                className="m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
              />
            </div>
            <div className="flex flex-col p-1">
              <label htmlFor="">Horas semanales</label>
              <input
                type="number"
                min="0"
                onChange={handleChangeHoras}
                className="m-1 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500  focus:outline-none px-2 py-1"
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
          <Button variant="gradient" color="green" onClick={addnew}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddRole;

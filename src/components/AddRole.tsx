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

function AddRole() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);


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
      <Dialog open={open} handler={handleOpen} className="flex flex-col overflow-y-auto max-h-[90%]"> 
        <DialogHeader>Agregar rol</DialogHeader>
        <DialogBody divider>

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

export default AddRole;

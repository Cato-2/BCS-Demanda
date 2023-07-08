import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

function AddProject() {
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button className="flex items-center gap-3" color="blue" size="sm" onClick={handleOpen} variant="gradient">
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar Tarea
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Agregar Tarea</DialogHeader>
        <DialogBody divider>
          The key to more success is to have a lot of pillows. Put it this way, it took me
              twenty five years to get these plants, twenty five years of blood sweat and tears, and
              I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan
              luv.
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

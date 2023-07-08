import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
    IconButton
} from "@material-tailwind/react";
import { PencilIcon, UserPlusIcon, EyeIcon } from "@heroicons/react/24/solid";

function ViewProject(props:any) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const handleOpen = () => {
    setOpen(!open);
    handleId();
  }; 
  const handleId = () => setId(props.id);

  return (
    <>
       <Tooltip content="Edit User">
        <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
          <EyeIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Visualizar Tarea {id}</DialogHeader>
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

export default ViewProject;

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import data from "../../src-tauri/roles.json"
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import ViewProject from "./ViewProject";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import AddRole from "./AddRole";

const TABLE_HEAD = ["Rol", "Cantidad de personas", "Cantidad de tareas", "Horas disponible", "Horas reales", ""];


const rows = data;


function Roles() {

  console.log(rows)

  return (
    <>
      <div className="pb-4 px-5 pt-8 flex w-full items-center justify-between gap-8 bg-[#fcfcfc]  whitespace-nowrap">
        <div >
          <Typography variant="h5" color="blue-gray">
            Roles
          </Typography>

        </div>
        <div className="flex shrink-0 flex-col gap-2 lg:flex-row">
        <div className="w-68">
          <Input label="Buscar" icon={<MagnifyingGlassIcon/>} />
        </div>
          <AddRole />
        </div>
      </div>
      <Card className="max-h-[calc(100vh-9rem)] h-fit shadow-none bg-white border tabla mx-5 px-2">
        <CardBody className="p-0 table-auto overflow-auto whitespace-nowrap max-w-[calc(100vw-19rem)]">
          <table className="text-left mt-4 mb-2 w-full">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 "
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((rol) => {
                  const isLast = rol.id === rows.length - 1;
                  const classes = isLast
                    ? "p-0 px-4"
                    : "p-0 px-4 border-b border-blue-gray-100/50 ";

                  return (
                    <tr key={rol.id} className="hover:bg-blue-gray-100/30 bg-white">
                      <td className={`${classes} w-2/5`}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal capitalize"
                            >
                              {rol.nombre}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={`${classes}  bg-blue-gray-100/20`}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {rol.cantidad}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={`${classes} w-2/10`}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes} bg-blue-gray-100/20`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {rol["horas semanales"]}
                        </Typography>
                      </td>
                      <td className={`${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                         
                        </Typography>
                      </td>
                      <td className={`${classes}  bg-blue-gray-100/20 flex-row flex-auto flex justify-center w-auto`}>
                          <EditProject id={rol.id} />
                          <ViewProject id={rol.id}/>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default Roles;

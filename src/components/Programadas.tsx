import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import AddProjectProgramada from "./AddProjectProgramada";
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
import data from "../../src-tauri/tareas.json";
const TABLE_HEAD = [
  "Id",
  "Titulo",
  "Duración (horas)",
  "Roles",
  "Fecha de inicio",
  "Fecha de término",
  "",
];

const TABLE_ROWS = data;

function Programadas() {
  const [search, setSearch] = useState("");

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    console.log(search);
  };

  return (
    <>
      <div className="pb-4 px-5 pt-8 flex w-full items-center justify-between gap-8 bg-[#fcfcfc]  whitespace-nowrap">
        <div>
          <Typography variant="h5" color="blue-gray">
            Actividades programadas
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 lg:flex-row">
          <div className="w-68">
            <Input
              label="Buscar"
              onChange={handleSearch}
              icon={<MagnifyingGlassIcon />}
            />
          </div>
          <AddProjectProgramada tipo="programada"/>
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
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.filter((row) => {
                const searchLowerCase = search.toLowerCase().trim();
                const tituloLowerCase = row.titulo.toLowerCase().trim();
                const rolLowerCase = row.roles.toLowerCase().trim();
                return (
                  !searchLowerCase || tituloLowerCase.includes(searchLowerCase) || rolLowerCase.includes(searchLowerCase)
                );
              }).map((tarea) => {
                const isLast = tarea.id === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-0 px-4"
                  : "p-0 px-4 border-b border-blue-gray-100/50 ";
                if (tarea.frecuencia == "periodicas" || tarea.frecuencia == "programada" && tarea.id != null) {
                  return (
                    <tr
                      key={tarea.id}
                      className="hover:bg-blue-gray-100/30 bg-white"
                    >
                      <td className={`${classes}  bg-blue-gray-100/20`}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal capitalize whitespace-normal"
                            >
                              {tarea.id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={`${classes} w-2/5`}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal capitalize whitespace-normal"
                            >
                              {tarea.titulo}
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
                              {tarea.duracion}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={`${classes} w-2/10`}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {tarea.roles}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes} w-2/10  bg-blue-gray-100/20`}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tarea["fecha de inicio"]}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tarea["fecha de termino"]}
                        </Typography>
                      </td>
                      <td
                        className={`${classes}  bg-blue-gray-100/20 flex-row flex-auto flex justify-center w-auto`}
                      >
                        <EditProject id={tarea.id} />
                        <ViewProject id={tarea.id} />
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default Programadas;

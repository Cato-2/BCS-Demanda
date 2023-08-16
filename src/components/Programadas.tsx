import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { useState , useEffect} from "react";
import { ReadJson } from "../data/ReadJson";
const TABLE_HEAD = [
  "Id",
  "Titulo",
  "Duración (horas)",
  "Roles",
  "Frecuencia",
  "Meses",
  "",
];



function Programadas() {
  const [search, setSearch] = useState("");

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };
  const [Roles, setRoles] = useState<any[]>([]);
  const [Tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await  ReadJson("roles");
      const tareas = await  ReadJson("tareas");
      setRoles(roles);
      setTasks(tareas);
    };
    fetchData();
  }, [])

  const TABLE_ROWS = Tasks;

  return (
    <>
      <div className="pb-4 px-5 pt-8 flex w-full items-center justify-between gap-8 bg-[#fcfcfc]  whitespace-nowrap">
        <div>
          <Typography variant="h5" color="blue-gray">
            Tareas programadas
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
          <AddProject tipo="programadas" />
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
                const tituloLowerCase = row.titulo?.toLowerCase().trim();
                const rolLowerCase = row.roles?.toLowerCase().trim();
                return (
                  !searchLowerCase ||
                  tituloLowerCase?.includes(searchLowerCase) ||
                  rolLowerCase?.includes(searchLowerCase)
                );
              }).map((tarea: any) => {
                const isLast = tarea.id === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-0 px-4"
                  : "p-0 px-4 border-b border-blue-gray-100/50 ";
                if (tarea.tipo == "programadas" && tarea.id != null) {
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
                            className="font-normal capitalize"
                          >
                            {tarea.frecuencia}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes}`}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal whitespace-break-spaces capitalize"
                          >
                            {tarea["meses especificos"]?.map(
                              (mes: any, index: number) =>
                                index !== tarea["meses especificos"].length - 1
                                  ? mes + ", "
                                  : mes
                            )}
                          </Typography>
                        </div>
                      </td>
                      <td
                        className={`${classes}  bg-blue-gray-100/20`}
                      >
                        <EditProject
                          id={tarea.id}
                          tipo="programadas"
                          tarea={tarea}
                        />
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

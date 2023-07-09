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
import { useState } from "react";

const TABLE_HEAD = ["Titulo", "Duración", "Roles", "Estado", "Creación", "test", ""];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Preparación del lugar de trabajo",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
    id: 1,
    duracion: "2 horas",
    test: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Revisión y respuesta de correo electronico",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
    id: 2,
    duracion: "1 hora",
    test: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Organización y mantenimiento de archivos",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
    id: 3,
    duracion: "3 horas",
    test: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Preparación del lugar de trabajo",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
    id: 4,
    duracion: "2 horas",
    test: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Revisión y respuesta de correo electronico",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
    id: 5,
    duracion: "1 hora",
    test: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Organización y mantenimiento de archivos",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
    id: 6,
    duracion: "3 horas",
    test: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Preparación del lugar de trabajo",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
    id: 7,
    duracion: "2 horas",
    test: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Revisión y respuesta de correo electronico",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
    id: 8,
    duracion: "1 hora",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Organización y mantenimiento de archivos",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
    id: 9,
    duracion: "3 horas",
  },
];

interface Row {
  img: string;
  name: string;
  email: string;
  job: string;
  org: string;
  online: boolean;
  date: string;
  id: number;
  duracion: string;
  test: string;
}

interface ArrayRow {
  rows: Row[];
}

function ProjectsTable() {

  return (
    <>
      <div className="pb-4 flex items-center justify-between gap-8 bg-[#fcfcfc]  whitespace-nowrap">
        <div >
          <Typography variant="h5" color="blue-gray">
            Tareas rutinarias
          </Typography>

        </div>
        <div className="flex shrink-0 flex-col gap-2 lg:flex-row">
        <div className="w-68">
          <Input label="Buscar" icon={<MagnifyingGlassIcon/>} />
        </div>
          <AddProject tipo="rutinaria"/>
        </div>
      </div>
      <Card className="h-[calc(100vh-9rem)] shadow-none bg-white border tabla px-2 ">
        <CardBody className="p-0 table-auto overflow-auto whitespace-nowrap max-w-[calc(100vw-19rem)]">
          <table className="text-left mt-4 mb-2">
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
              {TABLE_ROWS.map(
                ({ name, email, job, org, online, date, id ,duracion, test}, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-0 px-4"
                    : "p-0 px-4 border-b border-blue-gray-100/50 ";

                  return (
                    <tr key={name} className="hover:bg-blue-gray-100/30 bg-white">
                      <td className={`${classes} w-2/5`}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
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
                              {duracion}
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
                            {job}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes} w-2/10  bg-blue-gray-100/20`}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={online ? "online" : "offline"}
                            color={online ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={`${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {test}
                        </Typography>
                      </td>
                      <td className={`${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={`${classes}  bg-blue-gray-100/20 flex-row flex-auto flex justify-center w-auto`}>
                          <EditProject id={id} />
                          <ViewProject id={id}/>
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

export default ProjectsTable;

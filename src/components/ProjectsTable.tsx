import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
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

const TABLE_HEAD = ["Titulo", "Roles", "Estado", "Creación", ""];

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
}

interface ArrayRow {
  rows: Row[];
}

function ProjectsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
 

  return (
    <>
      <div className="pb-4 flex items-center justify-between gap-8 bg-[#f2f2f2]">
        <div>
          <Typography variant="h5" color="blue-gray">
            Lista de Tareas
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Ve información sobre todas las tareas
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <AddProject />
        </div>
      </div>
      <Card className="h-[calc(100vh-12rem)] w-auto shadow-none bg-[#f2f2f2] border">
        <CardBody className="overflow-auto p-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
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
                ({ name, email, job, org, online, date, id }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name} className="hover:bg-gray-200 bg-gray-100">
                      <td className={classes}>
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
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {job}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {org}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={online ? "online" : "offline"}
                            color={online ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className="flex-row flex-auto">
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

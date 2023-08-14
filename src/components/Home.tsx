import React, { useState , useEffect} from "react";
import Topnav from "./Topnav";
import ExcelToJSON from "../data/ExcelToJson";
import { Link } from "react-router-dom";
import {ReadJson}  from "../data/ReadJson";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge,
} from "@tremor/react";
import {
  allmonths,
  getLast12Months,
  norutinariasbyrole,
  getcapacidadvaluebyfilter,
  rutinariasbyrole,
  getPersonasNecesarias,
  averagetotal,
  programadasbyrole,
  bymonth,
  getroledata,
  gettotal,
  getAllMonths,
  calculateDuration,
  bymonthprogramadas,
  bymonthyearly
} from "../data/Functions";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import tasks from "../../src-tauri/tareas.json";
import RolesList from "../../src-tauri/roles.json";
import {JsonToExcel} from "../data/JsonToExcel";



function Home() {
  const currentDate: Date = new Date();
  const [roles, setRoles] = useState<any[]>([]);
  const [tareas, setTareas] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await  ReadJson("roles");
      const tareas = await  ReadJson("tareas");
      setRoles(roles);
      setTareas(tareas);
    };
    fetchData();
  }, [])
  
  // To get the individual components of the date
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();
  const day: number = currentDate.getDate();
  const months: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];


  const months2: string[] = [
    "",
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const today2 = `${months2[month]} - ${year}`;

  const today = `${months[month]} ${day}, ${year}`;
  const last12Months = getLast12Months(); //ultimos 12 meses
  const norutinariasMes = norutinariasbyrole(roles, tareas); //datos por rol no rutinarias
  const rutinariasMes = rutinariasbyrole(roles, tareas); //datos por rol rutinarias
  const programadasMes = programadasbyrole(roles, tareas); //datos por rol programadas
  const rolesInfo = getroledata(roles); //datos por rol totales
  const lastyearRutina = bymonth(last12Months, rutinariasMes, roles);
  const lastyearNorutina = bymonth(last12Months, norutinariasMes, roles);
  const lastyearProgramada = bymonth(last12Months, programadasMes, roles);
  const [filter, setFilter] = useState("todos");
  bymonthprogramadas(lastyearProgramada, tareas, last12Months, "programada"); //agrega actividades con fecha de inicio y termino a cada mes sgun corresponda
  bymonthprogramadas(lastyearNorutina, tareas, last12Months, "no rutinaria");
  bymonthyearly(lastyearProgramada, tareas, last12Months, "programadas");

  const totalbymonth = gettotal(
    lastyearRutina,
    lastyearNorutina,
    lastyearProgramada
  );
  const totaldemanda = averagetotal(totalbymonth);
  const personasnecesarias = getPersonasNecesarias(
    "necesarias",
    totaldemanda,
    rolesInfo,
    filter
  );
  const personasactuales = getPersonasNecesarias(
    "actuales",
    totaldemanda,
    rolesInfo,
    filter
  );
  const valuecapacidad: number = getcapacidadvaluebyfilter(rolesInfo, filter);
  
  const graphdata = () => {
    let data: any = [];
    totalbymonth.map((item: any, index: number) => {
      const pv = Math.max(0, item.datos[month-1][1] - rolesInfo[index][2]);
      data.push({
        name: index,
        Capacidad: rolesInfo[index][2],
        Sobrecarga: pv,
      });
    });
    data = data.slice(0, data.length - 1);
    return data;
  };

  const data = graphdata();

  return (
    <div className="w-full h-full pb-4 px-5 pt-6  gap-8">
      <div className="flex flex-row h-full">
        <div className="w-full h-auto">
          <div className="flex justify-center pr-6">
            <Typography variant="h5" color="blue-gray">
              {today}
            </Typography>
          </div>
          <div className="py-2 pr-6">
            <Card className="ring-1 ring-gray-300 rounded-lg">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Mes Actual  
                </Typography>
                <Table className="py-2 max-h-[17rem] overflow-auto">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="p-0">Id</TableHeaderCell>
                      <TableHeaderCell className="p-0">Rol</TableHeaderCell>
                      <TableHeaderCell className="p-0 px-2 text-center">
                        Demanda
                      </TableHeaderCell>
                      <TableHeaderCell className="p-0 px-2 text-center">
                        Capacidad
                      </TableHeaderCell>
                      <TableHeaderCell className="p-0 px-2 text-center">
                        Faltante
                      </TableHeaderCell>
                      <TableHeaderCell className="p-0 px-2">
                        Estado
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {totalbymonth.map((item: any, index: number) => {
                      return (
                        <TableRow key={index} className="text-center">
                          <TableCell className="capitalize p-0">
                            {index}
                          </TableCell>
                          <TableCell className="capitalize p-0">
                            {item.rol}
                          </TableCell>
                          <TableCell className="px-2 p-0 text-center">
                            {item.datos[month-1][1].toFixed(0)} HH
                          </TableCell>
                          <TableCell className="px-2 p-0 text-center">
                            {rolesInfo[index][2].toFixed(0)} HH
                          </TableCell>
                          <TableCell className="px-2 p-0 text-center">
                            {(
                              rolesInfo[index][2] - item.datos[month-1][1]
                            ).toFixed(0)}{" "}
                            HH
                          </TableCell>
                          <TableCell className="p-0 py-2">
                            <Badge
                              style={{
                                backgroundColor:
                                  item.datos[month-1][1] > rolesInfo[index][2]
                                    ? "#FFC9C9"
                                    : "#D3F9D8",
                                color:
                                  item.datos[month-1][1] > rolesInfo[index][2]
                                    ? "#E03131"
                                    : "#37B24D",
                              }}
                              className="px-3 py-1 rounded-md"
                            >
                              {item.datos[month-1][1] > rolesInfo[index][2]
                                ? "Sobrecarga"
                                : "Normal"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
            <Card className="ring-1 ring-gray-300 rounded-lg mt-4">
              <CardBody className="flex justify-center">
                <div className="w-fit">
                  <div className="text-center">Demanda</div>
                  <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"
                      label = {{
                        value: "Id de rol",
                        position: "insideBottom",
                        
                      }}
                    />
                    <YAxis
                      label={{
                        value: "horas",
                        angle: -90,
                        position: "left",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Capacidad" stackId="a" fill="#37B24D" />
                    <Bar dataKey="Sobrecarga" stackId="a" fill="#E03131" />
                  </BarChart>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="mr-0 h-full mt-3">
          <Card className="mt-6 w-[18rem] ring-1 ring-gray-300 rounded-lg">
            <CardBody>
              <div className="pb-8">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Importar datos desde excel
                </Typography>
                <ExcelToJSON />
              </div>

              <div className="pb-8">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Exportar datos a excel
                </Typography>
                <JsonToExcel/>
              </div>
              <div className="pb-2">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Exportar dashboard a PDF
                </Typography>
                <Link to="/pdf-screen">
                <Button>Descargar PDF</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;

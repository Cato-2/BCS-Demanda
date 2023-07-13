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
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { Card, List, ListItem, Title } from "@tremor/react";
import React, { PureComponent } from "react";
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
} from "recharts";
import Grafico from "./Grafico";
import tasks from "../../src-tauri/tareas.json";
import RolesList from "../../src-tauri/roles.json";
import Roles from "./Roles";
import { useState, useEffect } from "react";

const cities = [
  {
    item: "Número de personas",
    valor: "3",
  },
  {
    item: "Demanda del sistema",
    valor: "532 HH",
  },
  {
    item: "Capacidad ofertada",
    valor: "504 HH",
  },
  {
    item: "Capacidad residual",
    valor: "-28 HH",
  },
  {
    item: "Personas necesarias",
    valor: "3,25",
  },
];

const data = [
  {
    name: "Proyectos",
    enero: "100",
    febrero: "200",
    marzo: "300",
    abril: "400",
    mayo: "500",
    junio: "600",
    julio: "700",
    agosto: "800",
    septiembre: "900",
    octubre: "1000",
    noviembre: "1100",
    diciembre: "1200",
    special: false,
  },
  {
    name: "Actividades de rutina",
    enero: "100",
    febrero: "200",
    marzo: "300",
    abril: "400",
    mayo: "500",
    junio: "600",
    julio: "700",
    agosto: "800",
    septiembre: "900",
    octubre: "1000",
    noviembre: "1100",
    diciembre: "1200",
    special: false,
  },
  {
    name: "Fuera de rutina",
    enero: "100",
    febrero: "200",
    marzo: "300",
    abril: "400",
    mayo: "500",
    junio: "600",
    julio: "700",
    agosto: "800",
    septiembre: "900",
    octubre: "1000",
    noviembre: "1100",
    diciembre: "1200",
    special: false,
  },
  {
    name: "Total demanda",
    enero: "100",
    febrero: "200",
    marzo: "300",
    abril: "400",
    mayo: "500",
    junio: "600",
    julio: "700",
    agosto: "800",
    septiembre: "900",
    octubre: "1000",
    noviembre: "1100",
    diciembre: "1200",
    special: true,
  },
  {
    name: "Mediana de demanda",
    enero: "100",
    febrero: "200",
    marzo: "300",
    abril: "400",
    mayo: "500",
    junio: "600",
    julio: "700",
    agosto: "800",
    septiembre: "900",
    octubre: "1000",
    noviembre: "1100",
    diciembre: "1200",
    special: false,
  },
  {
    name: "Capacidad del sistema",
    enero: "100",
    febrero: "200",
    marzo: "300",
    abril: "400",
    mayo: "500",
    junio: "600",
    julio: "700",
    agosto: "800",
    septiembre: "900",
    octubre: "1000",
    noviembre: "1100",
    diciembre: "1200",
    special: false,
  },
  {
    name: "Capacidad del sistema real",
    enero: "100",
    febrero: "200",
    marzo: "300",
    abril: "400",
    mayo: "500",
    junio: "600",
    julio: "700",
    agosto: "800",
    septiembre: "900",
    octubre: "1000",
    noviembre: "1100",
    diciembre: "1200",
    special: true,
  },
];

const data2 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const roles = RolesList;
const tareas = tasks;

function Demanda() {
  const allmonths = [
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

  const getLast12Months = () => {
    const months = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    for (let i = 0; i < 12; i++) {
      const month = (currentMonth - i + 12) % 12;
      const year = currentMonth >= i ? currentYear : currentYear - 1;
      months.push(`${allmonths[month]} - ${year}`);
    }

    return months.reverse();
  };

  const last12Months = getLast12Months();
  //console.log(last12Months);

  const rutinariasbyrole = (Roles: any[], Tasks: any[]) => {
    const rutinarias: any[] = [];
    Roles.map((role: any) => {
      let acu = 0;
      if (role.nombre != undefined) {
        Tasks.map((task: any) => {
          if (task.roles == role.nombre || task.roles == "todos") {
            //task.roles.indexOf(role.nombre) !== -1
            if (task.frecuencia == "diaria") {
              acu = task.duracion * 4 * 2.5 + acu;
            }
          }
        });
        rutinarias.push([role.nombre, acu]);
        acu = 0;
      }
    });

    let aux = 0;
    for (let i = 0; i < rutinarias.length; i++) {
      aux = aux + rutinarias[i][1];
    }
    rutinarias.push(["todos", aux]);

    return rutinarias;
  };

  const norutinariasbyrole = (Roles: any[], Tasks: any[]) => {
    const norutinarias: any[] = [];
    Roles.map((role: any) => {
      let acu = 0;
      if (role.nombre != undefined) {
        Tasks.map((task: any) => {
          if (task.roles == role.nombre || task.roles == "todos") {
            //task.roles.indexOf(role.nombre) !== -1
            if (task.frecuencia == "mensual") {
              acu = task.duracion * 4 * 1.5 + acu;
            }
          }
        });
        norutinarias.push([role.nombre, acu]);
        acu = 0;
      }
    });

    let aux = 0;
    for (let i = 0; i < norutinarias.length; i++) {
      aux = aux + norutinarias[i][1];
    }
    norutinarias.push(["todos", aux]);

    return norutinarias;
  };

  const programadasbyrole = (Roles: any[], Tasks: any[]) => {
    const programadas: any[] = [];
    Roles.map((role: any) => {
      let acu = 0;
      if (role.nombre != undefined) {
        Tasks.map((task: any) => {
          if (task.roles == role.nombre || task.roles == "todos") {
            //task.roles.indexOf(role.nombre) !== -1
            if (task.frecuencia == "mensual") {
              acu = task.duracion * 4 * 0.75 + acu;
            }
          }
        });
        programadas.push([role.nombre, acu]);
        acu = 0;
      }
    });

    let aux = 0;
    for (let i = 0; i < programadas.length; i++) {
      aux = aux + programadas[i][1];
    }
    programadas.push(["todos", aux]);

    return programadas;
  };

  const norutinariasMes = norutinariasbyrole(roles, tareas);
  const rutinariasMes = rutinariasbyrole(roles, tareas);
  const programadasMes = programadasbyrole(roles, tareas);
  console.log("rutinaria", rutinariasMes);
  console.log("norutinaria, ", norutinariasMes);
  console.log("programadas, ", programadasMes);

  const bymonth = (last12Months: any[], rutinariasMes: any[], Roles: any) => {
    let lastyear: any[] = [];
    let aux: any[] = [];
    rutinariasMes.map((role: any) => {
      if (role[0] != undefined) {
        last12Months.map((month: any) => {
          rutinariasMes.map((rutinaria: any) => {
            if (rutinaria[0] === role[0]) {
              aux.push([month, rutinaria[1]]);
            }
          });
        });
        lastyear.push({ rol: role[0], datos: aux });
        aux = [];
      }
    });
    console.log("lastyear", lastyear);
    return lastyear;
  };

  const lastyearRutina = bymonth(last12Months, rutinariasMes, roles);
  const lastyearNorutina = bymonth(last12Months, norutinariasMes, roles);
  const lastyearProgramada = bymonth(last12Months, programadasMes, roles);
  const [filter, setFilter] = useState("todos");

  const onClickHandler = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <div>
      <div className="w-[20rem] p-2">
        <SearchSelect>
          {lastyearRutina.map((role) => (
            <SearchSelectItem
              key={role.rol}
              value={role.rol}
              onClick={() => onClickHandler(role.rol)}
            >
              {role.rol}
            </SearchSelectItem>
          ))}
        </SearchSelect>
      </div>
      <div className="px-2 pt-0">
        <Card>
          <Table className="overflow-auto max-w-[calc(100vw-20rem)]">
            <TableHead>
              <TableRow>
                <TableHeaderCell> </TableHeaderCell>
                {last12Months.map((month) => (
                  <TableHeaderCell key={month}>{month}</TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="p-0">{"Actividades de rutina"}</TableCell>
                {lastyearRutina.map(
                  (role, index) =>
                    role.rol === filter && (
                      <React.Fragment key={index}>
                        {role.datos.map((dato: any, dataIndex: number) => (
                          <TableCell className="p-0 pl-4" key={dataIndex}>{dato[1]}</TableCell>
                        ))}
                      </React.Fragment>
                    )
                )}
              </TableRow>
              <TableRow>
              <TableCell className="p-0">{"Actividades de no rutina"}</TableCell>
                {lastyearNorutina.map(
                  (role, index) =>
                    role.rol === filter && (
                      <React.Fragment key={index}>
                        {role.datos.map((dato: any, dataIndex: number) => (
                          <TableCell className="p-0 pl-4" key={dataIndex}>{dato[1]}</TableCell>
                        ))}
                      </React.Fragment>
                    )
                )}
              </TableRow>
              <TableRow>
              <TableCell className="p-0">{"Actividades programadas"}</TableCell>
                {lastyearProgramada.map(
                  (role, index) =>
                    role.rol === filter && (
                      <React.Fragment key={index}>
                        {role.datos.map((dato: any, dataIndex: number) => (
                          <TableCell className="p-0 pl-4" key={dataIndex}>{dato[1]}</TableCell>
                        ))}
                      </React.Fragment>
                    )
                )}
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
      <div className="flex flex-row">
        <div className="p-2">
          <Card className="w-[20rem] h-full">
            <Title>Indicadores</Title>
            <List className="pt-4">
              {cities.map((item) => (
                <ListItem key={item.item}>
                  <span>{item.item}</span>
                  <span>{item.valor}</span>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
        <div className="w-full p-2 pl-0">
          <Card>
            <Grafico />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Demanda;

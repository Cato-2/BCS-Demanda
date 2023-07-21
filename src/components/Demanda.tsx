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
import { Card, List, ListItem, Title, Button} from "@tremor/react";
import React from "react";
import Grafico from "./Grafico";
import tasks from "../../src-tauri/tareas.json";
import RolesList from "../../src-tauri/roles.json";
import Indicador from "./Indicador";
import Riesgos from "./Riesgos";
import Roles from "./Roles";
import { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const roles = RolesList; //json
const tareas = tasks; //json

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
    const currentYear = currentDate.getFullYear();

    let startMonth = currentMonth - 6;
    let startYear = currentYear;

    if (startMonth < 0) {
      startMonth += 12;
      startYear -= 1;
    }

    for (let i = 0; i < 12; i++) {
      const month = (startMonth + i) % 12;
      const year = startYear + Math.floor((startMonth + i) / 12);
      months.push(`${allmonths[month]} - ${year}`);
    }

    return months;
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
            if (task.frecuencia == "frecuente") {
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
            if (task.frecuencia == "periodicas") {
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
            if (task.frecuencia == "ocasionales") {
              acu = task.duracion * 4 * 0.75 + acu;
            }
            //if tiene fecha de inicio y fecha de termino calcular la cantidad de meses y multiplicar por la duracion
            //no se realizaria la multiplicacion por 4 ni por 0.75 porque ya se considera en la duracion
            // se suma a acu
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
    return lastyear;
  };

  const getroledata = () => {
    let aux: any[] = [];
    let contador = 0;
    let cantidad = 0;
    let avg = 0;
    let rolesnumber = 0;
    roles.map((role: any, item) => {
      aux.push([
        role.nombre,
        role.cantidad,
        role.cantidad * role["horas semanales"],
        role["horas semanales"],
      ]);
      contador = contador + role.cantidad * role["horas semanales"];
      avg = avg + role["horas semanales"];
      cantidad = cantidad + role.cantidad;
      rolesnumber = rolesnumber + 1;
    });
    aux.push(["todos", cantidad, contador, avg / rolesnumber]);
    return aux;
  };
  const rolesInfo = getroledata();
  const lastyearRutina = bymonth(last12Months, rutinariasMes, roles);
  const lastyearNorutina = bymonth(last12Months, norutinariasMes, roles); // esto no deberia ser así, hay que agregarle los proyectos que tienen un periodo de tiempo
  const lastyearProgramada = bymonth(last12Months, programadasMes, roles); // esto no deberia ser así esto no deberia ser así, hay que agregarle los proyectos que tienen un periodo de tiempo
  const [filter, setFilter] = useState("todos");

  const gettotal = () => {
    let aux: any[] = [];
    let aux2: any[] = [];
    for (let i = 0; i < lastyearRutina.length; i++) {
      for (let j = 0; j < lastyearRutina[i].datos.length; j++) {
        aux2.push([
          lastyearRutina[i].datos[j][0],
          lastyearRutina[i].datos[j][1] +
            lastyearNorutina[i].datos[j][1] +
            lastyearProgramada[i].datos[j][1],
        ]);
      }
      aux.push({ rol: lastyearRutina[i].rol, datos: aux2 });
      aux2 = [];
    }
    return aux;
  };

  const averagetotal = () => {
    let aux: any[] = [];
    totalbymonth.map((role: any) => {
      let acu = 0;
      role.datos.map((dato: any) => {
        acu = acu + dato[1];
      });
      aux.push([role.rol, acu / 12]);
    });
    return aux;
  };

  const totalbymonth = gettotal();
  const totaldemanda = averagetotal();

  const getPersonasNecesarias = (tipo: string) => {
    // Calculate the required number of people for the selected role
    let aux = 0;

    totaldemanda.forEach((role, index) => {
      if (role[0] === filter) {
        if (tipo === "necesarias") {
          aux = role[1] / rolesInfo[index][3];
        } else {
          aux = rolesInfo[index][1];
        }
      }
    });

    // Update the state with the calculated values
    return aux;
  };

  const personasnecesarias = getPersonasNecesarias("necesarias");
  const personasactuales = getPersonasNecesarias("actuales");

  const getcapacidadvaluebyfilter = (): number => {
    const foundRole = rolesInfo.find((item) => item[0] === filter);
    if (foundRole) {
      return foundRole[2];
    }
    return 0; // Or any default value if role with the specified filter is not found
  };

  const valuecapacidad: number = getcapacidadvaluebyfilter();

  const onClickHandler = (value: string) => {
    setFilter(value);
  };

  return (
    <div>
      <div className="flex flex-row justify-between p-2">
      <div className="w-[20rem] ">
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
      <div className="pr-2">
        <Link to="/pdf-screen">
            <Button>
              <ArrowDownTrayIcon className="w-5 h-5" />
            </Button>
        </Link>
      </div>
      </div> 
      <div className="px-2 pt-0">
        <Card className="overflow-auto max-w-[calc(100vw-17rem)]">
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
                <TableCell className="p-0">
                  {"Actividades programadas"}
                </TableCell>
                {lastyearProgramada.map(
                  (role, index) =>
                    role.rol === filter && (
                      <React.Fragment key={index}>
                        {role.datos.map((dato: any, dataIndex: number) => (
                          <TableCell
                            className="p-0 text-center"
                            key={dataIndex}
                          >
                            {dato[1]}
                          </TableCell>
                        ))}
                      </React.Fragment>
                    )
                )}
              </TableRow>
              <TableRow>
                <TableCell className="p-0">
                  {"Actividades de no rutina"}
                </TableCell>
                {lastyearNorutina.map(
                  (role, index) =>
                    role.rol === filter && (
                      <React.Fragment key={index}>
                        {role.datos.map((dato: any, dataIndex: number) => (
                          <TableCell
                            className="p-0 text-center"
                            key={dataIndex}
                          >
                            {dato[1]}
                          </TableCell>
                        ))}
                      </React.Fragment>
                    )
                )}
              </TableRow>
              <TableRow>
                <TableCell className="p-0">{"Actividades de rutina"}</TableCell>
                {lastyearRutina.map(
                  (role, index) =>
                    role.rol === filter && (
                      <React.Fragment key={index}>
                        {role.datos.map((dato: any, dataIndex: number) => (
                          <TableCell
                            className="p-0 text-center"
                            key={dataIndex}
                          >
                            {dato[1]}
                          </TableCell>
                        ))}
                      </React.Fragment>
                    )
                )}
              </TableRow>
              <TableRow className="bg-gray-200 font-bold">
                <TableCell className="p-0">{"Total demanda"}</TableCell>
                {totalbymonth.map(
                  (role, index) =>
                    role.rol == filter && (
                      <React.Fragment key={index}>
                        {role.datos.map((dato: any, dataIndex: number) => (
                          <TableCell
                            className="p-0 text-center"
                            key={dataIndex}
                          >
                            {dato[1]}
                          </TableCell>
                        ))}
                      </React.Fragment>
                    )
                )}
              </TableRow>
              <TableRow>
                <TableCell className="p-0">{"Capacidad ofertada"}</TableCell>
                {rolesInfo.map((role, index) => {
                  if (role[0] === filter) {
                    const cells = [];
                    for (let i = 0; i < last12Months.length; i++) {
                      cells.push(
                        <TableCell className="p-0 text-center" key={index + i}>
                          {role[2]}
                        </TableCell>
                      );
                    }
                    return cells;
                  } else {
                    return null; // Return null for elements that don't meet the condition
                  }
                })}
              </TableRow>
              <TableRow>
                <TableCell className="p-0">{"Capacidad residual"}</TableCell>
                {totalbymonth.map((role, index) => {
                  if (role.rol === filter) {
                    return (
                      <React.Fragment key={index}>
                        {role.datos.map((dato: any, dataIndex: number) => {
                          // Assuming `valuecapacidad` is a number, you may want to add a parseFloat or parseInt here if needed.
                          const capacidadResidual = valuecapacidad - dato[1];
                          const style =
                            capacidadResidual < 0 ? { color: "red" } : {};
                          return (
                            <TableCell
                              className="p-0 text-center"
                              key={dataIndex}
                              style={style}
                            >
                              {capacidadResidual}
                            </TableCell>
                          );
                        })}
                      </React.Fragment>
                    );
                  } else {
                    return null; // Return null for elements that don't meet the condition
                  }
                })}
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
              <ListItem>
                <span>Número de personas</span>
                {rolesInfo.map((role, index) => {
                  if (role[0] === filter) {
                    return <span key={index}>{role[1]}</span>;
                  }
                })}
              </ListItem>
              <ListItem>
                <span>Demanda del sistema</span>
                {totaldemanda.map((role, index) => {
                  if (role[0] === filter) {
                    return <span key={index}>{role[1]} HH</span>;
                  }
                })}
              </ListItem>
              <ListItem>
                <span>Capacidad ofertada</span>
                {rolesInfo.map((role, index) => {
                  if (role[0] === filter) {
                    return <span key={index}>{role[2]} HH</span>;
                  }
                })}
              </ListItem>
              <ListItem>
                <span>Capacidad residual</span>
                {rolesInfo.map((role, i) => {
                  if (role[0] === filter) {
                    const capacidadResidual = role[2] - totaldemanda[i][1];
                    const style = capacidadResidual < 0 ? { color: "red" } : {};
                    return (
                      <span key={i} style={style}>
                        {capacidadResidual} HH
                      </span>
                    );
                  }
                  return null; // Return null for elements that don't meet the condition
                })}
              </ListItem>
              <ListItem>
                <span>Personas necesarias</span>
                {totaldemanda.map((role, index) => {
                  if (role[0] === filter) {
                    const personasActual = rolesInfo[index][1];
                    const style =
                      personasActual < role[1] / rolesInfo[index][3]
                        ? { color: "red" }
                        : {};
                    return (
                      <span key={index} style={style}>
                        {(role[1] / rolesInfo[index][3]).toFixed(2)}
                      </span>
                    );
                  }
                  return null;
                })}
              </ListItem>
            </List>
          </Card>
        </div>
        <div className="max-w-[calc(100vw-37rem)] w-full p-2 pl-1">
          <Card className="max-w-full min-w-[18rem] overflow-auto flex flex-row h-[18rem] p-0 pt-6">
            <Grafico
              filter={filter}
              capacidadofertada={rolesInfo}
              demandapromedio={totaldemanda}
              demandapormes={totalbymonth}
              clas
            />
            <Indicador
              personasnecesarias={personasnecesarias}
              personasactuales={personasactuales}
              demandapromedio={totaldemanda} //demanda promedio por rol
              filter={filter} //rol seleccionado
              capacidadofertada={rolesInfo} //capacidad ofertada por rol
            />
          </Card>
        </div>
      </div>
      <div className=" p-2 pt-1 flex ">
        <Riesgos
          filter={filter} //rol seleccionado
          capacidadofertada={rolesInfo} //capacidad ofertada por rol
          demandapromedio={totaldemanda} //demanda promedio por rol
          demandapormes={totalbymonth} //demanda por mes por rol
          personasnecesarias={personasnecesarias} //personas necesarias por rol
          personasactuales={personasactuales} //personas actuales por rol
        />
      </div>
    </div>
  );
}

export default Demanda;

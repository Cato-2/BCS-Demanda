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
import { Card, List, ListItem, Title, Button } from "@tremor/react";
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

const roles = RolesList; //json
const tareas = tasks; //json

function Demanda() {

 const last12Months = getLast12Months();
 const norutinariasMes = norutinariasbyrole(roles, tareas);
 const rutinariasMes = rutinariasbyrole(roles, tareas);
 const programadasMes = programadasbyrole(roles, tareas);
 const rolesInfo = getroledata(roles);
 const lastyearRutina = bymonth(last12Months, rutinariasMes, roles);
 const lastyearNorutina = bymonth(last12Months, norutinariasMes, roles); // esto no deberia ser así, hay que agregarle los proyectos que tienen un periodo de tiempo
 const lastyearProgramada = bymonth(last12Months, programadasMes, roles);

bymonthprogramadas(lastyearProgramada, tareas, last12Months, "programadas"); //agrega actividades con fecha de inicio y termino a cada mes sgun corresponda
bymonthprogramadas(lastyearNorutina, tareas, last12Months, "no rutinarias");
bymonthyearly(lastyearProgramada, tareas, last12Months, "programadas");
const totalbymonth = gettotal(
  lastyearRutina,
  lastyearNorutina,
  lastyearProgramada
);
const totaldemanda = averagetotal(totalbymonth);  

const [filter, setFilter] = useState("todos");
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
                            {dato[1].toFixed(0)}
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
                            {dato[1].toFixed(0)}
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
                            {dato[1].toFixed(0)}
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
                            {dato[1].toFixed(0)}
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
                          {role[2].toFixed(0)}
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
                              {capacidadResidual.toFixed(0)}
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
                    return <span key={index}>{role[1].toFixed(0)}</span>;
                  }
                })}
              </ListItem>
              <ListItem>
                <span>Demanda del sistema</span>
                {totaldemanda.map((role, index) => {
                  if (role[0] === filter) {
                    return <span key={index}>{role[1].toFixed(0)} HH</span>;
                  }
                })}
              </ListItem>
              <ListItem>
                <span>Capacidad ofertada</span>
                {rolesInfo.map((role, index) => {
                  if (role[0] === filter) {
                    return <span key={index}>{role[2].toFixed(0)} HH</span>;
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
                        {capacidadResidual.toFixed(0)} HH
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
                        {(role[1] / rolesInfo[index][3]).toFixed(1)}
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

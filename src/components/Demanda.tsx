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
import React, {useEffect} from "react";
import Grafico from "./Grafico";
import tasks from "../../src-tauri/tareas.json";
import RolesList from "../../src-tauri/roles.json";
import Indicador from "./Indicador";
import Riesgos from "./Riesgos";
import Roles from "./Roles";
import { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ReadJson } from "../data/ReadJson";

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
  bymonthyearly,
  applyfilter,
  getcapacidad,
  getpersonas,
  gettotaldemandafilter,
  getaveragecapacidad,
  getaveragecapacidad2
} from "../data/Functions";


function Demanda() {
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
  const last12Months = getLast12Months();
  const norutinariasMes = norutinariasbyrole(roles, tareas);
  const rutinariasMes = rutinariasbyrole(roles, tareas);
  const programadasMes = programadasbyrole(roles, tareas);
  const rolesInfo = getroledata(roles);
  let lastyearRutina = bymonth(last12Months, rutinariasMes, roles);
  let lastyearNorutina = bymonth(last12Months, norutinariasMes, roles); // esto no deberia ser así, hay que agregarle los proyectos que tienen un periodo de tiempo
  let lastyearProgramada = bymonth(last12Months, programadasMes, roles);
  bymonthprogramadas(lastyearProgramada, tareas, last12Months, "programadas"); //agrega actividades con fecha de inicio y termino a cada mes sgun corresponda
  bymonthprogramadas(lastyearNorutina, tareas, last12Months, "no rutinarias");
  bymonthyearly(lastyearProgramada, tareas, last12Months, "programadas");
  let totalbymonth = gettotal(
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

  const onClickHandler = (value: string) => {
    setFilter(value);
  };

  let data = roles.map((role: any) => {
    return { value: role.nombre, label: role.nombre };
  });

  const [filter2, setfilter2] = useState([]);

  lastyearProgramada = applyfilter(lastyearProgramada, filter2);
  lastyearNorutina = applyfilter(lastyearNorutina, filter2);
  lastyearRutina = applyfilter(lastyearRutina, filter2);
  totalbymonth = applyfilter(totalbymonth, filter2);
  const handleChangeRoles = (selectedOption: any) => {
    setfilter2(selectedOption);
  };
  const arrcapacidad = getcapacidad(rolesInfo, filter2);
  const numpersonas = getpersonas(rolesInfo, filter2);
  const valuecapacidad: number = getcapacidadvaluebyfilter(
    arrcapacidad,
    filter
  );

  const capacidadResidual =
    arrcapacidad[0] - gettotaldemandafilter(totaldemanda, filter2);
  const colorStyle = capacidadResidual < 0 ? "red" : "inherit";

  return (
    <div>
      <div className="flex flex-row justify-between p-2">
        <div className="w-full pr-4">
          <Select
            isMulti
            name="colors"
            options={data}
            onChange={handleChangeRoles}
            className="basic-multi-select capitalize"
            classNamePrefix="select"
          />
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
                {lastyearProgramada.map((role, index) => (
                  <React.Fragment key={index}>
                    {role.datos.map((dato: any, dataIndex: number) => (
                      <TableCell className="p-0 text-center" key={dataIndex}>
                        {dato[1].toFixed(0)}
                      </TableCell>
                    ))}
                  </React.Fragment>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-0">
                  {"Actividades de no rutina"}
                </TableCell>
                {lastyearNorutina.map((role, index) => (
                  <React.Fragment key={index}>
                    {role.datos.map((dato: any, dataIndex: number) => (
                      <TableCell className="p-0 text-center" key={dataIndex}>
                        {dato[1].toFixed(0)}
                      </TableCell>
                    ))}
                  </React.Fragment>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-0">{"Actividades de rutina"}</TableCell>
                {lastyearRutina.map((role, index) => (
                  <React.Fragment key={index}>
                    {role.datos.map((dato: any, dataIndex: number) => (
                      <TableCell className="p-0 text-center" key={dataIndex}>
                        {dato[1].toFixed(0)}
                      </TableCell>
                    ))}
                  </React.Fragment>
                ))}
              </TableRow>
              <TableRow className="bg-gray-200 font-bold">
                <TableCell className="p-0">{"Total demanda"}</TableCell>
                {totalbymonth.map((role, index) => (
                  <React.Fragment key={index}>
                    {role.datos.map((dato: any, dataIndex: number) => (
                      <TableCell className="p-0 text-center" key={dataIndex}>
                        {dato[1].toFixed(0)}
                      </TableCell>
                    ))}
                  </React.Fragment>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-0">{"Capacidad ofertada"}</TableCell>
                {arrcapacidad.map((role, index) => {
                  return (
                    <TableCell className="p-0 text-center" key={index}>
                      {role}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="p-0">{"Capacidad residual"}</TableCell>
                {totalbymonth.map((role, index) => {
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
                <span>{numpersonas}</span>
              </ListItem>
              <ListItem>
                <span>Demanda del sistema</span>

                <span>
                  {gettotaldemandafilter(totaldemanda, filter2).toFixed(0)} HH
                </span>
              </ListItem>
              <ListItem>
                <span>Capacidad ofertada</span>
                <span>{arrcapacidad[0].toFixed(0)} HH</span>
              </ListItem>
              <ListItem>
                <span>Capacidad residual</span>
                <span style={{ color: colorStyle }}>
                  {`${capacidadResidual.toFixed(0)} HH`}
                </span>
              </ListItem>
              <ListItem>
                <span>Personas necesarias</span>
                <span>
                  {(
                    (gettotaldemandafilter(totaldemanda, filter2)/getaveragecapacidad2(rolesInfo, filter2))
                  ).toFixed(1)}
                </span>
              </ListItem>
            </List>
          </Card>
        </div>
        <div className="max-w-[calc(100vw-37rem)] w-full p-2 pl-1">
          <Card className="max-w-full min-w-[18rem] overflow-auto flex flex-row h-[18rem] p-0 pt-6">
            <Grafico
              filter={filter}
              capacidadofertada={getaveragecapacidad(rolesInfo, filter2)}
              demandapromedio={gettotaldemandafilter(totaldemanda, filter2)}
              demandapormes={totalbymonth}
              clas
            />
            <Indicador
              personasnecesarias={personasnecesarias}
              personasactuales={personasactuales}
              demandapromedio={gettotaldemandafilter(totaldemanda, filter2)} //demanda promedio por rol
              filter={filter} //rol seleccionado
              capacidadofertada={getaveragecapacidad(rolesInfo, filter2)} //capacidad ofertada por rol
            />
          </Card>
        </div>
      </div>
      <div className=" p-2 pt-1 flex ">
        <Riesgos
          filter={filter} //rol seleccionado
          capacidadofertada={rolesInfo} //capacidad ofertada por rol
          demandapromedio={gettotaldemandafilter(totaldemanda, filter2)} //demanda promedio por rol
          demandapormes={totalbymonth} //demanda por mes por rol
          personasnecesarias={personasnecesarias} //personas necesarias por rol
          personasactuales={personasactuales} //personas actuales por rol
        />
      </div>
    </div>
  );
}

export default Demanda;

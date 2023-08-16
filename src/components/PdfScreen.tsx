import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ReadJson } from "../data/ReadJson";

import {
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge,
  Button,
} from "@tremor/react";
import { Card, List, ListItem, Title } from "@tremor/react";
import Grafico2 from "./Grafico2";
import Indicador2 from "./Indicador2";
import Riesgos from "./Riesgos";
import { Link } from "react-router-dom";
import {
  getLast12Months,
  norutinariasbyrole,
  rutinariasbyrole,
  averagetotal,
  programadasbyrole,
  bymonth,
  getroledata,
  gettotal,
  getAllMonths,
  calculateDuration,
  bymonthprogramadas,
  bymonthyearly,
} from "../data/Functions";

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

// Variables ------------------------------------

interface MyPdfDocumentProps {
  RolesList: any[];
  tasks: any[];
}

const MyPdfDocument: React.FC<MyPdfDocumentProps> = ({
  RolesList,
  tasks
}) => {
  const roles = RolesList; //json
  const tareas = tasks; //json
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
  const getPersonasNecesarias = (tipo: string, rolnombre: string) => {
    // Calculate the required number of people for the selected role
    let aux = 0;

    totaldemanda.forEach((role: any, index: any) => {
      if (role[0] === rolnombre) {
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

  const getcapacidadvaluebyfilter = (rolnombre: string): number => {
    const foundRole = rolesInfo.find((item) => item[0] == rolnombre);
    if (foundRole) {
      return foundRole[2];
    }
    return 0; // Or any default value if role with the specified filter is not found
  };
  const pdfRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF("landscape"); // Set the orientation to 'landscape'
      const currentDate = new Date();
      const dateString = currentDate.toLocaleString();

      for (let i = 0; i < rolesInfo.length; i++) {
        const canvas = await html2canvas(
          pdfRef?.current!.childNodes[i] as HTMLElement
        );
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 10, 10, 280, 130); // Adjust the width and height as needed
        if (i !== rolesInfo.length - 1) {
          pdf.addPage("landscape"); // Add a new horizontal page for each graph
        }
      }

      pdf.save(`CD ${dateString}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between pt-5 border-b-2 border-gray-200 m-2 pb-2">
        <div className="w-full flex flex-row justify-center ">
          <span className="text-xl font-bold ">Vista previa</span>
        </div>
        <div>
          <Link to="/demanda" className="px-4">
            <Button>Back</Button>
          </Link>
          <Button onClick={generatePDF}>Descargar PDF</Button>
        </div>
      </div>
      <div ref={pdfRef}>
        {rolesInfo.map((role: any, index: number) => {
          const personasnecesarias = getPersonasNecesarias(
            "necesarias",
            role[0]
          );
          const personasactuales = getPersonasNecesarias("actuales", role[0]);
          const valuecapacidad: number = getcapacidadvaluebyfilter(role[0]);
          return (
            <div className="p-4 pt-10">
              <div className="capitalize text-xl font-bold">{role[0]}</div>
              <div>
                <Table className="w-fit">
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
                      <TableCell className="py-2">
                        {"Actividades programadas"}
                      </TableCell>
                      {lastyearProgramada.map(
                        (item: any, index: any) =>
                          item.rol == role[0] && (
                            <React.Fragment key={index}>
                              {item.datos.map(
                                (dato: any, dataIndex: number) => (
                                  <TableCell
                                    className="py-1 text-center"
                                    key={dataIndex}
                                  >
                                    {dato[1].toFixed(0)}
                                  </TableCell>
                                )
                              )}
                            </React.Fragment>
                          )
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1">
                        {"Actividades de no rutina"}
                      </TableCell>
                      {lastyearNorutina.map(
                        (item: any, index: any) =>
                          item.rol === role[0] && (
                            <React.Fragment key={index}>
                              {item.datos.map(
                                (dato: any, dataIndex: number) => (
                                  <TableCell
                                    className="py-1 text-center"
                                    key={dataIndex}
                                  >
                                    {dato[1].toFixed(0)}
                                  </TableCell>
                                )
                              )}
                            </React.Fragment>
                          )
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1">
                        {"Actividades de rutina"}
                      </TableCell>
                      {lastyearRutina.map(
                        (item: any, index: any) =>
                          item.rol === role[0] && (
                            <React.Fragment key={index}>
                              {item.datos.map(
                                (dato: any, dataIndex: number) => (
                                  <TableCell
                                    className="py-1 text-center"
                                    key={dataIndex}
                                  >
                                    {dato[1].toFixed(0)}
                                  </TableCell>
                                )
                              )}
                            </React.Fragment>
                          )
                      )}
                    </TableRow>
                    <TableRow className="bg-gray-200 font-bold">
                      <TableCell className="py-1">{"Total demanda"}</TableCell>
                      {totalbymonth.map(
                        (item, index) =>
                          item.rol == role[0] && (
                            <React.Fragment key={index}>
                              {item.datos.map(
                                (dato: any, dataIndex: number) => (
                                  <TableCell
                                    className="py-1 text-center"
                                    key={dataIndex}
                                  >
                                    {dato[1].toFixed(0)}
                                  </TableCell>
                                )
                              )}
                            </React.Fragment>
                          )
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1">
                        {"Capacidad ofertada"}
                      </TableCell>
                      {rolesInfo.map((item, index) => {
                        if (item[0] === role[0]) {
                          const cells = [];
                          for (let i = 0; i < last12Months.length; i++) {
                            cells.push(
                              <TableCell
                                className="py-1 text-center"
                                key={index + i}
                              >
                                {item[2].toFixed(0)}
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
                      <TableCell className="py-1">
                        {"Capacidad residual"}
                      </TableCell>
                      {totalbymonth.map((item, index) => {
                        if (item.rol == role[0]) {
                          return (
                            <React.Fragment key={index}>
                              {item.datos.map(
                                (dato: any, dataIndex: number) => {
                                  const capacidadResidual =
                                    valuecapacidad - dato[1];
                                  const style =
                                    capacidadResidual < 0
                                      ? { color: "red" }
                                      : {};
                                  return (
                                    <TableCell
                                      className="py-1 text-center"
                                      key={dataIndex}
                                      style={style}
                                    >
                                      {capacidadResidual.toFixed(0)}
                                    </TableCell>
                                  );
                                }
                              )}
                            </React.Fragment>
                          );
                        } else {
                          return null; // Return null for elements that don't meet the condition
                        }
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-row py-4">
                <Card className="w-[20rem] h-full">
                  <Title>Indicadores</Title>
                  <List className="pt-4">
                    <ListItem>
                      <span>Número de personas</span>
                      {rolesInfo.map((item, index) => {
                        if (item[0] === role[0]) {
                          return <span key={index}>{item[1].toFixed(1)}</span>;
                        }
                      })}
                    </ListItem>
                    <ListItem>
                      <span>Demanda del sistema</span>
                      {totaldemanda.map((item, index) => {
                        if (item[0] === role[0]) {
                          return (
                            <span key={index}>{item[1].toFixed(0)} HH</span>
                          );
                        }
                      })}
                    </ListItem>
                    <ListItem>
                      <span>Capacidad ofertada</span>
                      {rolesInfo.map((item, index) => {
                        if (item[0] === role[0]) {
                          return (
                            <span key={index}>{item[2].toFixed(0)} HH</span>
                          );
                        }
                      })}
                    </ListItem>
                    <ListItem>
                      <span>Capacidad residual</span>
                      {rolesInfo.map((item, i) => {
                        if (item[0] === role[0]) {
                          const capacidadResidual =
                            item[2] - totaldemanda[i][1];
                          const style =
                            capacidadResidual < 0 ? { color: "red" } : {};
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
                      {totaldemanda.map((item, index) => {
                        if (item[0] === role[0]) {
                          const personasActual = rolesInfo[index][1];
                          const style =
                            personasActual < item[1] / rolesInfo[index][3]
                              ? { color: "red" }
                              : {};
                          return (
                            <span key={index} style={style}>
                              {(item[1] / rolesInfo[index][3]).toFixed(1)}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </ListItem>
                  </List>
                </Card>
                <div className="flex flex-row py-5">
                  <Grafico2
                    filter={role[0]}
                    capacidadofertada={rolesInfo}
                    demandapromedio={totaldemanda}
                    demandapormes={totalbymonth}
                    clas
                  />
                  <Indicador2
                    personasnecesarias={personasnecesarias}
                    personasactuales={personasactuales}
                    demandapromedio={totaldemanda} //demanda promedio por rol
                    filter={role[0]} //rol seleccionado
                    capacidadofertada={rolesInfo} //capacidad ofertada por rol
                  />
                </div>
              </div>
              <div>
                <Riesgos
                  filter={role[0]} //rol seleccionado
                  capacidadofertada={rolesInfo} //capacidad ofertada por rol
                  demandapromedio={totaldemanda} //demanda promedio por rol
                  demandapormes={totalbymonth} //demanda por mes por rol
                  personasnecesarias={personasnecesarias} //personas necesarias por rol
                  personasactuales={personasactuales} //personas actuales por rol
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};



function PdfScreen() {
  const [RolesList, setRoles] = useState<any[]>([]);
  const [tasks, setTareas] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await ReadJson("roles");
      const tareas = await ReadJson("tareas");
      setRoles(roles);
      setTareas(tareas);
    };
    fetchData();
  }, []);
  
  return <MyPdfDocument  RolesList={RolesList} tasks={tasks} />;
}

export default PdfScreen;

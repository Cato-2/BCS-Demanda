import React, { useEffect , useRef} from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import tasks from "../../src-tauri/tareas.json";
import RolesList from "../../src-tauri/roles.json";
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
import Grafico from "./Grafico";
import Indicador from "./Indicador";
import Riesgos from "./Riesgos";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
const roles = RolesList; //json
const tareas = tasks; //json
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function PdfScreen() {
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

  const pdfRef = useRef<HTMLDivElement | null>(null);
  const downloadPDF = async () => {
    const input = pdfRef.current;
    html2canvas(input!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfwidth = pdf.internal.pageSize.getWidth();
      const pdfheight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight >= pdfwidth / pdfheight ? pdfwidth / imgWidth : pdfheight / imgHeight;
      const imgX = 0; // Align at the top-left corner
      const imgY = 0; // Align at the top-left corner
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('download.pdf');

    // Save the PDF
    pdf.save("download.pdf");
    });
  };
  
        

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

  const getPersonasNecesarias = (tipo: string, rolnombre: string) => {
    // Calculate the required number of people for the selected role
    let aux = 0;

    totaldemanda.forEach((role, index) => {
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

  return (
    <div>
      <Link to="/demanda">
        <Button>Back</Button>
      </Link>
      <Button onClick={downloadPDF}>Download</Button>
      <div ref={pdfRef} >
        {rolesInfo.map((role) => {
          const personasnecesarias = getPersonasNecesarias(
            "necesarias",
            role[0]
          );
          const personasactuales = getPersonasNecesarias("actuales", role[0]);
          const valuecapacidad: number = getcapacidadvaluebyfilter(role[0]);
          return (
            <div key={role.id} className="py-5">
              <span className="w-full p-4 capitalize text-lg">{role[0]}</span>
              <div className="px-2 pt-4">
                <Card className="">
                  <Table className="">
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
                          (item, index) =>
                            item.rol == role[0] && (
                              <React.Fragment key={index}>
                                {item.datos.map(
                                  (dato: any, dataIndex: number) => (
                                    <TableCell
                                      className="py-1 text-center"
                                      key={dataIndex}
                                    >
                                      {dato[1]}
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
                          (item, index) =>
                            item.rol === role[0] && (
                              <React.Fragment key={index}>
                                {item.datos.map(
                                  (dato: any, dataIndex: number) => (
                                    <TableCell
                                      className="py-1 text-center"
                                      key={dataIndex}
                                    >
                                      {dato[1]}
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
                          (item, index) =>
                            item.rol === role[0] && (
                              <React.Fragment key={index}>
                                {item.datos.map(
                                  (dato: any, dataIndex: number) => (
                                    <TableCell
                                      className="py-1 text-center"
                                      key={dataIndex}
                                    >
                                      {dato[1]}
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
                                      {dato[1]}
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
                                  {item[2]}
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
                                        {capacidadResidual}
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
                </Card>
              </div>
              <div className="flex flex-row">
                <div className="p-2">
                  <Card className="w-[20rem] h-full">
                    <Title>Indicadores</Title>
                    <List className="pt-4">
                      <ListItem>
                        <span>Número de personas</span>
                        {rolesInfo.map((item, index) => {
                          if (item[0] === role[0]) {
                            return <span key={index}>{item[1]}</span>;
                          }
                        })}
                      </ListItem>
                      <ListItem>
                        <span>Demanda del sistema</span>
                        {totaldemanda.map((item, index) => {
                          if (item[0] === role[0]) {
                            return <span key={index}>{item[1]} HH</span>;
                          }
                        })}
                      </ListItem>
                      <ListItem>
                        <span>Capacidad ofertada</span>
                        {rolesInfo.map((item, index) => {
                          if (item[0] === role[0]) {
                            return <span key={index}>{item[2]} HH</span>;
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
                                {capacidadResidual} HH
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
                                {(item[1] / rolesInfo[index][3]).toFixed(2)}
                              </span>
                            );
                          }
                          return null;
                        })}
                      </ListItem>
                    </List>
                  </Card>
                </div>
                <div className=" w-full p-2 pl-1">
                  <Card className="flex flex-row p-0 pt-6">
                    <Grafico
                      filter={role[0]}
                      capacidadofertada={rolesInfo}
                      demandapromedio={totaldemanda}
                      demandapormes={totalbymonth}
                      clas
                    />
                    <Indicador
                      personasnecesarias={personasnecesarias}
                      personasactuales={personasactuales}
                      demandapromedio={totaldemanda} //demanda promedio por rol
                      filter={role[0]} //rol seleccionado
                      capacidadofertada={rolesInfo} //capacidad ofertada por rol
                    />
                  </Card>
                </div>
              </div>
              <div className="p-2 pt-1 flex ">
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
        <div className="html2pdf_page-break"></div>
      </div>
    </div>
  );
}

export default PdfScreen;


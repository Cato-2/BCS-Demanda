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
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Grafico from "./Grafico";

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
    name: "Por cargo",
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
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Demanda() {
  return (
    <div>
      <div className="w-[20rem] p-2">
        <SearchSelect>
          <SearchSelectItem value="1">Viola Amherd</SearchSelectItem>
          <SearchSelectItem value="2">Simonetta Sommaruga</SearchSelectItem>
          <SearchSelectItem value="3">Alain Berset</SearchSelectItem>
        </SearchSelect>
      </div>
      <div className="px-2 pt-0">
        <Card>
          <Table className="">
            <TableHead>
              <TableRow>
                <TableHeaderCell className="p-0">Actividades</TableHeaderCell>
                <TableHeaderCell className="p-0">Ene</TableHeaderCell>
                <TableHeaderCell className="p-0">Feb</TableHeaderCell>
                <TableHeaderCell className="p-0">Mar</TableHeaderCell>
                <TableHeaderCell className="p-0">Abr</TableHeaderCell>
                <TableHeaderCell className="p-0">Jun</TableHeaderCell>
                <TableHeaderCell className="p-0">Jul</TableHeaderCell>
                <TableHeaderCell className="p-0">Ago</TableHeaderCell>
                <TableHeaderCell className="p-0">Sep</TableHeaderCell>
                <TableHeaderCell className="p-0">Oct</TableHeaderCell>
                <TableHeaderCell className="p-0">Nov</TableHeaderCell>
                <TableHeaderCell className="p-0">Dic</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.name}
                  className={` ${item.special ? "item2" : ""}`}
                >
                  <TableCell className="p-0">{item.name}</TableCell>
                  <TableCell className="p-0">
                    <Text>{item.enero}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.febrero}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.marzo}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.abril}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.junio}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.julio}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.agosto}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.septiembre}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.octubre}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.noviembre}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text>{item.diciembre}</Text>
                  </TableCell>
                </TableRow>
              ))}
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

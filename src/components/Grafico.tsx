import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    capacidad: 600,
    demanda: 800,

  },
  {
    name: "Page B",
    capacidad: 600,
    demanda: 400,

  },
  {
    name: "Page C",
    capacidad: 600,
    demanda: 1098,

  },
  {
    name: "Page D",
    capacidad: 600,
    demanda: 1200,

  },
  {
    name: "Page E",
    capacidad: 600,
    demanda: 1108,

  },
  {
    name: "Page F",
    capacidad: 600,
    demanda: 680,

  },
  {
    name: "Page C",
    capacidad: 600,
    demanda: 1098,

  },
  {
    name: "Page D",
    capacidad: 600,
    demanda: 1200,

  },
  {
    name: "Page E",
    capacidad: 600,
    demanda: 500,

  },
  {
    name: "Page F",
    capacidad: 600,
    demanda: 680,

  },
];
export default function Grafico(any: any) {
  const getdata = () => {
    let aux: any[] = [];
    let capacidad = 0;
    any.capacidadofertada.map((item: any) => {
      if (item[0] == any.filter) {
        capacidad = item[2];
      }
    });

    for (let i = 0; i < any.demandapormes.length; i++) {
      if (any.filter == any.demandapormes[i].rol) {
        for (let j = 0; j < any.demandapormes[i].datos.length; j++) {
          aux.push({
            mes:(any.demandapormes[i].datos[j][0] as string).substring(0, 3),
            demanda: any.demandapormes[i].datos[j][1],
            capacidad: capacidad,
          });
        }
      }
    }
    return aux;
  };

  let datos = getdata();
  return (
    <ComposedChart
      width={600}
      height={250}
      data={datos}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="mes" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="capacidad" fill="#8884d8" stroke="#8884d8" />
      <Line type="monotone" dataKey="demanda" stroke="#185a7d" dot={false} />
    </ComposedChart>
  );
}

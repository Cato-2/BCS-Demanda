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
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
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
      <Bar dataKey="demanda" barSize={30} fill="#00BDA4" />
      <Line type="monotone" dataKey="capacidad" stroke="#185a7d" dot={false} />
    </ComposedChart>
  );
}

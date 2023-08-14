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

export default function Grafico(any: any) {
  let capacidad = any.capacidadofertada;
  let demanda = any.demandapromedio;
  const style = () => {
    let yellow = capacidad*1.2
    if(capacidad >= demanda){
      return "green"
    }
    else if( capacidad < demanda && demanda < yellow ){
      return "#FD8D14"
    }
    else{
      return "red"
    }
  }
  const getdata = () => {
    let aux: any[] = [];

    for (let i = 0; i < any.demandapormes.length; i++) {
        for (let j = 0; j < any.demandapormes[i].datos.length; j++) {
          aux.push({
            mes:(any.demandapormes[i].datos[j][0] as string).substring(0, 3),
            demanda: any.demandapormes[i].datos[j][1],
            capacidad: any.capacidadofertada,
          });
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
      <Area type="monotone" dataKey="capacidad" fill="#68B984" stroke="#5F8D4E" />
      <Line type="monotone" dataKey="demanda" stroke={style()} dot={false} />
    </ComposedChart>
  );
}

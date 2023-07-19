/* eslint-disable no-shadow */
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

let value = 90;
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

const RADIAN = Math.PI / 180;
const data = [

  { name: "D", value: 50, color: "green" },
  { name: "E", value: 25, color: "yellow" },
  { name: "G", value: 25, color: "red" },
];
const needle = (
  value: any,
  data: any,
  cx: any,
  cy: any,
  iR: any,
  oR: any,
  color: any,
  aux: any, // capacidad
  aux2: any //demanda
) => {
  let yellow = aux*1.2
  console.log( "capacidad", aux, "demanda", aux2, "yellow", yellow)
  if(aux >= aux2){
    console.log("capaciddad mayor igual a demanda")
    value = 25
  }
  else if( aux < aux2 && aux2 < yellow ){
    value = 63
    console.log("capaciddad menor a demanda y menor a amarillo ")

  }
  else{
    value = 85
    console.log("capacidad mayor a", yellow)

  }
  
  let total = 0;
  data.forEach((v: any) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill="#185a7d" stroke="none" />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill="#185a7d"
    />,
  ];
};

function Indicador(any: any) {

  let aux = 0
  let aux2 = 0
  const getvalue = () => {
    any.capacidadofertada.map((item:any, index:any)=>{
      if(item[0] == any.filter){
        aux= item[2]
      }
    })  
    any.demandapromedio.map((item:any, index:any)=>{
      if(item[0] == any.filter){
        aux2 = item[1]
      }
    })

  }

  getvalue()

  
  return (
    <div className="flex flex-col">
      <PieChart width={300} height={210}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, "#d0d000", aux, aux2)}
      </PieChart>
      <div></div>
    </div>
  );
}

export default Indicador;

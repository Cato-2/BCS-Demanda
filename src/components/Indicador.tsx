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

  { name: "<= 100%", value: 50, color: "green" },
  { name: "<= 120%", value: 25, color: "#F0DE36" },
  { name: "> 120%", value: 25, color: "red" },
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
  if(aux >= aux2){
    value = (aux2 / aux) * 100 * 0.5
  }
  else if( aux < aux2 && aux2 < yellow ){
    value = ((((aux2 / aux) * 100) -100) * 1.25) + 50

  }
  else{
    value = ((((aux2 / aux) * 100) -120) * 0.8) + 75
    if(value > 100){
      value = 100
    }
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

  let aux = any.capacidadofertada
  let aux2 = any.demandapromedio
  
  return (
    <div className="flex flex-col pt-0">
      <PieChart width={320} height={210}>
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
          nameKey="name" 
          label={(entry) => entry.name} 
          labelLine={false} 
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, "#d0d000", aux, aux2)}
      </PieChart>
      <div className="w-full text-center pt-2">Demanda {((aux2 / aux) * 100).toFixed(1)}%</div>
    </div>
  );
}

export default Indicador;

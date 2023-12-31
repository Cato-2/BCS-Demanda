export const allmonths = [
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

export const getLast12Months = () => {
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

export const rutinariasbyrole = (Roles: any[], Tasks: any[]) => {
  const rutinarias: any[] = [];
  Roles.map((role: any) => {
    let acu = 0;
    if (role.nombre != undefined) {
      Tasks.map((task: any) => {
        if (
          (task.roles == role.nombre || task.roles == "todos") &&
          task.tipo == "rutinarias"
        ) {
          //task.roles.indexOf(role.nombre) !== -1
          if (task.frecuencia == "frecuente") {
            acu = (task.duracion * 4 * 2, 5) + acu;
          }
          if (task.frecuencia == "diaria") {
            acu = task.duracion * 4 * 5 * task["cuantas veces"] + acu; //4 semanas, 5 dias cada una
          }
          if (task.frecuencia == "semanal") {
            acu = task.duracion * 4 * task["cuantas veces"] + acu; //4 semanas
          }
          if (task.frecuencia == "quincenal") {
            acu = task.duracion * 2 * task["cuantas veces"] + acu; //2 semanas
          }
          if (task.frecuencia == "mensual") {
            acu = task.duracion * task["cuantas veces"] + acu; //1 mes
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

export const norutinariasbyrole = (Roles: any[], Tasks: any[]) => {
  const norutinarias: any[] = [];
  Roles.map((role: any) => {
    let acu = 0;
    if (role.nombre != undefined) {
      Tasks.map((task: any) => {
        if (task.roles == role.nombre || task.roles == "todos") {
          //task.roles.indexOf(role.nombre) !== -1
          if (task.frecuencia == "ocasionales") {
            acu = task.duracion * 4 * 0.75 + acu;
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

export const programadasbyrole = (Roles: any[], Tasks: any[]) => {
  const programadas: any[] = [];
  Roles.map((role: any) => {
    let acu = 0;
    if (role.nombre != undefined) {
      Tasks.map((task: any) => {
        if (
          (task.roles == role.nombre || task.roles == "todos") &&
          task.tipo == "programadas"
        ) {
          //task.roles.indexOf(role.nombre) !== -1
          if (task.frecuencia == "periodicas") {
            acu = (task.duracion * 4 * 1, 5) + acu;
          }
          if (task.frecuencia == "diaria") {
            acu = task.duracion * 4 * 5 * task["cuantas veces"] + acu; //4 semanas, 5 dias cada una
          }
          if (task.frecuencia == "semanal") {
            acu = task.duracion * 4 * task["cuantas veces"] + acu; //4 semanas
          }
          if (task.frecuencia == "quincenal") {
            acu = task.duracion * 2 * task["cuantas veces"] + acu; //2 semanas
          }
          if (task.frecuencia == "mensual") {
            acu = task.duracion * task["cuantas veces"] + acu; //1 mes
          }
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

export const bymonth = (
  last12Months: any[],
  rutinariasMes: any[],
  Roles: any
) => {
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

export const getroledata = (roles: any) => {
  let aux: any[] = [];
  let contador = 0;
  let cantidad = 0;
  let avg = 0;
  let rolesnumber = 0;
  roles.map((role: any, item: number) => {
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

export function getAllMonths(
  startDateString: string,
  endDateString: string
): number[][] {
  // Convert the input strings to Date objects
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Initialize an empty array to store the months
  let allMonths: number[][] = [];

  // Loop through the months starting from the month after the start date
  let currentMonth = new Date(startDate);
  currentMonth.setDate(1); // Reset the day to 1
  currentMonth.setMonth(currentMonth.getMonth() + 1); // Move to the next month

  while (currentMonth < endDate) {
    allMonths.push(formatMonth(currentMonth));
    // Move to the next month
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  return allMonths;
}

function formatMonth(date: Date): number[] {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return [month, year];
}

export function calculateDuration(
  startDateStr: string,
  dueDateStr: string
): number {
  const startDate = new Date(startDateStr);
  const dueDate = new Date(dueDateStr);
  const durationInMilliseconds = dueDate.getTime() - startDate.getTime();
  const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
  return durationInDays;
}

export const bymonthyearly = (
  rolesbymonth: any,
  Tasks: any,
  last12Months: any,
  tipo: string
) => {
  rolesbymonth.map((roles: any) => {
    Tasks.map((task: any) => {
      if (
        (task.roles == roles.rol || roles.rol == "todos") &&
        task.tipo == tipo &&
        task.frecuencia == "anual"
      ) {
        task["meses especificos"].map((month: any) => {
          month = month.slice(0, 3);

          if (
            last12Months.find(
              (item: any) =>
                item.slice(0, 3).toUpperCase() == month.toUpperCase()
            ) != undefined
          ) {
            let index = last12Months.findIndex(
              (item: any) =>
                item.slice(0, 3).toUpperCase() ===
                month.slice(0, 3).toUpperCase()
            );
            roles.datos[index][1] = roles.datos[index][1] + task.duracion;
          }
        });
      }
    });
  });
};

export const bymonthprogramadas = (
  rolesbymonth: any,
  Tasks: any,
  last12Months: any,
  tipo: string
) => {
  rolesbymonth.map((role: any) => {
    Tasks.map((task: any) => {
      if (task.roles == role.rol || role.rol == "todos") {
        if (
          (task.frecuencia == "programadas" && tipo == "programadas") ||
          (task.frecuencia == "no rutinarias" && tipo == "no rutinarias")
        ) {
          if (
            task["fecha de inicio"] != undefined ||
            task["fecha de termino"] != undefined ||
            task["fecha de termino"] != null ||
            task["fecha de inicio"] != null
          ) {
            let duration = calculateDuration(
              task["fecha de inicio"],
              task["fecha de termino"]
            );
            let monthstart = task["fecha de inicio"].split("-")[1]; //mes de inicio
            let monthdue = task["fecha de termino"].split("-")[1]; //mes de termino
            let yearstart = task["fecha de inicio"].split("-")[0]; //año de inicio
            let yeardue = task["fecha de termino"].split("-")[0]; //año de termino
            let daystart = task["fecha de inicio"].split("-")[2]; //dia de inicio
            let daydue = task["fecha de termino"].split("-")[2]; //dia de termino
            if (monthstart == monthdue && yearstart == yeardue) {
              // si la tarea se realiza durante un mismo mes  revisar cuando es un puro mes en no rutinaria
              if (
                last12Months.find(
                  (item: any) =>
                    item ==
                    `${allmonths[parseInt(monthstart) - 1]} - ${yearstart}`
                ) != undefined
              ) {
                let index = last12Months.indexOf(
                  `${allmonths[parseInt(monthstart) - 1]} - ${yearstart}`
                );
                role.datos[index][1] =
                  role.datos[index][1] + parseInt(task.duracion);
              }
            } else {
              //si ejecuta entre dos o mas meses, dividir duracion en meses desde inicio hasta termino
              let months = getAllMonths(
                task["fecha de inicio"],
                task["fecha de termino"]
              );

              const firstMonth = 30 - parseInt(daystart);
              const lastMonth = parseInt(daydue);
              let total = 0;
              if (months.length == 0) {
                total = firstMonth + lastMonth;
              } else {
                total =
                  firstMonth +
                  lastMonth +
                  30 * Math.abs(parseInt(monthdue) - parseInt(monthstart) - 1);
              }
              const hoursPerDay = task.duracion / total;
              const firstMonthHours = hoursPerDay * firstMonth;
              const secondMonthHours = hoursPerDay * lastMonth;
              if (
                last12Months.find(
                  (item: any) =>
                    item ==
                    `${allmonths[parseInt(monthstart) - 1]} - ${yearstart}`
                ) != undefined
              ) {
                let index = last12Months.indexOf(
                  `${allmonths[parseInt(monthstart) - 1]} - ${yearstart}`
                );
                role.datos[index][1] = role.datos[index][1] + firstMonthHours;
              }
              if (
                last12Months.find(
                  (item: any) =>
                    item == `${allmonths[parseInt(monthdue) - 1]} - ${yeardue}`
                ) != undefined
              ) {
                let index = last12Months.indexOf(
                  `${allmonths[parseInt(monthdue) - 1]} - ${yeardue}`
                );
                role.datos[index][1] = role.datos[index][1] + secondMonthHours;
              }
              if (months.length > 0) {
                months.map((month: any) => {
                  if (
                    last12Months.find(
                      (item: any) =>
                        item ==
                        `${allmonths[parseInt(month[0]) - 1]} - ${month[1]}`
                    ) != undefined
                  ) {
                    let index = last12Months.indexOf(
                      `${allmonths[parseInt(month[0]) - 1]} - ${month[1]}`
                    );
                    role.datos[index][1] =
                      role.datos[index][1] + hoursPerDay * 30;
                  }
                });
              }
            }
          }
        }
      }
    });
  });
  return rolesbymonth;
};

export const gettotal = (
  lastyearRutina: any,
  lastyearNorutina: any,
  lastyearProgramada: any
) => {
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

export const averagetotal = (totalbymonth: any) => {
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

export const getPersonasNecesarias = (
  tipo: string,
  totaldemanda: any,
  rolesInfo: any,
  filter: any
) => {
  // Calculate the required number of people for the selected role
  let aux = 0;

  totaldemanda.forEach((role: any, index: number) => {
    if (role[0] === filter) {
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

export const getcapacidadvaluebyfilter = (arr: any, filter: string): number => {
  return arr[0]; // Or any default value if role with the specified filter is not found
};

export const applyfilter = (lista: any, filtros: any) => {
  let aux: any[] = [];
  if (!Array.isArray(filtros)) {
    // Handle the case when filtros is not an array
    return aux;
  }
  const last12months = getLast12Months();
  let data: any[] = [];
  last12months.map((item, index) => {
    data.push([item, 0]);
  });
  aux.push({ rol: "filtro", datos: data });
  lista.map((item: any, index: any) => {
    const filtro = filtros.find((f: any) => f.value == item.rol);
    if (filtro) {
      item.datos.map((month: any, index: any) => {
        aux[0].datos[index][1] = aux[0].datos[index][1] + month[1];
      });
    }
  });
  if (filtros.length == 0) {
    const search = lista.find((f: any) => f.rol == "todos");
    if (search) {
      aux = [];
      aux.push(search);
    }
  }
  return aux;
};

export const getcapacidad = (rolesInfo: any, filtros: any) => {
  let cells: any[] = [];
  const months = getLast12Months();
  let aux = 0;
  for (let i = 0; i < months.length; i++) {
    cells[i] = 0; // Initialize cells[i] as a number

    rolesInfo.forEach((item: any) => {
      const filtro = filtros.find((f: any) => f.value == item[0]);
      if (filtro) {
        aux = 1;
        cells[i] += item[2];
      }
    });
    if (aux == 0) {
      const filtro = rolesInfo.find((f: any) => f[0] == "todos");
      if (filtro) {
        cells[i] = filtro[2];
      }
    }
  }
  aux = 0;
  return cells;
};

export const getpersonas = (rolesInfo: any, filtros: any) => {
  let cells = 0;
  const months = getLast12Months();
  let aux = 0;

  rolesInfo.forEach((item: any) => {
    const filtro = filtros.find((f: any) => f.value == item[0]);
    if (filtro) {
      aux = 1;
      cells += item[1];
    }
  });
  if (aux == 0) {
    const filtro = rolesInfo.find((f: any) => f[0] == "todos");
    if (filtro) {
      cells = filtro[1];
    }
  }
  aux = 0;
  return cells.toFixed(0);
};

export const gettotaldemandafilter = (totaldemanda:any, filtros:any):any =>{
  let aux:any = 0;
  totaldemanda.map((item:any,index:any)=>{
    const filtro = filtros.find((f: any) => f.value == item[0]);
    if (filtro) {
      aux += item[1];
    }
  });
  if (aux == 0) {
    const filtro = totaldemanda.find((f: any) => f[0] == "todos");
    if (filtro) {
      aux = filtro[1];
    }
  }
  console.log("demanda", aux);
  return aux;
};

export const getaveragecapacidad = (rolesInfo: any, filtros: any) => {
  let aux = 0;
  rolesInfo.forEach((item: any) => {
    const filtro = filtros.find((f: any) => f.value == item[0]);
    if (filtro) {
      aux += item[2];
    }
  });
  if (aux == 0) {
    const filtro = rolesInfo.find((f: any) => f[0] == "todos");
    if (filtro) {
      aux = filtro[2];
    }
  }
  return aux;
};

export const getaveragecapacidad2 = (rolesInfo: any, filtros: any) => {
  let aux = 0;
  let cont = 0;
  rolesInfo.forEach((item: any) => {
    const filtro = filtros.find((f: any) => f.value == item[0]);
    if (filtro) {
      cont++;
      aux += item[2];
    }
  });
  if (aux == 0) {
    const filtro = rolesInfo.find((f: any) => f[0] == "todos");
    if (filtro) {
      cont = rolesInfo.length - 1;
      aux = filtro[2];
    }
  }
  return aux / cont;
};

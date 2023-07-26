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

export   const getLast12Months = () => {
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

export  const rutinariasbyrole = (Roles: any[], Tasks: any[]) => {
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

export  const norutinariasbyrole = (Roles: any[], Tasks: any[]) => {
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


export const programadasbyrole = (Roles: any[], Tasks: any[]) => {
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

export   const bymonth = (last12Months: any[], rutinariasMes: any[], Roles: any) => {
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

  
export const getroledata = (roles:any) => {
    let aux: any[] = [];
    let contador = 0;
    let cantidad = 0;
    let avg = 0;
    let rolesnumber = 0;
    roles.map((role: any, item:number) => {
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

export   function getAllMonths(startDateString: string, endDateString: string): number[][] {
    // Convert the input strings to Date objects
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Initialize an empty array to store the months
    let allMonths: number[][] = [];

    // Loop through the months starting from the month after the start date
    let currentMonth = new Date(startDate);
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


export function calculateDuration(startDateStr: string, dueDateStr: string): number {
    const startDate = new Date(startDateStr);
    const dueDate = new Date(dueDateStr);
    const durationInMilliseconds = dueDate.getTime() - startDate.getTime();
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
    return durationInDays;
  }

export const bymonthprogramadas = (rolesbymonth: any, Tasks: any, last12Months:any) => {
    rolesbymonth.map((role: any) => {
      Tasks.map((task: any) => {
        if (task.roles == role.rol || role.rol == "todos") {
          if (task.frecuencia == "programada") {
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
              // si la tarea se realiza durante un mismo mes
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
                role.datos[index][1] = role.datos[index][1] + duration;
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
              if(months.length == 0){
                total = firstMonth + lastMonth;
              }
              else{
                total = firstMonth + lastMonth + 30*(Math.abs(parseInt(monthdue)-parseInt(monthstart)-1));
               
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
              if(months.length > 0){
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
      });
    });

    console.log("final arr", rolesbymonth);
  };

export const gettotal = (lastyearRutina:any, lastyearNorutina:any, lastyearProgramada:any) => {
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

export   const averagetotal = (totalbymonth:any) => {
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

export  const getPersonasNecesarias = (tipo: string, totaldemanda:any, rolesInfo:any, filter:any) => {
    // Calculate the required number of people for the selected role
    let aux = 0;

    totaldemanda.forEach((role:any, index:number) => {
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

  export   const getcapacidadvaluebyfilter = (rolesInfo:any, filter:string): number => {
    const foundRole = rolesInfo.find((item:any) => item[0] === filter);
    if (foundRole) {
      return foundRole[2];
    }
    return 0; // Or any default value if role with the specified filter is not found
  };
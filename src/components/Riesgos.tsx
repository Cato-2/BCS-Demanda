import React, { useState, useEffect } from "react";
import { Callout, Card, Metric, Text } from "@tremor/react";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface Props {
  personasactuales: number;
  capacidadofertada: any[]; // Replace 'any[]' with a more specific type if you know the structure of 'capacidadofertada'
  filter: string;
  demandapromedio: any[]; // Replace 'any[]' with a more specific type if you know the structure of 'demandapromedio'
  personasnecesarias: number;
  demandapormes: any [];
}

const Riesgos: React.FC<Props> = (props) => {
  const {
    personasactuales,
    capacidadofertada,
    filter,
    demandapromedio,
    personasnecesarias,
  } = props;

  const renderRiesgos = () => {
    const riesgosElements: JSX.Element[] = [];
    capacidadofertada.forEach((role, index) => {
      if (role[0] == filter) {
        const capacidadResidual = role[2] - demandapromedio[index][1];
        if (capacidadResidual < 0) {
          riesgosElements.push(
            <span className="py-1" key={index}>
              • No se cuenta con la capacidad para cubrir la demanda
            </span>
          );
        } else {
          riesgosElements.push(
            <span className="py-1" key={index + 1}>
              • Se cuenta con la capacidad para cubrir la demanda
            </span>
          );
        }
      }
    });
    if (personasnecesarias > personasactuales) {
      riesgosElements.push(
        <div className="flex flex-col">
          <span className="py-1" key="personasnecesarias">
            • Se recomienda revisar la incorporación de capacidad adicional al
            sistema y que las actividades consideren los recursos para solventar
            la capacidad requerida
          </span>
          <span className="py-1" key="otros">
            • Las licencias o permisos de colaboradores afectan o podrian
            afectar fuertemente la capacidad del sistema
          </span>
        </div>
      );
    }

    return riesgosElements;
  };

  return (
    <div className="w-fit">
      <Callout
        className=""
        title="Riesgos"
        icon={personasnecesarias > personasactuales ? ExclamationCircleIcon : CheckCircleIcon}
        color={personasnecesarias > personasactuales ? "orange" : "green"}
      >
        <div key="1" className="flex flex-col w-fit">{renderRiesgos()}</div>
      </Callout>
    </div>
  );
};

export default Riesgos;

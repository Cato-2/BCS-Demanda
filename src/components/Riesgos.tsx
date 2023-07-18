import React from 'react'
import { Callout, Card, Metric, Text } from "@tremor/react";
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function Riesgos(any: any) {



  return (
    <div>
      <Callout
        className="h-12 mt-4"
        title="Critical speed limit reached"
        icon={ExclamationCircleIcon}
        color="orange"
      >
        Turbine reached critical speed. Immediately reduce turbine speed.
      </Callout>

      <Callout className="mt-4" title="No critical system data" icon={CheckCircleIcon} color="teal">
        All systems are currently within their default operating ranges.
      </Callout>
    </div>
  )
}

export default Riesgos
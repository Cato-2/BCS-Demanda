import React from "react";
import Topnav from "./Topnav";
import ExcelToJSON from "../data/ExcelToJson";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function Home() {
  return (
    <>
      <div className="w-auto h-screen bg-[#fcfcfc]">
        <div>
          <div className="flex flex-row h-full mt-6">
            <div className="w-full h-auto">
              <div className="px-3 pt-6">
                <h1 className="text-xl font-bold">Inicio</h1>
                <span className="text-sm text-gray-500">
                  Bienvenido al dashboard de gestión
                </span>
              </div>
            </div>
            <body className="bg-amber-200 relative">
              <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-gray-300"></div>
            </body>

            <div className="w-1/3 mr-3 h-full ml-4">
              <Card className="mt-6 w-96">
                <CardBody>
                  <div className="pb-8">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Cargar datos desde excel
                    </Typography>
                    <ExcelToJSON />
                  </div>
                  <div className="pb-8">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Exportar datos a excel
                    </Typography>
                    <Button>Descargar Excel</Button>
                  </div>
                  <div className="pb-8">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Exportar dashboard a PDF
                    </Typography>
                    <Button>Descargar PDF</Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

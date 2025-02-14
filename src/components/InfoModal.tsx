/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import compresion from "../assets/comprension2.jpeg";
import extension from "../assets/extension2.jpeg";
import torsion from "../assets/torsion.jpg";
import {
  fatigaComprension,
  fatigaExtension,
  fatigaTorsion,
  fatigaValueExtAndCompr,
  fatigaValueTorsion,
} from "./helpers/fatigaValues";
import {
  geometricosComprension,
  geometricosExtension,
  geometricosTorsion,
  geometricosValueTorsion,
} from "./helpers/geometricosValues";
import {
  mecanicosComprension,
  mecanicosExtension,
  mecanicosTorsion,
  mecanicosValueCompresion,
  mecanicosValueExtension,
  mecanicosValueTorsion,
} from "./helpers/mecanicosValues";

const InfoModal: React.FC<{ bodyChoose: string; values: any; changeEs:boolean}> = ({
  bodyChoose,
  values,
  changeEs
}) => {
  const switchImages = () => {
    switch (bodyChoose) {
      case "Compresión":
        return compresion;
      case "Extensión":
        return extension;
      default:
        return torsion;
    }
  };

  const switchFatiga = (): string[] => {
    switch (bodyChoose) {
      case "Compresión":
        return fatigaComprension;
      case "Extensión":
        return fatigaExtension;
      default:
        return fatigaTorsion;
    }
  };
  const switchGeometricos = (): string[] => {
    switch (bodyChoose) {
      case "Compresión":
        return geometricosComprension;
      case "Extensión":
        return geometricosExtension;
      default:
        return geometricosTorsion;
    }
  };
  const switchFatigaTypes = (): string[] => {
    switch (bodyChoose) {
      case "Torsión":
        return fatigaValueTorsion;
      default:
        return fatigaValueExtAndCompr;
    }
  };

  const switchMecanicos = () => {
    switch (bodyChoose) {
      case "Compresión":
        return mecanicosComprension;
      case "Extensión":
        return mecanicosExtension;
      default:
        return mecanicosTorsion;
    }
  };

  const switchMecanicosTypes = () => {
    switch (bodyChoose) {
      case "Compresión":
        return mecanicosValueCompresion;
      case "Extensión":
        return mecanicosValueExtension;
      default:
        return mecanicosValueTorsion;
    }
  };

  const chooseSystem = (value: string) => {
    if (changeEs) {
      if (value === "in") return "mm";
      if (value === "lb") return "N";
      if (value === "lb/in") return "N/mm";
      if (value === "lb*in") return "N*mm";
      if (value === "psi") return "Mpa";
    }
    return value;
  };

  console.log(values['Sy'])
  return (
    <div className="grid gap-6 grid-cols-2">
      <div className="grid grid-cols-3 py-5 space-y-3 px-6 rounded-md shadow bg-slate-100">
        <span className="col-span-3 text-center font-bold">F.GEOMÉTRICOS</span>
        <div className="flex flex-col space-y-2">
          {switchGeometricos().map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {switchGeometricos().map((e) => (
            <span key={e + "_value"}>{values ? values[e]?.toFixed(2) : "0,0"} </span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {bodyChoose === "Torsión" ? (
            <>
              {geometricosValueTorsion.map((e) => (
                <span key={e + "_type"}>{e}</span>
              ))}
            </>
          ) : (
            <>
              {switchGeometricos().map((e) => (
                <span key={e + "_type"}>{chooseSystem("in")}</span>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="items-center h-[300px] pt-3 flex justify-center">
          <img
            src={switchImages()}
            width={500}
            height={100}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="grid  py-5 px-6 grid-cols-3 space-y-3  rounded-md shadow bg-slate-100">
        <span className="col-span-3 text-center font-bold">FATIGA</span>
        <div className="flex flex-col space-y-2">
          {switchFatiga().map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {switchFatiga().map((e) => (
            <span key={e + "_value"}>{values ? values[e]?.toFixed(2) : "N/A"}</span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {switchFatigaTypes().map((e) => (
            <span key={e}>{chooseSystem(e)}</span>
          ))}
        </div>
      </div>
      <div className="grid py-5 px-6 grid-cols-3  space-y-3 rounded-md shadow bg-slate-100">
        <span className="col-span-3 text-center font-bold">F.MECÁNICOS</span>
        <div className="flex flex-col space-y-2">
          {switchMecanicos().map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
        <div className="flex flex-col ml-3 space-y-2">
          {switchMecanicos().map((e) => (
            <span key={e + "_value"}>{values ? values[e]?.toFixed(2) : "0,0"}</span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {switchMecanicosTypes().map((e) => (
            <span key={e + "_types"}>{chooseSystem(e)}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;

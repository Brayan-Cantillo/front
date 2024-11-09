/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import compresion from "../assets/comprension2.jpeg";
import extension from "../assets/extension2.jpeg";
import torsion from "../assets/Torsion2.jpg";
import viewIcon from "../assets/ViewIcon.svg";
import Modal from "./Modal";
import InfoModal from "./InfoModal";
import {
  compresionCase1Body,
  compresionCase1Type,
  compresionCase2Body,
  compresionCase2Type,
  compresionCase3Body,
  compresionCase3Type,
  compresionCase4Body,
  compresionCase4Type,
  compresionCase5Body,
  compresionCase5Type,
  extAndCompTypeBody,
  extensionBody,
  extensioncase2Body,
  extensioncase2type,
  extensioncase3Body,
  extensioncase4Body,
  extensioncase4type,
  extensioncase5type,
  torsion1TypeBody,
  torsion2Body,
  torsion2TypeBody,
  torsion3Body,
  torsion3TypeBody,
  torsion4Body,
  torsion4TypeBody,
  torsion5Body,
  torsion5TypeBody,
  torsionBody,
  torsionTypeBody,
} from "./helpers/resultInfo";

const InfoCalculate: React.FC<{
  bodyChoose: string;
  casesChoose: string;
  resultValue: any;
  changeEs: boolean;
}> = ({ bodyChoose, casesChoose, changeEs, resultValue }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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

  const switchResult = () => {
    if (bodyChoose === "Compresión") {
      if (casesChoose === "1") return compresionCase1Body;
      if (casesChoose === "2") return compresionCase2Body;
      if (casesChoose === "3") return compresionCase3Body;
      if (casesChoose === "4") return compresionCase4Body;
      if (casesChoose === "5") return compresionCase5Body;
    }
    if (bodyChoose === "Extensión") {
      if (casesChoose === "2") return extensioncase2Body;
      if (casesChoose === "3") return extensioncase3Body;
      if (casesChoose === "4") return extensioncase2Body;
      if (casesChoose === "5") return extensioncase4Body;
      return extensionBody;
    }
    if (casesChoose === "2") return torsion2Body;
    if (casesChoose === "3") return torsion3Body;
    if (casesChoose === "4") return torsion4Body;
    if (casesChoose === "5") return torsion5Body;

    return torsionBody;
  };
  const typeResult = () => {
    if (bodyChoose === "Compresión") {
      if (casesChoose === "1") return compresionCase1Type;
      if (casesChoose === "2") return compresionCase2Type;
      if (casesChoose === "3") return compresionCase3Type;
      if (casesChoose === "4") return compresionCase4Type;
      if (casesChoose === "5") return compresionCase5Type;
    }

    if (bodyChoose === "Extensión") {
      if (casesChoose === "2") return extensioncase2type;
      if (casesChoose === "3") return extensioncase4type;
      if (casesChoose === "4") return extensioncase2type;
      if (casesChoose === "5") return extensioncase5type;
      return extAndCompTypeBody;
    }
    if (casesChoose === "1") return torsion1TypeBody;
    if (casesChoose === "2") return torsion2TypeBody;
    if (casesChoose === "3") return torsion3TypeBody;
    if (casesChoose === "4") return torsion4TypeBody;
    if (casesChoose === "5") return torsion5TypeBody;

    return torsionTypeBody;
  };
  const chooseSystem = (value: string) => {
    if (changeEs) {
      if (value === "in") return "mm";
      if (value === "lb") return "N";
      if (value === "lb/in") return "N/mm";
      if (value === "lb*in") return "N*mm";
    }
    return value;
  };

  return (
    <>
      <div className=" ml-3 mb-4 p-6 bg-white border  space-y-9 border-gray-200 rounded-lg shadow ">
        <div className="flex items-center justify-between">
          <span>Caso {casesChoose}</span>
          {resultValue ? (
            <img
              src={viewIcon}
              onClick={openModal}
              className="cursor-pointer"
              width={32}
              height={32}
            />
          ) : null}
        </div>

        <div className="items-center h-[300px] pt-3 flex justify-center">
          <img
            src={switchImages()}
            width={700}
            height={200}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="flex flex-col px-6 space-y-4">
          {switchResult().map((el, i) => (
            <div key={el + "_i"} className="grid grid-cols-2  items-center">
              <span>{el.label}</span>
              <div className="flex items-center pr-10 justify-between">
                <span className="text-center">
                  {resultValue ? resultValue[el.value]?.toFixed(2) : "0,0"}{" "}
                </span>
                <span className="text-center">
                  {chooseSystem(typeResult()[i])}{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} title={bodyChoose} onClose={closeModal}>
        <InfoModal values={resultValue} changeEs={changeEs} bodyChoose={bodyChoose} />
      </Modal>
    </>
  );
};

export default InfoCalculate;

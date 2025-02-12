/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Form from "./Form";
import InfoCalculate from "./InfoCalculate";
const Body: React.FC<{ bodyChoose: string, changeEs: boolean }> = ({ bodyChoose, changeEs }) => {
  const [casesChoose, setCasesChoose] = useState<string>("1");
  const [resultValue, setResult] = useState<any>(undefined);
  useEffect(()=>{
    setResult(undefined)
  },[changeEs])
  return (
    <div className="h-full  overflow-y-auto px-6 pt-4   ">
        <div className="grid gap-4 grid-cols-2">
          <Form casesChoose={casesChoose} setResult={setResult} changeEs={changeEs} setCasesChoose={setCasesChoose} bodyChoose={bodyChoose} />
          <InfoCalculate casesChoose={casesChoose} resultValue={resultValue} changeEs={changeEs} bodyChoose={bodyChoose} />
        </div>
    </div>
  );
};

export default Body;

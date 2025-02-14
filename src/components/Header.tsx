import React from "react";
import GUIADEUSUARIOHELICOIEDUPDF from '../assets/GUIADEUSUARIOHELICOIEDU.pdf';

const Header: React.FC<{
  bodyChoose: string;
  systemChoose: boolean;
  setBodyChoose: (value: string) => void;
  setChangeEs: (value: boolean) => void;
}> = ({ bodyChoose, setBodyChoose, systemChoose, setChangeEs }) => {
  const nav = ["Compresión", "Extensión", "Torsión"];
  return (
    <div className="fixed top-0 w-full flex justify-between text-white px-6 bg-[#5271ff] shadow-md py-3 items-center">
      <div className="flex justify-between space-x-4 items-center">
        <span className="font-bold text-lg bg-white rounded-md shadow-lg px-4 py-2.5 text-[#5271ff]">
          H
        </span>
        {nav.map((e, i: number) => (
          <span
            onClick={() => setBodyChoose(e)}
            key={i}
            className={`cursor-pointer hover:underline ${
              bodyChoose === e && "underline"
            } `}
          >
            {e}
          </span>
        ))}
        <div className="flex items-center ">
          <a className="cursor-pointer hover:underline" href={GUIADEUSUARIOHELICOIEDUPDF} download="GUIADEUSUARIOHELICOIEDU.pdf">
            Ayuda
          </a>
        </div>
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={systemChoose}
          onChange={(e) => setChangeEs(e.target.checked)}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {systemChoose ? "I.S" : "E.S"}
        </span>
      </label>
    </div>
  );
};

export default Header;

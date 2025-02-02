/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import compresion from "../assets/comprension.jpeg";
import extension from "../assets/extension.jpeg";
import torsion from "../assets/Torsion.jpg";
import Tooltip from "./tooltip";
import { calculate, getDiametro, getMaterial } from "./helpers/fetch";
import { cases } from "./helpers/resultInfo";
import Swal from "sweetalert2";

interface ProsForm {
  bodyChoose: string;
  casesChoose: string;
  changeEs: boolean;
  setCasesChoose: (value: string) => void;
  setResult: (value: any) => void;
}
interface Options {
  id: number;
  label: string;
}

const Form: React.FC<ProsForm> = ({
  bodyChoose,
  changeEs,
  setCasesChoose,
  casesChoose,
  setResult,
}) => {
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [materiales, setMateriales] = useState<Options[]>([]);
  const [idMaterial, setIdMaterial] = useState<number>();
  const [diametros, setDiametros] = useState<Options[]>([]);
  const switchImages = () => {
    switch (bodyChoose) {
      case "Compresión":
        return compresion;
      case "Extensión":
        return extension;
      case "Torsión":
        return torsion;
      default:
        return compresion;
    }
  };

  const switchTypes = () => {
    switch (bodyChoose) {
      case "Extensión":
        return 2;
      case "Torsión":
        return 3;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const getMaterialesSubmit = async () => {
      const res = await getMaterial(changeEs);
      if (res && res.status === 200) {
        setDiametros([])
        setMateriales(
          res.data.map((e: any) => {
            return {
              id: e.id,
              label: e.nombre,
            };
          })
        );
      }
    };
    getMaterialesSubmit();
  }, [changeEs]);

  useEffect(() => {
    if (idMaterial) {
      const getDiametrosSubmit = async () => {
        const res = await getDiametro(idMaterial);
        if (res && res.status === 200) {
          setDiametros(
            res.data.map((e: any) => {
              return {
                id: e.id,
                label: e.valor,
              };
            })
          );
        }
      };
      getDiametrosSubmit();
    }
  }, [idMaterial]);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    if (bodyChoose === "Compresión") {
      if (casesChoose === "1") {
        DeflexionRequired(newErrors);
        fmin_fmax(newErrors);
      }
      if (casesChoose === "2") {
        kRequired(newErrors);
        fmin_fmax(newErrors);
      }
      if (casesChoose === "3") {
        kRequired(newErrors);
        ymin_ymax(newErrors);
      }
      if (casesChoose === "4") {
        kRequired(newErrors);
        fmin_fmax(newErrors);
        Do_defRequired(newErrors);
        Lf_defRequired(newErrors);
      }
      if (casesChoose === "5") {
        kRequired(newErrors);
        ymin_ymax(newErrors);
        Do_defRequired(newErrors);
        Lf_defRequired(newErrors);
      }
      if (!values["C"]) {
        newErrors["C"] = "Es Requerido.";
      }
      if (!values["Tratamiento"]) {
        newErrors["Tratamiento"] = "Es Requerido.";
      }
      if (!values["Asentamiento"]) {
        newErrors["Asentamiento"] = "Es Requerido.";
      }
      if (!values["Extremos"]) {
        newErrors["Extremos"] = "Es Requerido.";
      }
    }

    if (bodyChoose === "Extensión") {
      if (casesChoose === "1") {
        DeflexionRequired(newErrors);
        fmin_fmax(newErrors);
      }
      if (casesChoose === "2") {
        kRequired(newErrors);
        fmin_fmax(newErrors);
      }
      if (casesChoose === "3") {
        kRequired(newErrors);
        ymin_ymax(newErrors);
      }
      if (casesChoose === "4") {
        fmin_fmax(newErrors);
        Do_defRequired(newErrors);
        kRequired(newErrors);
        Lf_defRequired(newErrors);
      }
      if (casesChoose === "5") {
        kRequired(newErrors);
        Do_defRequired(newErrors);
        Lf_defRequired(newErrors);
        ymin_ymax(newErrors);
      }
      if (!values["C1"]) {
        newErrors["C1"] = "Es Requerido.";
      }
      if (!values["C2"]) {
        newErrors["C2"] = "Es Requerido.";
      }
    }
    if (bodyChoose === "Torsión") {
      if (casesChoose === "1") {
        mmin_mmax(newErrors);
      }
      if (casesChoose === "2") {
        kRequired(newErrors);
      }
      if (casesChoose === "2") {
        kRequired(newErrors);
      }
      if (casesChoose === "3") {
        kRequired(newErrors);
      }
      if (casesChoose === "4") {
        kRequired(newErrors);
        Do_defRequired(newErrors);
      }
      if (casesChoose === "5") {
        kRequired(newErrors);
        Do_defRequired(newErrors);
        Lf_defRequired(newErrors);
        amin_amax(newErrors);
      }
      if (!values["L1"]) {
        newErrors["L1"] = "Es Requerido.";
      }
      if (!values["theta"]) {
        newErrors["theta"] = "Es Requerido.";
      }
      if (!values["L2"]) {
        newErrors["L2"] = "Es Requerido.";
      }
      if (!values["C"]) {
        newErrors["C"] = "Es Requerido.";
      }
      if (!values["Tratamiento"]) {
        newErrors["Tratamiento"] = "Es Requerido.";
      }
      if (!values["Asentamiento"]) {
        newErrors["Asentamiento"] = "Es Requerido.";
      }
    }
    if (!values["Fatiga"]) {
      newErrors["Fatiga"] = "Es Requerido.";
    }
    if (!values["material"]) {
      newErrors["material"] = "Es Requerido.";
    }
    if (!values["d"]) {
      newErrors["d"] = "Es Requerido.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const kRequired = (newErrors: any) => {
    if (!values["k"]) {
      newErrors["k"] = "Es requerido ";
    }
  };

  const DeflexionRequired = (newErrors: any) => {
    if (!values["Deflexión"]) {
      newErrors["Deflexión"] = "Es requerido ";
    }
  };

  const Do_defRequired = (newErrors: any) => {
    if (!values["Do_def"]) {
      newErrors["Do_def"] = "Es requerido ";
    }
  };
  const Lf_defRequired = (newErrors: any) => {
    if (!values["Lf_def"]) {
      newErrors["Lf_def"] = "Es requerido ";
    }
  };

  const ymin_ymax = (newErrors: any) => {
    const ymin = parseFloat(values["ymín"]);
    const ymax = parseFloat(values["ymáx"]);
    if (!values["ymín"] || ymin > ymax) {
      newErrors["ymín"] = "ymín es requerido  y debe ser menor a ymáx.";
    }
    if (!values["ymáx"] || ymax < ymin) {
      newErrors["ymáx"] = "ymáx es requerido y debe ser mayor que ymín.";
    }
  };

  const mmin_mmax = (newErrors: any) => {
    const mmin = parseFloat(values["Mmín"]);
    const mmax = parseFloat(values["Mmáx"]);
    if (!values["Mmín"] || mmin > mmax) {
      newErrors["Mmín"] = "Mmín es requerido y debe ser menor a Mmáx.";
    }
    if (!values["Mmáx"] || mmax < mmin) {
      newErrors["Mmáx"] = "Mmáx es requerido y debe ser mayor que Mmín.";
    }
  };

  const fmin_fmax = (newErrors: any) => {
    const fmin = parseFloat(values["Fmín"]);
    const fmax = parseFloat(values["Fmáx"]);
    if (!values["Fmín"] || fmin > fmax) {
      newErrors["Fmín"] = "Fmín es requerido y debe ser menor a fmáx.";
    }
    if (!values["Fmáx"] || fmax < fmin) {
      newErrors["Fmáx"] = "Fmáx es requerido y debe ser mayor que Fmín.";
    }
  };
  const amin_amax = (newErrors: any) => {
    const thetamin = parseFloat(values["thetamín"]);
    const thetamax = parseFloat(values["thetamáx"]);
    if (!values["thetamín"] || thetamin > thetamax) {
      newErrors["thetamín"] = "thetamín es requerido y debe ser mayor 0.";
    }
    if (!values["thetamáx"] || thetamax < thetamin) {
      newErrors["thetamáx"] =
        "thetamáx es requerido y debe ser mayor que thetamín.";
    }
  };

  const onSubmit = async () => {
    if (!validateInputs()) {
      return; // No se envía si hay errores
    }
    try {
      const valuesObject = Object.values(values).map((e: any) => JSON.parse(e));
      const objeto: any = {};
      Object.keys(values).forEach((el: any, i: number) => {
        objeto[el] = valuesObject[i];
      });
      const body = {
        sistema: !changeEs,
        type: switchTypes(),
        case: parseInt(casesChoose),
        ...objeto,
      };
      const result = await calculate(body);
      if (result.status === 200) {
        setResult(result.data);
      }
      if (result.status === 500 || result.status === 400) {
        if (result.response?.data?.errores?.length) {
          const itemsHtml = result.response?.data?.errores
            .map(
              (item: any, i: number) =>
                `<li style="text-align: justify;margin-top: 1rem">${
                  i + 1
                }-${item}</li>`
            )
            .join("");
          Swal.fire({
            title: "Errores!",
            html: `<ol style="text-align: justify;">${itemsHtml}</ol>`,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: result.response.data.error,
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerChange = (e: any) => {
    if (e.target.name === "material") {
      setIdMaterial(e.target.value);
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const selectCase = (e: any) => {
    const value = e.target.value;
    setCasesChoose(value);
    deleteValues();
  };

  const deleteValues = () => {
    setValues({});
    setResult(undefined);
    setErrors({});
    setIdMaterial(-1);
    setDiametros([]);
  };

  useEffect(() => {
    if (bodyChoose) {
      deleteValues();
    }
  }, [bodyChoose]);

   return (
    <div className="grid gap-4 grid-cols-2">
      <div>
        <label
          htmlFor="case"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Casos
        </label>
        <select
          id="case"
          name="case"
          value={casesChoose}
          onChange={selectCase}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="1">Caso 1</option>
          <option value="2">Caso 2</option>
          <option value="3">Caso 3</option>
          <option value="4">Caso 4</option>
          <option value="5">Caso 5</option>
        </select>
      </div>
      <div className="col-span-2 flex justify-center">
        <img
          src={switchImages()}
          width={800}
          style={{ objectFit: "contain" }}
          height={800}
        />
      </div>
      {cases("AMAXMIN", bodyChoose, casesChoose) ? (
        <>
          <div>
            <Tooltip
              text={
                "Es la variación del ángulo de rotación del resorte medido desde su posición libre."
              }
            >
              <label
                htmlFor="thetamín"
                className="block  text-sm font-medium text-gray-900 "
              >
                Angulo min
              </label>
            </Tooltip>

            <InputEditable changeEs={changeEs} value={"°"}>
              <input
                type="number"
                id="thetamín"
                name="thetamín"
                value={values["thetamín"] || ""}
                onChange={handlerChange}
                className={`block w-full p-2 text-gray-900 border ${
                  errors["thetamín"] ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors["thetamín"] && (
                <p className="text-red-500 text-xs">{errors["thetamín"]}</p>
              )}
            </InputEditable>
          </div>
          <div>
            <Tooltip
              text={
                "Es la variación del ángulo de rotación del resorte medido desde su posición final.  "
              }
            >
              <label
                htmlFor="thetamáx"
                className="block  text-sm font-medium text-gray-900 "
              >
                Angulo maximo
              </label>
            </Tooltip>
            <InputEditable changeEs={changeEs} value={"°"}>
              <input
                type="number"
                id="thetamáx"
                name="thetamáx"
                value={values["thetamáx"] || ""}
                onChange={handlerChange}
                className={`block w-full p-2 text-gray-900 border ${
                  errors["thetamáx"] ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors["thetamáx"] && (
                <p className="text-red-500 text-xs">{errors["thetamáx"]}</p>
              )}
            </InputEditable>
          </div>
        </>
      ) : null}
      {cases("DEX", bodyChoose, casesChoose) ? (
        <div>
          <Tooltip
            text={"Es el diámetro del resorte medido en su punto más ancho.  "}
          >
            <label
              htmlFor="Do_def"
              className="block  text-sm font-medium text-gray-900 "
            >
              Dexterno
            </label>
          </Tooltip>

          <InputEditable changeEs={changeEs} value={"in"}>
            <input
              type="number"
              id="Do_def"
              name="Do_def"
              value={values["Do_def"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 text-gray-900 border ${
                errors["Do_def"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["Do_def"] && (
              <p className="text-red-500 text-xs">{errors["Do_def"]}</p>
            )}
          </InputEditable>
        </div>
      ) : null}
      {cases("DEX", bodyChoose, casesChoose) ? (
        <div>
          <Tooltip
            text={
              "Es la longitud total del resorte cuando se encuentra en estado libre. Es decir, sin cargas aplicadas. "
            }
          >
            <label
              htmlFor="Lf_def"
              className="block text-sm font-medium text-gray-900 "
            >
              LF (longitud libre)
            </label>
          </Tooltip>

          <InputEditable changeEs={changeEs} value={"in"}>
            <input
              type="number"
              id="Lf_def"
              name="Lf_def"
              value={values["Lf_def"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 text-gray-900 border ${
                errors["Lf_def"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["Lf_def"] && (
              <p className="text-red-500 text-xs">{errors["Lf_def"]}</p>
            )}
          </InputEditable>
        </div>
      ) : null}
      {cases("FMINMAX", bodyChoose, casesChoose) ? (
        <>
          <div>
            <Tooltip
              text={
                "Es el valor más alto de carga a la que se somete el resorte en su ciclo de trabajo."
              }
            >
              <label
                htmlFor="Fmín"
                className="block text-sm font-medium text-gray-900 "
              >
                Fmin
              </label>
            </Tooltip>
            <InputEditable changeEs={changeEs} value={"lb"}>
              <input
                type="number"
                id="Fmín"
                name="Fmín"
                value={values["Fmín"] || ""}
                onChange={handlerChange}
                className={`block w-full p-2 text-gray-900 border ${
                  errors["Fmín"] ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors["Fmín"] && (
                <p className="text-red-500 text-xs">{errors["Fmín"]}</p>
              )}
            </InputEditable>
          </div>
          <div>
            <Tooltip
              text={
                "Es el valor más bajo de carga a la que se somete el resorte en su ciclo de trabajo."
              }
            >
              <label
                htmlFor="Fmáx"
                className="block text-sm font-medium text-gray-900 "
              >
                Fmax
              </label>
            </Tooltip>
            <InputEditable changeEs={changeEs} value={"lb"}>
              <input
                type="number"
                id="Fmáx"
                name="Fmáx"
                value={values["Fmáx"] || ""}
                onChange={handlerChange}
                className={`block w-full p-2 text-gray-900 border ${
                  errors["Fmáx"] ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors["Fmáx"] && (
                <p className="text-red-500 text-xs">{errors["Fmáx"]}</p>
              )}
            </InputEditable>
          </div>
        </>
      ) : null}
      {cases("MMINMAX", bodyChoose, casesChoose) ? (
        <>
          <div>
            <Tooltip text="Es el valor más alto de carga a la que se somete el resorte en su ciclo de trabajo.">
              <label
                htmlFor="Mmín"
                className="block text-sm font-medium text-gray-900 "
              >
                Mmin
              </label>
            </Tooltip>

            <InputEditable changeEs={changeEs} value={"lb*in"}>
              <input
                type="number"
                id="Mmín"
                name="Mmín"
                value={values["Mmín"] || ""}
                onChange={handlerChange}
                className={`block w-full p-2 text-gray-900 border ${
                  errors["Mmín"] ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors["Mmín"] && (
                <p className="text-red-500 text-xs">{errors["Mmín"]}</p>
              )}
            </InputEditable>
          </div>
          <div>
            <Tooltip text="Es el valor más bajo de carga a la que se somete el resorte en su ciclo de trabajo. ">
              <label
                htmlFor="Mmáx"
                className="block text-sm font-medium text-gray-900 "
              >
                Mmax
              </label>
            </Tooltip>
            <InputEditable changeEs={changeEs} value={"lb*in"}>
              <input
                type="number"
                id="Mmáx"
                name="Mmáx"
                value={values["Mmáx"] || ""}
                onChange={handlerChange}
                className={`block w-full p-2 text-gray-900 border ${
                  errors["Mmáx"] ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors["Mmáx"] && (
                <p className="text-red-500 text-xs">{errors["Mmáx"]}</p>
              )}
            </InputEditable>
          </div>
        </>
      ) : null}
      {cases("D", bodyChoose, casesChoose) ? (
        <div>
          <Tooltip text="Es la variación de la longitud del resorte debido a la acción de una carga.">
            <label
              htmlFor="Deflexión"
              className="block text-sm font-medium text-gray-900 "
            >
              Deflexión
            </label>
          </Tooltip>

          <InputEditable changeEs={changeEs} value={"in"}>
            <input
              type="number"
              id="Deflexión"
              name="Deflexión"
              value={values["Deflexión"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 text-gray-900 border ${
                errors["Deflexión"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["Deflexión"] && (
              <p className="text-red-500 text-xs">{errors["Deflexión"]}</p>
            )}
          </InputEditable>
        </div>
      ) : null}
      {cases("R", bodyChoose, casesChoose) ? (
        <div>
          <Tooltip text="Es una constante que cuantifica la oposición del resorte a la deformación.">
            <label
              htmlFor="k"
              className="block  text-sm font-medium text-gray-900 "
            >
              Constante resorte (K)
            </label>
          </Tooltip>
          <InputEditable changeEs={changeEs} value={"lb/in"}>
            <input
              type="number"
              id="k"
              name="k"
              value={values["k"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 text-gray-900 border ${
                errors["k"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["k"] && (
              <p className="text-red-500 text-xs">{errors["k"]}</p>
            )}
          </InputEditable>
        </div>
      ) : null}

      {cases("DFMINMAX", bodyChoose, casesChoose) ? (
        <>
          <div>
            <Tooltip text="Es la deflexión que experimenta el resorte con Fmín">
              <label
                htmlFor="ymin"
                className="block text-sm font-medium text-gray-900 "
              >
                Deflexión Min
              </label>
            </Tooltip>
            <InputEditable changeEs={changeEs} value={"in"}>
              <input
                type="number"
                id="ymin"
                name="ymin"
                value={values["ymin"] || ""}
                onChange={handlerChange}
                className={`block w-full p-2 text-gray-900 border ${
                  errors["ymin"] ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors["ymin"] && (
                <p className="text-red-500 text-xs">{errors["ymin"]}</p>
              )}
            </InputEditable>
          </div>
          <div>
            <Tooltip text="Es la deflexión que experimenta el resorte con Fmax">
              <label
                htmlFor="ymax"
                className="block text-sm font-medium text-gray-900 "
              >
                Deflexión Max
              </label>
            </Tooltip>

            <InputEditable changeEs={changeEs} value={"in"}>
              <input
                type="number"
                id="ymax"
                name="ymax"
                value={values["ymax"] || ""}
                onChange={handlerChange}
                className={`block w-full p-2 text-gray-900 border ${
                  errors["ymax"] ? "border-red-500" : "border-gray-300"
                } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors["ymax"] && (
                <p className="text-red-500 text-xs">{errors["ymax"]}</p>
              )}
            </InputEditable>
          </div>
        </>
      ) : null}

      <div>
        <Tooltip text="Contiene una lista de 5 aceros con amplia usabilidad disponibles para el diseño del resorte.">
          <label
            htmlFor="material"
            className="block text-sm font-medium text-gray-900 "
          >
            Material
          </label>
        </Tooltip>
        <select
          id="material"
          name="material"
          value={values["material"] || ""}
          defaultValue={values["material"] || ""}
          onChange={handlerChange}
          className={`block w-full p-2 custom-select text-gray-900 border ${
            errors["material"] ? "border-red-500" : "border-gray-300"
          } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
        >
          <option selected>Escoge Material</option>
          {materiales.map((e) => (
            <option key={e.id} value={e.id}>
              {e.label}
            </option>
          ))}
        </select>
        {errors["material"] && (
          <p className="text-red-500 text-xs">{errors["material"]}</p>
        )}
      </div>
      <div>
        <Tooltip text="Es el espesor del material utilizado para la fabricación del resorte.">
          <label
            htmlFor="d"
            className="block  text-sm font-medium text-gray-900 "
          >
            Diametro
          </label>
        </Tooltip>

        <InputEditable changeEs={changeEs} value={"in"}>
          <select
            id="d"
            name="d"
            value={values["d"] || ""}
            defaultValue={values["d"] || ""}
            onChange={handlerChange}
            className={`block w-full p-2 custom-select text-gray-900 border ${
              errors["d"] ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
          >
            <option selected>Escoge Diametro</option>
            {diametros.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
          {errors["d"] && <p className="text-red-500 text-xs">{errors["d"]}</p>}
        </InputEditable>
      </div>

      {bodyChoose === "Compresión" ? (
        <div>
          <Tooltip text="Contiene una lista de detalles de extremos disponibles para el diseño de resortes helicoidales.">
            <label
              htmlFor="Extremos"
              className="block text-sm font-medium text-gray-900 "
            >
              Extremos
            </label>
          </Tooltip>
          <select
            id="Extremos"
            name="Extremos"
            value={values["Extremos"] || ""}
            onChange={handlerChange}
            className={`block w-full p-2 custom-select text-gray-900 border ${
              errors["Extremos"] ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
          >
            <option selected>Escoge un extremo</option>
            <option value="1">Planos</option>
            <option value="2">Planos esmerilados</option>
            <option value="3">Cuadrados</option>
            <option value="4">Cuadrados esmerilados</option>
          </select>
          {errors["Extremos"] && (
            <p className="text-red-500 text-xs">{errors["Extremos"]}</p>
          )}
        </div>
      ) : null}
      {bodyChoose !== "Extensión" ? (
        <>
          <div>
            <Tooltip text="Es la relación entre el diámetro medio de la espira (D) y el diámetro del alambre (d). ">
              <label
                htmlFor="C"
                className="block text-sm font-medium text-gray-900 "
              >
                Indice C
              </label>
            </Tooltip>

            <input
              type="number"
              id="C"
              name="C"
              value={values["C"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 custom-select text-gray-900 border ${
                errors["C"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["C"] && (
              <p className="text-red-500 text-xs">{errors["C"]}</p>
            )}
          </div>
          <div>
            <Tooltip text="Permite agregar esfuerzos resiudales benéficos en el resorte a partir de dos alternativas, Sin granallar y Granallado con Partículas.">
              <label
                htmlFor="Tratamiento"
                className="block text-sm font-medium text-gray-900 "
              >
                Tratamiento
              </label>
            </Tooltip>
            <select
              id="Tratamiento"
              name="Tratamiento"
              value={values["Tratamiento"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 custom-select text-gray-900 border ${
                errors["Tratamiento"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
            >
              <option selected>Escoge Tratamiento</option>
              <option value="1">Sin Granallar</option>
              <option value="2">Granallados</option>
            </select>
            {errors["Tratamiento"] && (
              <p className="text-red-500 text-xs">{errors["Tratamiento"]}</p>
            )}
          </div>
        </>
      ) : null}
      {bodyChoose === "Extensión" ? (
        <>
          {" "}
          <div>
            <Tooltip text="A partir de este factor se calcula el factor Kb. Depende del radio promedio del gancho y del diámetro del alambre.">
              <label
                htmlFor="C1"
                className="block  text-sm font-medium text-gray-900 "
              >
                Indice C1
              </label>
            </Tooltip>

            <input
              type="number"
              id="C1"
              name="C1"
              value={values["C1"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 custom-select text-gray-900 border ${
                errors["C1"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["C1"] && (
              <p className="text-red-500 text-xs">{errors["C1"]}</p>
            )}
          </div>
          <div>
            <Tooltip text="A partir de este factor se calcula el factor Kw2. Depende del radio en el lado de doblez y del diámetro del alambre. Su valor debe ser mayor a 4. ">
              <label
                htmlFor="C2"
                className="block  text-sm font-medium text-gray-900 "
              >
                Indice C2
              </label>
            </Tooltip>
            <input
              type="number"
              id="C2"
              name="C2"
              value={values["C2"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 custom-select text-gray-900 border ${
                errors["C2"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["C2"] && (
              <p className="text-red-500 text-xs">{errors["C2"]}</p>
            )}
          </div>
        </>
      ) : null}

      <div>
        <Tooltip text="Al seleccionar esta opción usted considerará que el resorte se someterá a cargas cíclicas.">
          <label
            htmlFor="Fatiga"
            className="block text-sm font-medium text-gray-900 "
          >
            Fatiga
          </label>
        </Tooltip>

        <select
          id="Fatiga"
          name="Fatiga"
          value={values["Fatiga"] || ""}
          onChange={handlerChange}
          className={`block w-full p-2 custom-select text-gray-900 border ${
            errors["Fatiga"] ? "border-red-500" : "border-gray-300"
          } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
        >
          <option selected>Escoge Fatiga</option>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
        {errors["Fatiga"] && (
          <p className="text-red-500 text-xs">{errors["Fatiga"]}</p>
        )}
      </div>
      {bodyChoose !== "Extensión" ? (
        <div>
          <Tooltip text=" El asentamiento permite agregar esfuerzos residuales al resorte a partir de la cedencia del material con el que se fabrica. ">
          <label
            htmlFor="Asentamiento"
            className="block text-sm font-medium text-gray-900 "
          >
            Asentamiento
          </label>
          </Tooltip>
         
          <select
            id="Asentamiento"
            name="Asentamiento"
            value={values["Asentamiento"] || ""}
            onChange={handlerChange}
            className={`block w-full p-2 custom-select text-gray-900 border ${
              errors["Asentamiento"] ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
          >
            <option selected>Escoge asentamiento</option>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
          {errors["Asentamiento"] && (
            <p className="text-red-500 text-xs">{errors["Asentamiento"]}</p>
          )}
        </div>
      ) : null}
      {bodyChoose === "Torsión" ? (
        <>
          <div>
            <Tooltip text="Es la variación del ángulo de rotación del resorte medido desde su posición libre hasta una posición final.">
              <label
                htmlFor="L1"
                className="block  text-sm font-medium text-gray-900 "
              >
                Theta
              </label>
            </Tooltip>

            <input
              type="number"
              id="theta"
              name="theta"
              value={values["theta"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 custom-select text-gray-900 border ${
                errors["theta"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["theta"] && (
              <p className="text-red-500 text-xs">{errors["theta"]}</p>
            )}
          </div>
          <div>
            <Tooltip text="Es la longitud de los extremos tangentes del resorte helicoidal de torsión. ">
              <label
                htmlFor="L1"
                className="block  text-sm font-medium text-gray-900 "
              >
                Long. Extremos 1
              </label>
            </Tooltip>

            <input
              type="number"
              id="L1"
              name="L1"
              value={values["L1"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 custom-select text-gray-900 border ${
                errors["L1"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["L1"] && (
              <p className="text-red-500 text-xs">{errors["L1"]}</p>
            )}
          </div>
          <div>
            <Tooltip text="Es la longitud de los extremos tangentes del resorte helicoidal de torsión. ">
              <label
                htmlFor="L2"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Long. Extremos 2
              </label>
            </Tooltip>
            <input
              type="number"
              id="L2"
              name="L2"
              value={values["L2"] || ""}
              onChange={handlerChange}
              className={`block w-full p-2 custom-select text-gray-900 border ${
                errors["L2"] ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors["L2"] && (
              <p className="text-red-500 text-xs">{errors["L2"]}</p>
            )}
          </div>
        </>
      ) : null}
      <div className="col-span-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            deleteValues();
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Borrar
        </button>
        <button
          onClick={onSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Calcular
        </button>
      </div>
    </div>
  );
};

const InputEditable: React.FC<{
  children: React.ReactNode;
  changeEs: boolean;
  value: string;
}> = ({ children, changeEs, value }) => {
  const chooseSystem = (value: string) => {
    if (changeEs) {
      switch (value) {
        case "in":
          return "mm";
        case "lb":
          return "N";
        case "lb/in":
          return "N/mm";
        case "lb*in":
          return "N*mm";
        case "Psi":
          return "Mpa";
        default:
          return value;
      }
    }
    return value;
  };

  return (
    <div className="relative">
      {children}
      <span className="absolute border-l text-sm border-gray-300 pl-2 right-2 top-1.5">
        {chooseSystem(value)}
      </span>
    </div>
  );
};

export default Form;

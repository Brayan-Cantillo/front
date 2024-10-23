import axios from "axios";

const url = "https://helicoiedu.onrender.com/";

export const getMaterial = async () => {
  try {
    return await axios.get(url + "materiales" );
  } catch (error) {
    return error;
  }
};

export const getDiametro = async (id: number) => {
  try {
    return await axios.get(url + "diametros/" + id );
  } catch (error) {
    return error;
  }
};

export const calculate = async (body: any) => {
  try {
    return await axios.post(url + "calculate", body);
  } catch (error) {
    return error;
  }
};

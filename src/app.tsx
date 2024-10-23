import React, { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import 'sweetalert2/src/sweetalert2.scss'

const App = () => {
  const [bodyChoose, setBodyChoose] = useState<string>("Compresión");
  const [changeEs, setChangeEs] = useState<boolean>(false);

  return (
    <div className="h-screen pt-20  ">
      <Header
        systemChoose={changeEs}
        setChangeEs={setChangeEs}
        bodyChoose={bodyChoose}
        setBodyChoose={setBodyChoose}
      />
      <Body changeEs={changeEs} bodyChoose={bodyChoose} />
    </div>
  );
};

export default App;

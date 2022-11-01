import { Route, Routes } from "react-router-dom";
import Main from "./page/Main.tsx"
import Detail from "./page/Detail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:detail" element={<Detail />} />
    </Routes>
  );
};

export default App;
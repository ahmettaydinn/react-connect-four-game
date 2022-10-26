import "./App.module.scss";

import Rules from "./pages/rules/Rules";
import MainMenu from "./pages/mainMenu/mainMenu";

import NotFound from "./pages/notFound/NotFound";
import { Routes, Route } from "react-router-dom";
// import { Routes, Route, Link, Navigate } from "react-router-dom";
import InGame from "./components/inGame/InGame";
function App() {
  return (
    <>
      <Routes>
        <Route path="/inGame" element={<InGame />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/" element={<MainMenu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

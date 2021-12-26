import React from "react";
import { Admin, Main } from "pages";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;

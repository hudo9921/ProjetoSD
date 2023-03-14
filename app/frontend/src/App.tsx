import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home, PageNotFound } from "./pages";

function App() {
  return (
    <div id='app'>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/test" element={<div>AAA</div>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

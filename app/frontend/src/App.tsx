import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home, PageNotFound, ProductsPage } from "./pages";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

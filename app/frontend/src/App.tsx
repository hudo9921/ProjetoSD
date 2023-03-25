import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home, PageNotFound, ProductsPage, ProductPage } from "./pages";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#b65dff",
      },
    },
  });

  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

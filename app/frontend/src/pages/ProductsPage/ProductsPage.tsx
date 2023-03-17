import { Box } from "@mui/material";
import React from "react";
import { Header } from "../../components";

const styles = {
  root: {
    backgroundColor: "#1e1e1e",
    height: "100vh",
    width: "75%",
    color: "white",
  },
};

type ProductsPageProps = {};

const ProductsPage = (props: ProductsPageProps) => {
  return (
    <Box sx={styles.root}>
      <Header />
    </Box>
  );
};

export default ProductsPage;

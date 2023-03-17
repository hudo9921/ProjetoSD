import { Box } from "@mui/material";
import React from "react";
import { Header, ProductsShowCase } from "../../components";
import useProducts from "../../hooks/use-products";

const styles = {
  root: {
    backgroundColor: "#1e1e1e",
    height: "100vh",
    width: "75%",
    color: "white",
  },
  topRatedProducts: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "10px",
    // gap: 2,
  },
};

type ProductsPageProps = {};

const ProductsPage = (props: ProductsPageProps) => {
  const { products } = useProducts();
  return (
    <Box sx={styles.root}>
      <Header />
      <Box
        sx={{
          fontSize: "5rem",
          width: "100%",
          height: "93%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* <Box sx={{width: '80%', height: '20%', bgcolor: 'red'}}></Box> */}
        {products && (
          <ProductsShowCase
            sx={{ width: "80%", height: "80%", ...styles.topRatedProducts }}
            products={products.results}
            title={"All Products"}
            textFormatNumber={22}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;

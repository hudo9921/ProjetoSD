import {
  Box,
  Button,
  Grid,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import useProduct from "../../hooks/use-product";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/number-input";
import ProductCard from "../../components/ProductsShowCase/ProductCard";
import useProducts from "../../hooks/use-products";

const styles = {
  root: {
    backgroundColor: "#1e1e1e",
    height: "100vh",
    width: "75%",
    color: "white",
  },
  productPageBox: {
    borderRadius: 2,
    width: "80%",
    height: "100%",
    border: `2px solid #413a41`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    mt: 4,
    mb: 4,
    color: "white",
  },
  productBox: {
    width: "100%",
    height: "73%",
    borderBottom: "2px solid #413a41",
    display: "flex",
  },
  prodImage: {
    position: "static",
    width: "40%",
    height: "100%",
    borderRight: "2px solid #413a41",
  },
  box: {
    width: "100%",
    p: 3,
    // "& *": {
    //   mb: 3,
    // },

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "2rem",
  },
  searchInput: {
    width: "19rem",
    "& .MuiTypography-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#413a41",
        borderWidth: "2px",
      },
      "&:hover fieldset": {
        borderColor: "#b65dff",
      },
    },
    "& input": {
      color: "white",
    },
    "& outlined-search": {
      color: "white",
    },
  },
  products: {
    width: "95%",
    height: "75%",
    display: "flex",
    gap: 5,
  },
  recommended: {
    width: "100%",
    height: "27%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

type Props = {};

const ProductPage = (props: Props) => {
  const { id } = useParams();
  const { product, refetch, isFetching, isLoading } = useProduct(id ?? "");

  const { products, refetch: refetchProducts } = useProducts(
    10,
    '',
    product!?.category
  );

  useEffect(() => {
    refetch();
  }, [id, refetch, refetchProducts]);

  if (isFetching || isLoading) {
    return <Box sx={styles.root}></Box>;
  }

  console.log(product);

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
        {product && products && (
          <Box sx={styles.productPageBox}>
            <Box sx={styles.productBox}>
              <Box
                sx={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "cover",
                  ...styles.prodImage,
                }}
              />
              <Box sx={{ width: "60%", height: "100%" }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    borderBottom: "2px solid #413a41",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    align="center"
                    fontWeight={"bold"}
                    sx={{
                      p: 3,
                      fontSize: "1.5rem",
                    }}
                  >
                    {product.title}
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", height: "80%" }}>
                  <Typography
                    variant="h6"
                    align="left"
                    component="div"
                    sx={{
                      p: 3,
                      fontSize: "1.1rem",
                      borderBottom: "2px solid #413a41",
                      height: '10rem',
                      overflowX: 'none',
                      overflowY: 'scroll'
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Box sx={styles.box}>
                    <Typography>
                      Rating Count: {product.rating_count}.
                    </Typography>
                    <Typography>
                      Rate: <strong>{product.rating_rate}</strong>.
                    </Typography>
                    <Typography>Price: {product.price} US$</Typography>
                    <Typography>In Stock: {product.stock_quant}.</Typography>
                    <TextField
                      sx={styles.searchInput}
                      id="outlined-search"
                      label="Quantity"
                      // value={searchQuery}
                      // onChange={(event) => setSearchQuery(event.target.value)}
                      type="search"
                    />
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#b65dff",
                        "&:hover": { bgcolor: "#7b3ead" },
                        width: "10rem",
                        height: "3.5rem",
                        color: "white",
                      }}
                      // onClick={}
                    >
                      <strong>Add to cart</strong>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={styles.recommended}>
              <Box sx={styles.products}>
                {products && (
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={
                      products.results.length > 3
                        ? { xs: 5, sm: 2, md: 20 }
                        : { xs: 1, sm: 3, md: 12 }
                    }
                  >
                    {products.results.slice(0, 5).map((product, index) => (
                      <Grid item xs={2} sm={4} md={4} key={index}>
                        <ProductCard
                          key={index}
                          product={product}
                          // handleMouseEnter={handleMouseEnter}
                          // handleMouseLeave={handleMouseLeave}
                          textFormatNumber={20}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductPage;

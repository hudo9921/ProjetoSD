import React from "react";
import Box from "@mui/material/Box";
import { Header } from "../../components";

const styles = {
  backgroundColor: "#1e1e1e",
  height: "100vh",
  width: "75%",
  // justifyContent: 'center',
  // alignItems: 'center',
  color: "white",
  // fontSize: '10rem'
};

type Props = {};
// #ffae5d
const Home = (props: Props) => {
  return (
    <Box sx={styles}>
      <Header />
      <Box
        sx={{
          fontSize: "5rem",
          width: "100%",
          height: "93%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Home
      </Box>
    </Box>
  );
};

export default Home;

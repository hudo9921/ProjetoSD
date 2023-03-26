import {
  alpha,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Header } from "../../components";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import useGetUserCart from "../../hooks/use-get-user-cart";
import useLogIn from "../../hooks/use-login-in";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants";
import { useEffect, useState } from "react";
import useProductMutation from "../../hooks/use-product-mutation";
import { CartItem, Product } from "../../types";

const styles = {
  backgroundColor: "#1e1e1e",
  height: "100vh",
  width: "75%",
  color: "white",
  topRatedProducts: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "10px",
    gap: 2,
  },
  cartBox: {
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
  title: {
    fontSize: "1.5rem",
    pl: 3,
  },
  productsBox: {
    width: "100%",
    height: "70%",
    // bgcolor: "red",
    borderBottom: "2px solid #413a41",
    borderTop: "2px solid #413a41",
  },
  table: {
    height: "100%",
    bgcolor: "#1e1e1e",
    "& .MuiTableCell-root": {
      fontSize: "1.2rem",
      color: "white",
    },
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root": {
        borderTop: "2px solid #413a41",
        "&:hover": {
          bgcolor: alpha("#413a41", 0.25),
        },
      },
    },
  },
  tableCell: {
    height: '1rem'
  }
};

type Props = {};

interface Row {
  product: Product;
  price: string;
  quantity: number;
  total: number;
}

const UserCart = (props: Props) => {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const { mutateAsync } = useGetUserCart();
  const { mutateAsync: mutateProd } = useProductMutation();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<Row[]>([]);

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  useEffect(() => {
    if (!accessToken) {
      navigate(Routes.HOME);
    } else {
      const tableData: Row[] = [];

      mutateAsync().then((data) => {
        data.items.forEach((item) => {
          tableData.push({
            product: item.product,
            total: parseFloat(item.price) * item.quantity,
            quantity: item.quantity,
            price: item.price,
          });
        });
      });
      setData(tableData);
    }
  }, [accessToken, mutateAsync, mutateProd, navigate]);

  console.log(data);

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
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Box sx={styles.cartBox}>
          <Box
            sx={{
              display: "flex",
              alignContent: "flex-start",
              justifyContent: "flex-start",
              width: "100%",
              py: 2,
            }}
          >
            <Typography sx={styles.title}>My cart</Typography>
          </Box>
          <Box sx={styles.productsBox}>
            <TableContainer sx={styles.table} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                    >
                      <TableCell component="th" scope="row">
                        {row.product.title}
                      </TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ width: "100%", height: "30%" }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCart;

import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { Endpoints } from "../constants/Endpoints/endpoints";
import { useAuth } from "../context";
import { ProductGetRequest } from "../types/";

function useAddProductToCart(productId: number, quantity: number) {
  const { accessToken } = useAuth();

  return useMutation(["login"], async (): Promise<User> => {
    const response = axios.get<{}, AxiosResponse<User>>(
      `${Endpoints.AUTH_SERVER}user/info`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return (await response).data;
  });
}

export default useAddProductToCart;

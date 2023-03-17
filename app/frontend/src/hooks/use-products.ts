import axios from 'axios';
import { useQuery } from 'react-query';
import { Endpoints } from "../constants/Endpoints/endpoints";
import { ProductGetRequest } from "../types/"

function useProducts() {
  const { data: products, isLoading, isFetching } = useQuery(
    [`products`],
    async () => {
      const response = await axios.get<ProductGetRequest>(`${Endpoints.BUSINESS_LOGIC}product`);
      return response.data
    },
    {
      staleTime: Infinity,
    }
  );

  return { products, isLoading, isFetching };
}

export default useProducts;
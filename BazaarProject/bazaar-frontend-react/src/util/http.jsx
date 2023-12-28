import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const PRODUCTS_API = "http://localhost:8080/api/v1/products";
  export async function getAllProducts (pageNumber = 1, categoryId, search, pageSize = 20) {
    const requestParams = {};
    if (categoryId) {
      requestParams.categoryId = categoryId;
    }

    if (search) {
      requestParams.search = search;
    }

    requestParams.pageNumber = pageNumber;
    requestParams.pageSize = pageSize;

    try {
      const response = await axios.get(PRODUCTS_API, { params: requestParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  export async function getProductById(productId){
    try {
      const response = await axios.get(`${PRODUCTS_API}/${productId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  };


  const Category_API = "http://localhost:8080/api/v1/categories";
  export async function getAllCategories () {
    try {
      const response = await axios.get(Category_API);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  const ORDERS_API = "http://localhost:8080/api/v1/orders";
  const COUNTRIES_API = "http://localhost:8080/api/v1/countries";
  const STATES_API = "http://localhost:8080/api/v1/states";
  export async function getAllCOUNTRIES () {
    try {
      const response = await axios.get(COUNTRIES_API);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
    export async function getstateByCountryId (country) {
      try {
        console.log(country);
        const response = await axios.get(`${STATES_API}/${country[0].id}`); 
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
  };

  export async function postOrder (orderData) {
    try {
      console.log(orderData);
      const response = await axios.post(ORDERS_API,orderData); 
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
};


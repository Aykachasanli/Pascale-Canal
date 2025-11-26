import $axios from "../../../api/axiosInterceptor";
import $api from "../../../api/endpoint";

export const getAllProducts = async () => {
  const response = await $axios.get($api("get_all_products"));
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await $axios.get(`${$api("get_single_product")}${id}`);
  return response.data;
};








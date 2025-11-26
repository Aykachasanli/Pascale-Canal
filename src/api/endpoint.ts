interface IEndpoints {
  get_all_products: string;
  get_single_product: string; 
  put_product: string;
}

const endpoints: IEndpoints = {
  get_all_products: "/products",
  get_single_product: "/products/", 
  put_product: "/products",
};

const $api = (key: keyof IEndpoints) => {
  return endpoints[key];
};

export default $api;

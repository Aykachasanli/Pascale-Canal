import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts, fetchProductById } from "../../../store/homeSlice"; 
import type { Product } from "../Model/HomeModel"; 

interface HomeProviderHook {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
    loadProductById: (id: string) => void;
}

export const useHomeProvider = (): HomeProviderHook => {
  const dispatch = useAppDispatch();
  const { products, selectedProduct, loading, error } = useAppSelector(
    (state) => state.home
  );

  useEffect(() => {
    if (products.length === 0 && !loading && !error) { 
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading, error]);

  const loadProductById = useCallback(
    (id: string) => {
      dispatch(fetchProductById(id));
    },
    [dispatch]
  );

  return { products, selectedProduct, loading, error, loadProductById };
};

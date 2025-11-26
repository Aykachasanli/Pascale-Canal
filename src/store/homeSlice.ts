import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductById } from "../Modules/Home/Service/HomeService";

export interface Product {
  _id: string;
  name: string;
  details: string;
  price: number;
  productImage: string;
  dimensions?: string;
  technique?: string;
  creationDate?: string;
  author?: string; 
}

interface HomeState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk<Product[]>(
  "home/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllProducts();
      return data;
    } catch (error) {
      return rejectWithValue("Məhsullar yüklənmədi!");
    }
  }
);


export const fetchProductById = createAsyncThunk<Product, string>(
  "home/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getProductById(id);
      return data;
    } catch (error) {
      return rejectWithValue("Məhsul tapılmadı!");
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

     
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedProduct } = homeSlice.actions;
export default homeSlice.reducer;

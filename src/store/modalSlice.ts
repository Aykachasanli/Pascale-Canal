import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SelectedFormat {
  name: string;
  price: number;
  type: "original" | "poster" | "giclee" | "other";
}

export interface ModalProductItem {
  artworkId: string;
  name: string;
  price: number;
  imageUrl: string;
  selectedFormat: SelectedFormat;
  quantity: number;
}

interface ModalState {
  isOpen: boolean;
  currentStep: number;
  product: ModalProductItem | null;
  buyerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  };
}

interface SelectedRelatedArtworks {
  selectedRelatedArtworks: ModalProductItem[];
}

interface MainProduct {
  mainProduct: ModalProductItem | null;
}

const initialState: ModalState & SelectedRelatedArtworks & MainProduct = {
  isOpen: false,
  currentStep: 1,
  product: null,
  buyerDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  },
  selectedRelatedArtworks: [],
  mainProduct: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {

    openModal: (
      state,
      action: PayloadAction<{ product: ModalProductItem }>
    ) => {
      state.isOpen = true;
      state.currentStep = 1;
      state.product = action.payload.product;
       state.mainProduct = action.payload.product;
      state.selectedRelatedArtworks = [];
    },


    closeModal: (state) => {
      state.isOpen = false;
      state.currentStep = 1;
      state.product = null;
      state.buyerDetails = initialState.buyerDetails;
    },

    goToNextStep: (state) => {
      state.currentStep += 1;
    
    },

    goToPreviousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },

    updateBuyerDetails: (
      state,
      action: PayloadAction<Partial<ModalState["buyerDetails"]>>
    ) => {
      state.buyerDetails = { ...state.buyerDetails, ...action.payload };
    },

    updateSelectedFormat: (state, action: PayloadAction<SelectedFormat>) => {
      if (state.product) {
        state.product.selectedFormat = action.payload;

        if (action.payload.type === "original") {
          state.product.quantity = 1;
        }
      }
    },

    updateQuantity: (state, action: PayloadAction<number>) => {
      if (state.product) {
        state.product.quantity = action.payload;
      }
    },
    toggleRelatedArtwork: (state, action: PayloadAction<ModalProductItem>) => {
      const exists = state.selectedRelatedArtworks.find(
        (item) => item.artworkId === action.payload.artworkId
      );

      if (exists) {

        state.selectedRelatedArtworks = state.selectedRelatedArtworks.filter(
          (item) => item.artworkId !== action.payload.artworkId
        );
      } else {

        state.selectedRelatedArtworks.push(action.payload);
      }
    },
    resetSelectedRelated: (state) => {
      state.selectedRelatedArtworks = [];
    },


  },
});

export const {
  openModal,
  closeModal,
  goToNextStep,
  goToPreviousStep,
  updateBuyerDetails,
  updateSelectedFormat,
  updateQuantity,
  toggleRelatedArtwork,
  resetSelectedRelated,
} = modalSlice.actions;

export default modalSlice.reducer;

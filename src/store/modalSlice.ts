
import { createSlice } from '@reduxjs/toolkit'; 
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ModalState, SelectedArtwork, UserCoordinates } from '../types/modalTypes';
import type { RootState } from './index'; 

const initialState: ModalState = {
  isModalOpen: false,
  currentStep: 1,
  totalSteps: 5,
  cartItems: [],
  coordinates: { firstName: '', lastName: '', email: '', phone: '' },
  userMessage:
    'Bonjour,\n\nJe vous contacte concernant l\'acquisition des œuvres sélectionnées. \n\nPouriez-vous me confirmer :\n- La disponibilité\n- Les modalités de livraison\n- Les options de paiement\n- Les délais de préparation\n\nJe reste à votre disposition pour tout complément d\'information.\n\nCordialement,',
  privacyAccepted: false,
  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ product: SelectedArtwork }>) => {
      state.isModalOpen = true;
      state.currentStep = 1;
      state.cartItems = [action.payload.product];
      state.submitSuccess = false;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.currentStep = 1;
      state.cartItems = [];
      state.coordinates = initialState.coordinates;
      state.userMessage = initialState.userMessage;
      state.privacyAccepted = false;
      state.submitSuccess = false;
    },

    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, state.totalSteps);
    },

    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 1);
    },

    toggleArtworkSelection: (state, action: PayloadAction<SelectedArtwork>) => {
      const itemIndex = state.cartItems.findIndex(item => item.artworkId === action.payload.artworkId);
      if (itemIndex > -1) {
        state.cartItems = state.cartItems.filter(item => item.artworkId !== action.payload.artworkId);
      } else {
        state.cartItems.push(action.payload);
      }
    },

    updateFormat: (state, action: PayloadAction<{ artworkId: string, format: SelectedArtwork['selectedFormat'] }>) => {
      const itemIndex = state.cartItems.findIndex(item => item.artworkId === action.payload.artworkId);
      if (itemIndex > -1) {
        state.cartItems[itemIndex].selectedFormat = action.payload.format;
        state.cartItems[itemIndex].price = action.payload.format.price; 
      }
    },

    updateCoordinates: (state, action: PayloadAction<Partial<UserCoordinates>>) => {
      state.coordinates = { ...state.coordinates, ...action.payload };
    },

    updateMessage: (state, action: PayloadAction<string>) => {
      state.userMessage = action.payload;
    },

    togglePrivacy: (state) => {
      state.privacyAccepted = !state.privacyAccepted;
    },

    setSubmitSuccess: (state, action: PayloadAction<boolean | undefined>) => {
      state.submitSuccess = action.payload ?? true;
    }
  },
});

export const { 
  openModal, 
  closeModal, 
  nextStep, 
  prevStep,
  toggleArtworkSelection,
  updateFormat,
  updateCoordinates,
  updateMessage,
  togglePrivacy,
  setSubmitSuccess
} = modalSlice.actions;

export const selectModalState = (state: RootState) => state.modal;

export default modalSlice.reducer;

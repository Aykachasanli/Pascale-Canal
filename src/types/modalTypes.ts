
export interface SelectedArtwork {
  artworkId: string;
  name: string;
  price: number;
  imageUrl: string;

  selectedFormat: {
    name: string;
    price: number;
    type: 'original' | 'poster' | 'other';
  };
  quantity: number;
}


export interface UserCoordinates {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}


export interface ModalState {
  isModalOpen: boolean;
  currentStep: number;
  totalSteps: number;

  cartItems: SelectedArtwork[]; 

  coordinates: UserCoordinates;

  userMessage: string;
  privacyAccepted: boolean;

  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
}
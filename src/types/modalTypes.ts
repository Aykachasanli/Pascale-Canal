// Seçilmiş əsərlərin format və miqdarını saxlayan tip
export interface SelectedArtwork {
  artworkId: string;
  name: string;
  price: number;
  imageUrl: string;
  // Əlavə olaraq format tipləri (Poster, Original və s.)
  selectedFormat: {
    name: string;
    price: number;
    type: 'original' | 'poster' | 'other';
  };
  quantity: number;
}

// İstifadəçi koordinatları üçün tip (Addım 4)
export interface UserCoordinates {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Modal statenin umumi tipi
export interface ModalState {
  isModalOpen: boolean;
  currentStep: number;
  totalSteps: number;
  // Step 1 secilmis eser ve digerleri
  cartItems: SelectedArtwork[]; 
  // Step 4 istifadeci melumatlari
  coordinates: UserCoordinates;
  // Step 5 Mesaj 
  userMessage: string;
  privacyAccepted: boolean;
  // Step 5 srvr cvbi
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
}
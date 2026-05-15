import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusinessFormState {
  step: number;
  formData: BusinessFormData;
  images: string[];
  isSubmitting: boolean;
  error: string | null;
}

interface BusinessFormData {
  businessName?: string;
  category?: string;
  district?: string;
  city?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
}

const initialState: BusinessFormState = {
  step: 1,
  formData: {},
  images: [],
  isSubmitting: false,
  error: null,
};

const businessFormSlice = createSlice({
  name: "businessForm",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<BusinessFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setImages: (state, action: PayloadAction<string[]>) => {
      state.images = action.payload;
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter(img => img !== action.payload);
    },
    resetForm: (state) => {
      state.step = 1;
      state.formData = {};
      state.images = [];
      state.isSubmitting = false;
      state.error = null;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setFormError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setStep, 
  updateFormData, 
  setImages, 
  addImage, 
  removeImage, 
  resetForm,
  setSubmitting,
  setFormError
} = businessFormSlice.actions;

export default businessFormSlice.reducer;

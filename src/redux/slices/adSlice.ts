import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdItem {
  id: string;
  imageUrl: string;
  desktopImageUrl?: string;
  link: string;
  placement: 'search_result_top_slider' | 'search_result_banner' | 'home_hero_slider' | 'business_profile_side_ad';
  categoryId?: string;
}

interface AdState {
  ads: AdItem[];
  loading: boolean;
  error: string | null;
}

const initialState: AdState = {
  ads: [
    // Initial mock data for demonstration
    {
      id: '1',
      imageUrl: '/ads/hero-ad.png',
      desktopImageUrl: '/ads/hero-ad.png',
      link: '#',
      placement: 'search_result_top_slider'
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200&h=400',
      desktopImageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200&h=300',
      link: '#',
      placement: 'search_result_top_slider'
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400&h=400',
      link: '#',
      placement: 'search_result_banner'
    },
    {
      id: '4',
      imageUrl: '/ads/side-ad.png',
      link: '#',
      placement: 'business_profile_side_ad'
    }
  ],
  loading: false,
  error: null,
};

const adSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setAds: (state, action: PayloadAction<AdItem[]>) => {
      state.ads = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAds, setLoading, setError } = adSlice.actions;
export default adSlice.reducer;

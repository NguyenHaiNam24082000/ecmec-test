import { getPartners } from '@apis/partnerApi';
import { imageType } from '@constants/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface partnerInterface {
  nameVn: string;
  nameEn: string;
  image: imageType[];
}

export const getPartnerApi = createAsyncThunk('partners/get', () => {
  return getPartners()
    .then((response) => response.data)
    .catch((error) => error.message);
});

interface partnerState {
  partner: partnerInterface[] | [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  partner: [
    {
      nameVn: 'ECMEC',
      nameEn: 'ECMEC',
      image: [{ imageId: 1, url: '/logo.png' }],
    },
    {
      nameVn: 'ECMEC',
      nameEn: 'ECMEC',
      image: [{ imageId: 2, url: '/logo.png' }],
    },
    {
      nameVn: 'ECMEC',
      nameEn: 'ECMEC',
      image: [{ imageId: 3, url: '/logo.png' }],
    },
    {
      nameVn: 'ECMEC',
      nameEn: 'ECMEC',
      image: [{ imageId: 4, url: '/logo.png' }],
    },
  ],
  loading: 'idle',
} as partnerState;

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPartnerApi.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getPartnerApi.fulfilled, (state, action: PayloadAction<any>) => {
      const data = action.payload;
      if (Array.isArray(data) && data.length > 0) {
        state.partner = data;
        state.loading = 'succeeded';
      }
    });
    builder.addCase(getPartnerApi.rejected, (state, action: PayloadAction<any>) => {
      state.loading = 'failed';
      console.error('Get partner failed!');
    });
  },
});

// export actions
export const {} = partnerSlice.actions;

export default partnerSlice.reducer;

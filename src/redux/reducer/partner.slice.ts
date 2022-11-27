import { getPartners } from '@apis/partnerApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface partnerInterface {
  nameVn: string;
  nameEn: string;
  image: string;
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
      nameVn: 'Hikari Bình Dương',
      nameEn: 'Hikari Bình Dương',
      image: '/logo.png',
    },
    {
      nameVn: 'Hikari Biên Hòa',
      nameEn: 'Hikari Biên Hòa',
      image: '/logo.png',
    },
    {
      nameVn: 'Nova Medic',
      nameEn: 'Nova Medic',
      image: '/logo.png',
    },
    {
      nameVn: 'The Sun',
      nameEn: 'The Sun',
      image: '/logo.png',
    },
    {
      nameVn: 'The Sun',
      nameEn: 'The Sun',
      image: '/logo.png',
    },
    {
      nameVn: 'The Sun',
      nameEn: 'The Sun',
      image: '/logo.png',
    },
    {
      nameVn: 'The Sun',
      nameEn: 'The Sun',
      image: '/logo.png',
    },
    {
      nameVn: 'The Sun',
      nameEn: 'The Sun',
      image: '/logo.png',
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
      if (Array.isArray(data)) {
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

import { getPartners } from '@apis/partnerApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface partnerInterface {
  name: string;
  image: string;
}

export const getPartnerApi = createAsyncThunk('partners/get', () => {
  return getPartners()
    .then((response) => response.data)
    .catch((error) => error.message);
});

interface partnerState {
  partner: partnerInterface[] | [];
  detail: partnerInterface;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  partner: [
    {
      name: 'Hikari Bình Dương',
      image: '/logo.png',
    },
    {
      name: 'Hikari Biên Hòa',
      image: '/logo.png',
    },
    {
      name: 'Nova Medic',
      image: '/logo.png',
    },
    {
      name: 'The Sun',
      image: '/logo.png',
    },
  ],
  detail: {
    name: '',
    image: '',
  },
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
      if (data.data) {
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

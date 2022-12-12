import { getPartners } from '@apis/partnerApi';
import { imageType } from '@constants/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface partnerInterface {
  id: number;
  nameVn: string;
  nameEn: string;
  isShow: boolean;
  priority: number;
  image: imageType[];
  createdTime?: string;
  createdUser?: string;
  modifiedTime?: string;
  modifiedUser?: string;
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
      id: 1,
      isShow: true,
      priority: 0,
      nameVn: 'ECMEC',
      nameEn: 'ECMEC',
      image: [{ imageId: 1, url: '/logo.png' }],
    },
    {
      id: 2,
      isShow: true,
      priority: 1,
      nameVn: 'ECMEC',
      nameEn: 'ECMEC',
      image: [{ imageId: 2, url: '/logo.png' }],
    },
    {
      id: 3,
      isShow: true,
      priority: 2,
      nameVn: 'ECMEC',
      nameEn: 'ECMEC',
      image: [{ imageId: 3, url: '/logo.png' }],
    },
    {
      id: 4,
      isShow: true,
      priority: 3,
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

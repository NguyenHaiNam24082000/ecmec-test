import { getIntroduction } from '@apis/introductionApi';
import { imageType } from '@constants/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  isAuth: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
    isAuth: false,
    loading: 'idle'
} as authState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
        state.isAuth = action.payload;
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(getAboutApi.pending, (state) => {
    //   state.loading = 'pending';
    // });
    // builder.addCase(getAboutApi.fulfilled, (state, action: PayloadAction<any>) => {
    //   const data = action.payload;
    //   if (Array.isArray(data)) {
    //     state.about = data;
    //     state.loading = 'succeeded';
    //   }
    // });
    // builder.addCase(getAboutApi.rejected, (state, action: PayloadAction<any>) => {
    //   state.loading = 'failed';
    //   console.error('Get about failed!');
    // });
  },
});

// export actions
export const {
    setIsAuth
} = authSlice.actions;

export default authSlice.reducer;

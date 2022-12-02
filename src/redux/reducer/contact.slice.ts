import { getContacts } from '@apis/contactApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface contactInterface {
  name: string;
  address: string;
  phonenumb: string;
  staticPhone: string;
  email: string;
  alternativeEmail: string;
}

// export const getContactApi = createAsyncThunk('contacts/get', () => {
//   return getContacts()
//     .then((response) => response.data)
//     .catch((error) => error.message);
// });

interface contactState {
  contact: contactInterface[] | [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  contact: [
    {
      name: 'Hanoi office',
      address: 'main_Address',
      phonenumb: '024773073777',
      staticPhone: '',
      email: 'info@ecmec.vn',
      alternativeEmail: 'info@ecmec.vn',
    },
    {
      name: 'Hanoi office',
      address: 'HN_Address',
      phonenumb: '(84.24)73073777',
      staticPhone: '(84.24)73073777',
      email: '',
      alternativeEmail: '',
    },
    {
      name: 'HCM office',
      address: 'HCM_Address',
      phonenumb: '(84.24)381 436 26',
      staticPhone: '(84.24)381 436 26',
      email: '',
      alternativeEmail: '',
    },
  ],
  loading: 'idle',
} as contactState;

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(getContactApi.pending, (state) => {
  //     state.loading = 'pending';
  //   });
  //   builder.addCase(getContactApi.fulfilled, (state, action: PayloadAction<any>) => {
  //     const data = action.payload;
  //     if (data.data) {
  //       state.contact = data;
  //       state.loading = 'succeeded';
  //     }
  //   });
  //   builder.addCase(getContactApi.rejected, (state, action: PayloadAction<any>) => {
  //     state.loading = 'failed';
  //     console.error('Get contact failed!');
  //   });
  // },
});

// export actions
export const {} = contactSlice.actions;

export default contactSlice.reducer;

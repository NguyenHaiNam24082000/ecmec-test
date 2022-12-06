import { createSlice } from '@reduxjs/toolkit';

export interface contactInterface {
  name: string;
  address: string;
  phonenumb: string;
  staticPhone: string;
  email: string;
  alternativeEmail: string;
}

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
      phonenumb: '(84) 28 3814 3625',
      staticPhone: '(028) 3814 3625',
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
});

// export actions
export const {} = contactSlice.actions;

export default contactSlice.reducer;

import { getProjects } from '@apis/projectApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface projectInterface {
  name: string;
  service: number[];
  address: string;
  image: string[];
  path: string;
  status: 'pending' | 'completed' | 'failed';
}

export const getProjectApi = createAsyncThunk('projects/get', () => {
  return getProjects()
    .then((response) => response.data)
    .catch((error) => error.message);
});

interface projectState {
  project: projectInterface[] | [];
  detail: projectInterface;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  project: [
    {
      name: 'Hikari Bình Dương',
      address: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [1, 2],
      image: ['/assets/projects/hikari-binh-duong.png', '/assets/projects/hikari-binh-duong-2.png'],
      path: '1',
      status: 'pending',
    },
    {
      name: 'Nova Medic',
      address: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [2],
      image: ['/assets/projects/nova1_1.jpg', '/assets/projects/hikari-binh-duong-2.png'],
      path: '2',
      status: 'completed',
    },
    {
      name: 'Trụ sở văn phòng C.P Đồng Nai',
      address: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [3, 4],
      image: ['/assets/projects/dong_nai.jpg', '/assets/projects/hikari-binh-duong-2.png'],
      path: '3',
      status: 'completed',
    },
    {
      name: 'The Sun',
      address: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [4, 5],
      image: ['/assets/projects/hikari-binh-duong.png', '/assets/projects/hikari-binh-duong-2.png'],
      path: '4',
      status: 'pending',
    },
  ],
  detail: {
    name: '',
    service: [NaN],
    address: '',
    image: [''],
    path: '',
    status: 'pending',
  },
  loading: 'idle',
} as projectState;

const userSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectApi.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getProjectApi.fulfilled, (state, action: PayloadAction<any>) => {
      const data = action.payload;
      if (data.data) {
        state.project = data;
        state.loading = 'succeeded';
      }
    });
    builder.addCase(getProjectApi.rejected, (state, action: PayloadAction<any>) => {
      state.loading = 'failed';
      console.error('Get project failed!');
    });
  },
});

// export actions
export const {} = userSlice.actions;

export default userSlice.reducer;

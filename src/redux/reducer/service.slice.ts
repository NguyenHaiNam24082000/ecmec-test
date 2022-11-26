import { getService } from '@apis/serviceApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface serviceInterface {
  id: number;
  name: string;
  image: string;
  path: string;
  content: string;
  withOverlay: boolean;
}

export const getServiceApi = createAsyncThunk('service/get', () => {
  return getService()
    .then((response) => response.data)
    .catch((error) => error.message);
});

interface serviceState {
  service: serviceInterface[] | [];
  detail: serviceInterface;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  service: [
    {
      id: 1,
      name: 'Cung cấp, lắp đặt hệ thống điện',
      image: '/assets/service/dien.png',
      path: '1',
      content:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',
      withOverlay: false,
    },
    {
      id: 2,
      name: 'Hệ thống cấp thoát nước',
      image: '/assets/service/thoat-nuoc.png',
      content:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',

      path: '2',
      withOverlay: false,
    },
    {
      id: 3,
      name: 'Hệ thống chữa cháy',
      image: '/assets/service/chua-chay.png',
      content:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',

      path: '3',
      withOverlay: false,
    },
    {
      id: 4,
      name: 'Hệ thống điều hòa không khí & thông gió',
      image: '/assets/service/thong-gio.png',
      content:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',

      path: '4',
      withOverlay: false,
    },
    {
      id: 5,
      name: 'Hệ thống đường ống công nghệ',
      image: '/assets/service/ong-cong-nghe.png',
      content:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',

      path: '5',
      withOverlay: false,
    },
  ],
  detail: {
    id: NaN,
    name: '',
    image: '',
    path: '',
    content: '',
    withOverlay: false,
  },
  loading: 'idle',
} as serviceState;

const userSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServiceApi.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getServiceApi.fulfilled, (state, action: PayloadAction<any>) => {
      const data = action.payload;
      if (data) {
        state.service = data;
        state.loading = 'succeeded';
      }
    });
    builder.addCase(getServiceApi.rejected, (state, action: PayloadAction<any>) => {
      state.loading = 'failed';
      console.error('Get service failed!');
    });
  },
});

// export actions
export const {} = userSlice.actions;

export default userSlice.reducer;

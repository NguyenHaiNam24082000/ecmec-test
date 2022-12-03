import { getService } from '@apis/serviceApi';
import { imageType } from '@constants/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface serviceInterface {
  id: number;
  nameVn: string;
  nameEn: string;
  images: imageType[]; // Mảng 2 hình ảnh, hình đầu tiên là hình trưng bày bên ngoài, hình thứ 2 hiển thị trong bài viết
  priority?: number;
  isShow?: boolean;
  contentVn: string;
  contentEn: string;
  createdTime?: string;
  createdUser?: string;
  modifiedTime?: string;
  modifiedUser?: string;
  withOverlay?: boolean; //Cái này bỏ qua
}

export const getServiceApi = createAsyncThunk('service/get', () => {
  return getService()
    .then((response) => response.data)
    .catch((error) => error.message);
});

interface serviceState {
  service: serviceInterface[] | [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  service: [
    {
      id: 1,
      nameVn: 'Cung cấp, lắp đặt hệ thống điện',
      nameEn: 'Cung cấp, lắp đặt hệ thống điện',
      images: [{ imageId: 1, url: '/assets/service/dien.png' }],
      priority: 1,
      isShow: true,
      contentVn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',
      contentEn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',
      withOverlay: false,
    },
    {
      id: 2,
      nameVn: 'Hệ thống cấp thoát nước',
      nameEn: 'Hệ thống cấp thoát nước',
      images: [{ imageId: 1, url: '/assets/service/thoat-nuoc.png' }],
      priority: 2,
      isShow: true,
      contentVn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',
      contentEn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',

      withOverlay: false,
    },
    {
      id: 3,
      nameVn: 'Hệ thống chữa cháy',
      nameEn: 'Hệ thống chữa cháy',
      images: [{ imageId: 1, url: '/assets/service/chua-chay.png' }],
      priority: 3,
      isShow: true,
      contentVn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',
      contentEn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',

      withOverlay: false,
    },
    {
      id: 4,
      nameVn: 'Hệ thống điều hòa không khí & thông gió',
      nameEn: 'Hệ thống điều hòa không khí & thông gió',
      images: [{ imageId: 1, url: '/assets/service/thong-gio.png' }],
      priority: 4,
      isShow: true,
      contentVn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',
      contentEn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',

      withOverlay: false,
    },
    {
      id: 5,
      nameVn: 'Hệ thống đường ống công nghệ',
      nameEn: 'Hệ thống đường ống công nghệ',
      images: [{ imageId: 1, url: '/assets/service/ong-cong-nghe.png' }],
      priority: 5,
      isShow: true,
      contentVn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',
      contentEn:
        '<ul><li>Hệ thống điện trung thế gồm trạm biến áp,tủ trung thế</li><li>Hệ thống điện hạ thế đầu nguồn tủ điện hạ thế,</li><li>Tủ điện phân phối, máy phát điện,</li><li>Hệ thống điện phân phối (gồm: tủ điện chính, tủ phân phối, tủ điều khiển);</li><li>Hệ thống thang máng cáp, cáp điện,thanh dẫn;</li><li>Hệ thống công tắc, ổ cắm, điều khiển đèn;</li><li>Hệ thống chiếu sáng trong và ngoài nhà;</li><li>Hệ thống chống sét và tiếp địa;</li><li>Hệ thống quản lý tự động tòa nhà;</li><li>Hệ thống báo cháy;</li><li>Hệ thống thông báo công cộng;</li><li>Hệ thống kiểm soát cửa, gọi cửa;</li><li>Hệ thống camera an ninh, chống trộm;</li><li>Hệ thống điện thoại, internet;</li><li>Hệ thống nghe nhìn phòng họp, hội trường;</li><li>Hệ thống truyền hình trung tâm</li></ul>',

      withOverlay: false,
    },
  ],
  loading: 'idle',
} as serviceState;

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServiceApi.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getServiceApi.fulfilled, (state, action: PayloadAction<any>) => {
      const data = action.payload;
      if (Array.isArray(data)) {
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
export const {} = serviceSlice.actions;

export default serviceSlice.reducer;

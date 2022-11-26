import { getAbout } from '@apis/aboutApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface aboutInterface {
  id: number;
  name: string;
  image: string;
  content: string;
  path: string;
}

export const getAboutApi = createAsyncThunk('about/get', () => {
  return getAbout()
    .then((response) => response.data)
    .catch((error) => error.message);
});

interface aboutState {
  about: aboutInterface[] | [];
  detail: aboutInterface;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  about: [
    {
      id: 1,
      name: 'Giới thiệu chung',
      image: '/assets/about/gioi-thieu.png',
      content:
        '<p><span style="background-color: transparent;">Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..</span></p><p><br></p><p><span style="background-color: transparent;">Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:</span></p><ul><li><span style="background-color: transparent;">Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..</span></li><li><span style="background-color: transparent;">Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..</span></li><li><span style="background-color: transparent;">Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.</span></li></ul><p><br></p><p><span style="background-color: transparent;">Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..</span></p><p><span style="background-color: transparent;">Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</span></p><p><span style="background-color: transparent;">Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.</span></p><p><br></p>',
      path: '1',
    },
    {
      id: 2,
      name: 'Nhân sự và sơ đồ tổ chức',
      image: '/assets/about/nhan-su.png',
      content:
        '<p><span style="background-color: transparent;">Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..</span></p><p><br></p><p><span style="background-color: transparent;">Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:</span></p><ul><li><span style="background-color: transparent;">Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..</span></li><li><span style="background-color: transparent;">Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..</span></li><li><span style="background-color: transparent;">Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.</span></li></ul><p><br></p><p><span style="background-color: transparent;">Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..</span></p><p><span style="background-color: transparent;">Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</span></p><p><span style="background-color: transparent;">Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.</span></p><p><br></p>',
      path: '2',
    },
    {
      id: 3,
      name: 'Hệ thống quản lý chất lượng',
      image: '/assets/about/he-thong.png',
      content:
        '<p><span style="background-color: transparent;">Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..</span></p><p><br></p><p><span style="background-color: transparent;">Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:</span></p><ul><li><span style="background-color: transparent;">Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..</span></li><li><span style="background-color: transparent;">Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..</span></li><li><span style="background-color: transparent;">Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.</span></li></ul><p><br></p><p><span style="background-color: transparent;">Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..</span></p><p><span style="background-color: transparent;">Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</span></p><p><span style="background-color: transparent;">Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.</span></p><p><br></p>',

      path: '3',
    },
    {
      id: 4,
      name: 'An toàn - Sức khoẻ vệ sinh môi trường',
      image: '/assets/about/moi-truong.png',
      content:
        '<p><span style="background-color: transparent;">Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..</span></p><p><br></p><p><span style="background-color: transparent;">Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:</span></p><ul><li><span style="background-color: transparent;">Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..</span></li><li><span style="background-color: transparent;">Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..</span></li><li><span style="background-color: transparent;">Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.</span></li></ul><p><br></p><p><span style="background-color: transparent;">Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..</span></p><p><span style="background-color: transparent;">Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</span></p><p><span style="background-color: transparent;">Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.</span></p><p><br></p>',
      path: '4',
    },
  ],
  detail: {
    id: NaN,
    name: '',
    image: '',
    path: '',
    content: '',
  },
  loading: 'idle',
} as aboutState;

const userSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAboutApi.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAboutApi.fulfilled, (state, action: PayloadAction<any>) => {
      const data = action.payload;
      if (data) {
        state.about = data;
        state.loading = 'succeeded';
      }
    });
    builder.addCase(getAboutApi.rejected, (state, action: PayloadAction<any>) => {
      state.loading = 'failed';
      console.error('Get about failed!');
    });
  },
});

// export actions
export const {} = userSlice.actions;

export default userSlice.reducer;

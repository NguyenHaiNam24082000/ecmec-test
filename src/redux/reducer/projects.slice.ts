import { getProjects } from '@apis/projectApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface projectInterface {
  id: number;
  nameVn: string; //Name of the project bỏ phần title
  nameEn: string; //Name of the project bỏ phần title
  service: number[]; //Mảng id service của project
  addressVn: string; //trường này trong db còn thiếu
  addressEn: string; //trường này trong db còn thiếu
  image: string[];
  area: string; //VD: 30000 m
  timeEn: string; //VD: 12 months
  timeVn: string; //VD: 12 tháng
  owner: string;
  start: string; //startTime
  mainContractor: string;
  contentVn: string;
  contentEn: string;
  priority?: number;
  isShow?: boolean;
  createdTime?: string;
  createdUser?: string;
  modifiedTime?: string;
  modifiedUser?: string;
  status: 'in progress' | 'completed' | 'failed';
}

export const getProjectApi = createAsyncThunk('projects/get', () => {
  return getProjects()
    .then((response) => response.data)
    .catch((error) => error.message);
});

interface projectState {
  project: projectInterface[] | [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  project: [
    {
      id: 1,
      nameVn: 'Hikari Bình Dương',
      nameEn: 'Hikari Bình Dương',
      addressVn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      addressEn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [1, 2],
      area: '30000 m',
      timeVn: '12 thang',
      timeEn: '12 months',
      owner: 'Abc',
      start: '12/2021',
      isShow: true,
      priority: 1,
      mainContractor: 'Ecmec',
      contentVn: `
    Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:
    
    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..
    
    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..
    
    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.
    
    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..
    
    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..
    
    Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
    `,
      contentEn: `
    Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:
    
    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..
    
    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..
    
    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.
    
    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..
    
    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..
    
    Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
    `,
      image: ['/assets/projects/hikari-binh-duong.png', '/assets/projects/hikari-binh-duong-2.png'],
      status: 'pending',
    },
    {
      id: 2,
      nameVn: 'Nova Medic',
      nameEn: 'Nova Medic',
      addressVn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      addressEn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [2],
      area: '30000 m',
      timeVn: '12 thang',
      timeEn: '12 months',
      owner: 'Abc',
      start: '12/2021',
      isShow: true,
      priority: 2,
      mainContractor: 'Ecmec',
      contentVn: `
    Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:
    
    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..
    
    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..
    
    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.
    
    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..
    
    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..
    
    Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
    `,
      contentEn: `
    Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:
    
    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..
    
    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..
    
    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.
    
    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..
    
    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..
    
    Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
    `,
      image: ['/assets/projects/nova1_1.jpg', '/assets/projects/hikari-binh-duong-2.png'],
      status: 'completed',
    },
    {
      id: 3,
      nameVn: 'Trụ sở văn phòng C.P Đồng Nai',
      nameEn: 'Trụ sở văn phòng C.P Đồng Nai',
      addressVn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      addressEn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [3, 4],
      area: '30000 m',
      timeVn: '12 thang',
      timeEn: '12 months',
      owner: 'Abc',
      start: '12/2021',
      isShow: true,
      priority: 3,
      mainContractor: 'Ecmec',
      contentVn: `
    Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:
    
    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..
    
    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..
    
    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.
    
    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..
    
    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..
    
    Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
    `,
      contentEn: `
    Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:
    
    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..
    
    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..
    
    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.
    
    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..
    
    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..
    
    Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
    `,
      image: ['/assets/projects/dong_nai.jpg', '/assets/projects/hikari-binh-duong-2.png'],
      status: 'completed',
    },
    {
      id: 4,
      nameVn: 'The Sun',
      nameEn: 'The Sun',
      addressVn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      addressEn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [4, 5],
      area: '30000 m',
      timeVn: '12 thang',
      timeEn: '12 months',
      owner: 'Abc',
      start: '12/2021',
      isShow: true,
      priority: 4,
      mainContractor: 'Ecmec',
      contentVn: `
    Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:
    
    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..
    
    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..
    
    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.
    
    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..
    
    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..
    
    Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
    `,
      contentEn: `
    Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:
    
    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..
    
    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..
    
    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.
    
    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..
    
    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..
    
    Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
    `,
      image: ['/assets/projects/hikari-binh-duong.png', '/assets/projects/hikari-binh-duong-2.png'],
      status: 'pending',
    },
  ],
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
      if (Array.isArray(data)) {
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

import { getProjects } from '@apis/projectApi';
import { imageType } from '@constants/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { serviceInterface } from './service.slice';

export interface projectInterface {
  id: number;
  status: 'in progress' | 'completed' | 'failed';
  nameVn: string; //Name of the project bỏ phần title
  nameEn: string; //Name of the project bỏ phần title
  addressVn: string; //trường này trong db còn thiếu
  addressEn: string; //trường này trong db còn thiếu
  contentVn: string;
  contentEn: string;
  area: number; //VD: 30000 m
  duration: number;
  investor: string;
  start: string; //startTime
  mainContractor: string;
  priority?: number;
  isShow?: boolean;
  service: serviceInterface[]; //Mảng id service của project
  images: imageType[];
  createdTime?: string;
  createdUser?: string;
  modifiedTime?: string;
  modifiedUser?: string;
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
      ],
      area: 30000,
      duration: 12,
      investor: 'Abc',
      start: '12/2021',
      isShow: true,
      priority: 1,
      mainContractor: 'Ecmec',
      contentVn:
        '<p>Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..</p><p></p><p>    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:</p><p>    </p><p>    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..</p><p>    </p><p>    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..</p><p>    </p><p>    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.</p><p>    </p><p>    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..</p><p>    </p><p>    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</p><p>    </p><p>  Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.</p><p>    </p>',
      contentEn:
        '<p>Founded by a team of enthusiastic professionals who have worked together for more than a decade from the predecessor company, inheriting the construction experience of various types of projects in terms of scale, fields and regions. With geographical location plus stable financial capacity, ECMEC&#x27;s products and services currently still focus on the strength of providing full-service electromechanical service solutions (construction and installation of M&amp;E systems for construction projects). ) belongs to the projects of commercial areas, cinemas, high-end fashion stores, restaurants, coffee shops, industrial houses, service houses and residential areas, ..</p><p></p><p>     We have built trust by our collaborative attitude, quality of solutions and construction, meeting construction time and cost to accompany many customers with leading reputation in each business field. such as CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Typical strengths projects our team has implemented:</p><p>    </p><p>     Cinema chain CGV - formerly known as Megastar, from 2006 to this point, we have implemented more than 20 cinema projects nationwide. Each CGV project is fully invested with technical systems: electrodynamics, UPS backup power, lighting, low voltage electrical systems such as cameras, public announcements, fire alarms, BMS, magnetic doors, Air conditioning, smoke extraction, water supply and drainage for toilets, automatic fire sprinkler, ..</p><p>    </p><p>     We have provided M&amp;E construction and maintenance services for most of the high-end fashion brands such as Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada, .. at shopping centers. District 1, Hoan Kiem, Siem Reap such as Vincom Dong Khoi, Union Square, Rex hotel, Trang Tien Plaza, Sofitel Metropole Legend hotel, DFS T Galleria, ..</p><p>    </p><p>     The system of restaurants, cafes, fast food stores such as Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido, .. are regular customers of ECMEC. We provide kitchen ventilation solutions, dining space air conditioning or complete electromechanical solutions.</p><p>    </p><p>     In the field of industrial buildings, warehouses, clean rooms, our team has implemented projects with very high technical and occupational safety standards such as First Solar, BBraun, Terumo, ..</p><p>    </p><p>     Partners, main contractors, consulting firms, suppliers, brands have collaborated on projects: Kingsmen, Alliance, Hoa Binh, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hainan, Creative, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</p><p>    </p><p>     With the mission of giving customers the satisfaction above expectations, the ECMEC team always works with dedication and a sense of self-renewal to develop and prosper together.</p>',
      images: [
        { imageId: 1, url: '/assets/projects/hikari-binh-duong.png' },
        { imageId: 2, url: '/assets/projects/hikari-binh-duong-2.png' },
      ],
      status: 'in progress',
    },
    {
      id: 2,
      nameVn: 'Nova Medic',
      nameEn: 'Nova Medic',
      addressVn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      addressEn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [
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
      ],
      area: 30000,
      duration: 12,
      investor: 'Abc',
      start: '12/2021',
      isShow: true,
      priority: 2,
      mainContractor: 'Ecmec',
      contentVn:
        '<p>Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..</p><p></p><p>    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:</p><p>    </p><p>    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..</p><p>    </p><p>    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..</p><p>    </p><p>    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.</p><p>    </p><p>    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..</p><p>    </p><p>    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</p><p>    </p><p>  Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.</p><p>    </p>',
      contentEn:
        '<p>Founded by a team of enthusiastic professionals who have worked together for more than a decade from the predecessor company, inheriting the construction experience of various types of projects in terms of scale, fields and regions. With geographical location plus stable financial capacity, ECMEC&#x27;s products and services currently still focus on the strength of providing full-service electromechanical service solutions (construction and installation of M&amp;E systems for construction projects). ) belongs to the projects of commercial areas, cinemas, high-end fashion stores, restaurants, coffee shops, industrial houses, service houses and residential areas, ..</p><p></p><p>     We have built trust by our collaborative attitude, quality of solutions and construction, meeting construction time and cost to accompany many customers with leading reputation in each business field. such as CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Typical strengths projects our team has implemented:</p><p>    </p><p>     Cinema chain CGV - formerly known as Megastar, from 2006 to this point, we have implemented more than 20 cinema projects nationwide. Each CGV project is fully invested with technical systems: electrodynamics, UPS backup power, lighting, low voltage electrical systems such as cameras, public announcements, fire alarms, BMS, magnetic doors, Air conditioning, smoke extraction, water supply and drainage for toilets, automatic fire sprinkler, ..</p><p>    </p><p>     We have provided M&amp;E construction and maintenance services for most of the high-end fashion brands such as Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada, .. at shopping centers. District 1, Hoan Kiem, Siem Reap such as Vincom Dong Khoi, Union Square, Rex hotel, Trang Tien Plaza, Sofitel Metropole Legend hotel, DFS T Galleria, ..</p><p>    </p><p>     The system of restaurants, cafes, fast food stores such as Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido, .. are regular customers of ECMEC. We provide kitchen ventilation solutions, dining space air conditioning or complete electromechanical solutions.</p><p>    </p><p>     In the field of industrial buildings, warehouses, clean rooms, our team has implemented projects with very high technical and occupational safety standards such as First Solar, BBraun, Terumo, ..</p><p>    </p><p>     Partners, main contractors, consulting firms, suppliers, brands have collaborated on projects: Kingsmen, Alliance, Hoa Binh, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hainan, Creative, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</p><p>    </p><p>     With the mission of giving customers the satisfaction above expectations, the ECMEC team always works with dedication and a sense of self-renewal to develop and prosper together.</p>',
      images: [
        { imageId: 1, url: '/assets/projects/nova1_1.jpg' },
        { imageId: 2, url: '/assets/projects/hikari-binh-duong-2.png' },
      ],
      status: 'completed',
    },
    {
      id: 3,
      nameVn: 'Trụ sở văn phòng C.P Đồng Nai',
      nameEn: 'Trụ sở văn phòng C.P Đồng Nai',
      addressVn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      addressEn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [
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
      ],
      area: 30000,
      duration: 12,
      investor: 'Abc',
      start: '12/2021',
      isShow: true,
      priority: 3,
      mainContractor: 'Ecmec',
      contentVn:
        '<p>Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..</p><p></p><p>    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:</p><p>    </p><p>    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..</p><p>    </p><p>    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..</p><p>    </p><p>    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.</p><p>    </p><p>    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..</p><p>    </p><p>    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</p><p>    </p><p>  Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.</p><p>    </p>',
      contentEn:
        '<p>Founded by a team of enthusiastic professionals who have worked together for more than a decade from the predecessor company, inheriting the construction experience of various types of projects in terms of scale, fields and regions. With geographical location plus stable financial capacity, ECMEC&#x27;s products and services currently still focus on the strength of providing full-service electromechanical service solutions (construction and installation of M&amp;E systems for construction projects). ) belongs to the projects of commercial areas, cinemas, high-end fashion stores, restaurants, coffee shops, industrial houses, service houses and residential areas, ..</p><p></p><p>     We have built trust by our collaborative attitude, quality of solutions and construction, meeting construction time and cost to accompany many customers with leading reputation in each business field. such as CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Typical strengths projects our team has implemented:</p><p>    </p><p>     Cinema chain CGV - formerly known as Megastar, from 2006 to this point, we have implemented more than 20 cinema projects nationwide. Each CGV project is fully invested with technical systems: electrodynamics, UPS backup power, lighting, low voltage electrical systems such as cameras, public announcements, fire alarms, BMS, magnetic doors, Air conditioning, smoke extraction, water supply and drainage for toilets, automatic fire sprinkler, ..</p><p>    </p><p>     We have provided M&amp;E construction and maintenance services for most of the high-end fashion brands such as Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada, .. at shopping centers. District 1, Hoan Kiem, Siem Reap such as Vincom Dong Khoi, Union Square, Rex hotel, Trang Tien Plaza, Sofitel Metropole Legend hotel, DFS T Galleria, ..</p><p>    </p><p>     The system of restaurants, cafes, fast food stores such as Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido, .. are regular customers of ECMEC. We provide kitchen ventilation solutions, dining space air conditioning or complete electromechanical solutions.</p><p>    </p><p>     In the field of industrial buildings, warehouses, clean rooms, our team has implemented projects with very high technical and occupational safety standards such as First Solar, BBraun, Terumo, ..</p><p>    </p><p>     Partners, main contractors, consulting firms, suppliers, brands have collaborated on projects: Kingsmen, Alliance, Hoa Binh, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hainan, Creative, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</p><p>    </p><p>     With the mission of giving customers the satisfaction above expectations, the ECMEC team always works with dedication and a sense of self-renewal to develop and prosper together.</p>',
      images: [
        { imageId: 1, url: '/assets/projects/dong_nai.jpg' },
        { imageId: 2, url: '/assets/projects/hikari-binh-duong-2.png' },
      ],
      status: 'completed',
    },
    {
      id: 4,
      nameVn: 'The Sun',
      nameEn: 'The Sun',
      addressVn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      addressEn: 'Lô A11 - A12 - A16, Đường Lý Thái Tổ, Thủ Dầu Một, Bình Dương',
      service: [
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
      area: 30000,
      duration: 12,
      investor: 'Abc',
      start: '12/2021',
      isShow: true,
      priority: 4,
      mainContractor: 'Ecmec',
      contentVn:
        '<p>Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..</p><p></p><p>    Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:</p><p>    </p><p>    Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..</p><p>    </p><p>    Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..</p><p>    </p><p>    Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.</p><p>    </p><p>    Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..</p><p>    </p><p>    Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</p><p>    </p><p>  Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.</p><p>    </p>',
      contentEn:
        '<p>Founded by a team of enthusiastic professionals who have worked together for more than a decade from the predecessor company, inheriting the construction experience of various types of projects in terms of scale, fields and regions. With geographical location plus stable financial capacity, ECMEC&#x27;s products and services currently still focus on the strength of providing full-service electromechanical service solutions (construction and installation of M&amp;E systems for construction projects). ) belongs to the projects of commercial areas, cinemas, high-end fashion stores, restaurants, coffee shops, industrial houses, service houses and residential areas, ..</p><p></p><p>     We have built trust by our collaborative attitude, quality of solutions and construction, meeting construction time and cost to accompany many customers with leading reputation in each business field. such as CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Typical strengths projects our team has implemented:</p><p>    </p><p>     Cinema chain CGV - formerly known as Megastar, from 2006 to this point, we have implemented more than 20 cinema projects nationwide. Each CGV project is fully invested with technical systems: electrodynamics, UPS backup power, lighting, low voltage electrical systems such as cameras, public announcements, fire alarms, BMS, magnetic doors, Air conditioning, smoke extraction, water supply and drainage for toilets, automatic fire sprinkler, ..</p><p>    </p><p>     We have provided M&amp;E construction and maintenance services for most of the high-end fashion brands such as Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada, .. at shopping centers. District 1, Hoan Kiem, Siem Reap such as Vincom Dong Khoi, Union Square, Rex hotel, Trang Tien Plaza, Sofitel Metropole Legend hotel, DFS T Galleria, ..</p><p>    </p><p>     The system of restaurants, cafes, fast food stores such as Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido, .. are regular customers of ECMEC. We provide kitchen ventilation solutions, dining space air conditioning or complete electromechanical solutions.</p><p>    </p><p>     In the field of industrial buildings, warehouses, clean rooms, our team has implemented projects with very high technical and occupational safety standards such as First Solar, BBraun, Terumo, ..</p><p>    </p><p>     Partners, main contractors, consulting firms, suppliers, brands have collaborated on projects: Kingsmen, Alliance, Hoa Binh, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hainan, Creative, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..</p><p>    </p><p>     With the mission of giving customers the satisfaction above expectations, the ECMEC team always works with dedication and a sense of self-renewal to develop and prosper together.</p>',
      images: [
        { imageId: 1, url: '/assets/projects/hikari-binh-duong.png' },
        { imageId: 2, url: '/assets/projects/hikari-binh-duong-2.png' },
      ],
      status: 'in progress',
    },
  ],
  loading: 'idle',
} as projectState;

const projectSlice = createSlice({
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
        state.project = data.map((project) => ({
          ...project,
          status: project.status === 0 ? 'in progress' : 'completed',
        }));
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
export const {} = projectSlice.actions;

export default projectSlice.reducer;

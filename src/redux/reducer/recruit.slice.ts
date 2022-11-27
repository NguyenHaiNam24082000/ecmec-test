import { getRecruit } from '@apis/recruitApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface recruitInterface {
  id: number;
  roleVn: string; //title_vn
  roleEn: string;
  addressEn: string;
  addressVn: string;
  salary: number | null;
  contentVn: string; //description_vn
  contentEn: string;
  isShow?: boolean;
  priority?: number;
  createdTime?: string;
  createdUser?: string;
  modifiedTime?: string;
  modifiedUser?: string;
}

export const getRecruitApi = createAsyncThunk('recruit/get', () => {
  return getRecruit()
    .then((response) => response.data)
    .catch((error) => error.message);
});

interface recruitState {
  recruit: recruitInterface[] | [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  recruit: [
    {
      id: 1,
      roleVn: 'Quản lý dự án',
      roleEn: 'Quản lý dự án',
      addressVn: 'Hà Nội',
      addressEn: 'Hà Nội',
      salary: 20000000,
      priority: 1,
      isShow: true,
      contentVn:
        '<h2>Mô tả công việc</h2><p><br></p><p>- Xây dựng kế hoạch vận hành khối học thuật đảm bảo chất lượng đầu ra với từng học viên theo yêu cầu.</p><p>- Nâng cấp và phát triển các sản phẩm học thuật của trung tâm.</p><p>- Thiết kế các khóa học mới theo chỉ đạo và định hướng của BLĐ.</p><p>- Tổ chức, đào tạo và nâng cao nghiệp vụ của giáo viên nhằm đáp ứng yêu cầu công việc.</p><p>- Xây dựng kế hoạch vận hành nâng cao tỷ lệ tái tục của từng học viên.</p><p>- Đánh giá và kiểm soát chất lượng đào tạo, chất lượng dịch vụ đảm bảo đúng yêu cầu đầu ra theo chỉ đạo và định hướng của BLĐ.</p><p>- Đào tạo và Đánh giá năng lực và hiệu quả công việc trong quá trình thử việc và làm việc sau thử việc của giáo viên.</p><p>- Xây dựng văn bản, quy trình làm việc phòng Học thuật- Đào tạo.</p><p>- Có kế hoạch đào tạo nhân sự kế cận mới đi vào vận hành.</p><p>- Tham mưu, tư vấn cho BLĐ về các vấn đề liên quan đến học thuật (hợp đồng, chất lượng đào tạo..)</p><p><br></p><h2>Yêu cầu ứng viên</h2><p>- Trình độ thạc sĩ trở lên chuyên ngành quản trị kinh doanh, ngoại ngữ tiếng anh, sư phạm tiếng anh...</p><p>- Kinh nghiệm &gt; 2 năm vị trí Giám đốc đào tạo tại hệ thống đào tạo tiếng anh.</p><p>- Có chứng chỉ ngoại ngữ IELTS 7.0 hoặc TOEIC 900 trở lên.</p><p>- Chứng chỉ giảng dạy ngoại ngữ: TESOL, CELTA, DELTA, … (nếu tốt nghiệp Sư phạm tiếng Anh thì không cần)</p><p>- Có tầm nhìn phát triển đào tạo</p><p>- Phân tích &amp; xử lý vấn đề nhanh</p><p>- Khả năng lãnh đạo.</p><p>- Kỹ năng thuyết trình.</p><p>- Kỹ năng nói trước công chúng.</p><p>- Kỹ năng ngoại giao.</p><p>- Kỹ năng hoạch định, giải quyết vấn đề.</p><p>- Am hiểu thị trường giáo dục Việt nam và trên toàn thế giới.</p><p>- Thành thạo tin học văn phòng và các phần mềm phục vụ giảng dạy…</p><p>Quyền lợi</p><p><br></p><h2>Quyền lợi</h2><p>- Lương thưởng phù hợp theo năng lực.</p><p>- Được hưởng các chính sách phúc lợi cấp quản lý theo quy định của công ty ( Du lịch, thưởng lễ, tết, Bảo Hiểm sức khỏe, khám sức khỏe định kỳ...)</p><p>- Làm việc trong môi trường năng động, chuyên nghiệp có nhiều cơ hội thăng tiến.</p><p>- Cung cấp trang thiết bị đầy đủ để phục vụ công việc.Quyền lợi.</p><p><br></p><h2>Cách ứng tuyển</h2><p>Gửi CV qua abc@gmail.com</p>',
      contentEn:
        '<h2>Mô tả công việc</h2><p><br></p><p>- Xây dựng kế hoạch vận hành khối học thuật đảm bảo chất lượng đầu ra với từng học viên theo yêu cầu.</p><p>- Nâng cấp và phát triển các sản phẩm học thuật của trung tâm.</p><p>- Thiết kế các khóa học mới theo chỉ đạo và định hướng của BLĐ.</p><p>- Tổ chức, đào tạo và nâng cao nghiệp vụ của giáo viên nhằm đáp ứng yêu cầu công việc.</p><p>- Xây dựng kế hoạch vận hành nâng cao tỷ lệ tái tục của từng học viên.</p><p>- Đánh giá và kiểm soát chất lượng đào tạo, chất lượng dịch vụ đảm bảo đúng yêu cầu đầu ra theo chỉ đạo và định hướng của BLĐ.</p><p>- Đào tạo và Đánh giá năng lực và hiệu quả công việc trong quá trình thử việc và làm việc sau thử việc của giáo viên.</p><p>- Xây dựng văn bản, quy trình làm việc phòng Học thuật- Đào tạo.</p><p>- Có kế hoạch đào tạo nhân sự kế cận mới đi vào vận hành.</p><p>- Tham mưu, tư vấn cho BLĐ về các vấn đề liên quan đến học thuật (hợp đồng, chất lượng đào tạo..)</p><p><br></p><h2>Yêu cầu ứng viên</h2><p>- Trình độ thạc sĩ trở lên chuyên ngành quản trị kinh doanh, ngoại ngữ tiếng anh, sư phạm tiếng anh...</p><p>- Kinh nghiệm &gt; 2 năm vị trí Giám đốc đào tạo tại hệ thống đào tạo tiếng anh.</p><p>- Có chứng chỉ ngoại ngữ IELTS 7.0 hoặc TOEIC 900 trở lên.</p><p>- Chứng chỉ giảng dạy ngoại ngữ: TESOL, CELTA, DELTA, … (nếu tốt nghiệp Sư phạm tiếng Anh thì không cần)</p><p>- Có tầm nhìn phát triển đào tạo</p><p>- Phân tích &amp; xử lý vấn đề nhanh</p><p>- Khả năng lãnh đạo.</p><p>- Kỹ năng thuyết trình.</p><p>- Kỹ năng nói trước công chúng.</p><p>- Kỹ năng ngoại giao.</p><p>- Kỹ năng hoạch định, giải quyết vấn đề.</p><p>- Am hiểu thị trường giáo dục Việt nam và trên toàn thế giới.</p><p>- Thành thạo tin học văn phòng và các phần mềm phục vụ giảng dạy…</p><p>Quyền lợi</p><p><br></p><h2>Quyền lợi</h2><p>- Lương thưởng phù hợp theo năng lực.</p><p>- Được hưởng các chính sách phúc lợi cấp quản lý theo quy định của công ty ( Du lịch, thưởng lễ, tết, Bảo Hiểm sức khỏe, khám sức khỏe định kỳ...)</p><p>- Làm việc trong môi trường năng động, chuyên nghiệp có nhiều cơ hội thăng tiến.</p><p>- Cung cấp trang thiết bị đầy đủ để phục vụ công việc.Quyền lợi.</p><p><br></p><h2>Cách ứng tuyển</h2><p>Gửi CV qua abc@gmail.com</p>',
    },
    {
      id: 2,
      roleVn: 'Kỹ sư công trình',
      roleEn: 'Kỹ sư công trình',
      addressVn: 'TP.HCM',
      addressEn: 'TP.HCM',
      salary: 10000000,
      priority: 2,
      isShow: true,
      contentVn:
        '<h2>Mô tả công việc</h2><p><br></p><p>- Xây dựng kế hoạch vận hành khối học thuật đảm bảo chất lượng đầu ra với từng học viên theo yêu cầu.</p><p>- Nâng cấp và phát triển các sản phẩm học thuật của trung tâm.</p><p>- Thiết kế các khóa học mới theo chỉ đạo và định hướng của BLĐ.</p><p>- Tổ chức, đào tạo và nâng cao nghiệp vụ của giáo viên nhằm đáp ứng yêu cầu công việc.</p><p>- Xây dựng kế hoạch vận hành nâng cao tỷ lệ tái tục của từng học viên.</p><p>- Đánh giá và kiểm soát chất lượng đào tạo, chất lượng dịch vụ đảm bảo đúng yêu cầu đầu ra theo chỉ đạo và định hướng của BLĐ.</p><p>- Đào tạo và Đánh giá năng lực và hiệu quả công việc trong quá trình thử việc và làm việc sau thử việc của giáo viên.</p><p>- Xây dựng văn bản, quy trình làm việc phòng Học thuật- Đào tạo.</p><p>- Có kế hoạch đào tạo nhân sự kế cận mới đi vào vận hành.</p><p>- Tham mưu, tư vấn cho BLĐ về các vấn đề liên quan đến học thuật (hợp đồng, chất lượng đào tạo..)</p><p><br></p><h2>Yêu cầu ứng viên</h2><p>- Trình độ thạc sĩ trở lên chuyên ngành quản trị kinh doanh, ngoại ngữ tiếng anh, sư phạm tiếng anh...</p><p>- Kinh nghiệm &gt; 2 năm vị trí Giám đốc đào tạo tại hệ thống đào tạo tiếng anh.</p><p>- Có chứng chỉ ngoại ngữ IELTS 7.0 hoặc TOEIC 900 trở lên.</p><p>- Chứng chỉ giảng dạy ngoại ngữ: TESOL, CELTA, DELTA, … (nếu tốt nghiệp Sư phạm tiếng Anh thì không cần)</p><p>- Có tầm nhìn phát triển đào tạo</p><p>- Phân tích &amp; xử lý vấn đề nhanh</p><p>- Khả năng lãnh đạo.</p><p>- Kỹ năng thuyết trình.</p><p>- Kỹ năng nói trước công chúng.</p><p>- Kỹ năng ngoại giao.</p><p>- Kỹ năng hoạch định, giải quyết vấn đề.</p><p>- Am hiểu thị trường giáo dục Việt nam và trên toàn thế giới.</p><p>- Thành thạo tin học văn phòng và các phần mềm phục vụ giảng dạy…</p><p>Quyền lợi</p><p><br></p><h2>Quyền lợi</h2><p>- Lương thưởng phù hợp theo năng lực.</p><p>- Được hưởng các chính sách phúc lợi cấp quản lý theo quy định của công ty ( Du lịch, thưởng lễ, tết, Bảo Hiểm sức khỏe, khám sức khỏe định kỳ...)</p><p>- Làm việc trong môi trường năng động, chuyên nghiệp có nhiều cơ hội thăng tiến.</p><p>- Cung cấp trang thiết bị đầy đủ để phục vụ công việc.Quyền lợi.</p><p><br></p><h2>Cách ứng tuyển</h2><p>Gửi CV qua abc@gmail.com</p>',
      contentEn:
        '<h2>Mô tả công việc</h2><p><br></p><p>- Xây dựng kế hoạch vận hành khối học thuật đảm bảo chất lượng đầu ra với từng học viên theo yêu cầu.</p><p>- Nâng cấp và phát triển các sản phẩm học thuật của trung tâm.</p><p>- Thiết kế các khóa học mới theo chỉ đạo và định hướng của BLĐ.</p><p>- Tổ chức, đào tạo và nâng cao nghiệp vụ của giáo viên nhằm đáp ứng yêu cầu công việc.</p><p>- Xây dựng kế hoạch vận hành nâng cao tỷ lệ tái tục của từng học viên.</p><p>- Đánh giá và kiểm soát chất lượng đào tạo, chất lượng dịch vụ đảm bảo đúng yêu cầu đầu ra theo chỉ đạo và định hướng của BLĐ.</p><p>- Đào tạo và Đánh giá năng lực và hiệu quả công việc trong quá trình thử việc và làm việc sau thử việc của giáo viên.</p><p>- Xây dựng văn bản, quy trình làm việc phòng Học thuật- Đào tạo.</p><p>- Có kế hoạch đào tạo nhân sự kế cận mới đi vào vận hành.</p><p>- Tham mưu, tư vấn cho BLĐ về các vấn đề liên quan đến học thuật (hợp đồng, chất lượng đào tạo..)</p><p><br></p><h2>Yêu cầu ứng viên</h2><p>- Trình độ thạc sĩ trở lên chuyên ngành quản trị kinh doanh, ngoại ngữ tiếng anh, sư phạm tiếng anh...</p><p>- Kinh nghiệm &gt; 2 năm vị trí Giám đốc đào tạo tại hệ thống đào tạo tiếng anh.</p><p>- Có chứng chỉ ngoại ngữ IELTS 7.0 hoặc TOEIC 900 trở lên.</p><p>- Chứng chỉ giảng dạy ngoại ngữ: TESOL, CELTA, DELTA, … (nếu tốt nghiệp Sư phạm tiếng Anh thì không cần)</p><p>- Có tầm nhìn phát triển đào tạo</p><p>- Phân tích &amp; xử lý vấn đề nhanh</p><p>- Khả năng lãnh đạo.</p><p>- Kỹ năng thuyết trình.</p><p>- Kỹ năng nói trước công chúng.</p><p>- Kỹ năng ngoại giao.</p><p>- Kỹ năng hoạch định, giải quyết vấn đề.</p><p>- Am hiểu thị trường giáo dục Việt nam và trên toàn thế giới.</p><p>- Thành thạo tin học văn phòng và các phần mềm phục vụ giảng dạy…</p><p>Quyền lợi</p><p><br></p><h2>Quyền lợi</h2><p>- Lương thưởng phù hợp theo năng lực.</p><p>- Được hưởng các chính sách phúc lợi cấp quản lý theo quy định của công ty ( Du lịch, thưởng lễ, tết, Bảo Hiểm sức khỏe, khám sức khỏe định kỳ...)</p><p>- Làm việc trong môi trường năng động, chuyên nghiệp có nhiều cơ hội thăng tiến.</p><p>- Cung cấp trang thiết bị đầy đủ để phục vụ công việc.Quyền lợi.</p><p><br></p><h2>Cách ứng tuyển</h2><p>Gửi CV qua abc@gmail.com</p>',
    },
    {
      id: 3,
      roleVn: 'Kế toán',
      roleEn: 'Kế toán',
      addressVn: 'Hà Nội',
      addressEn: 'Hà Nội',
      salary: 10000000,
      priority: 3,
      isShow: true,
      contentVn:
        '<h2>Mô tả công việc</h2><p><br></p><p>- Xây dựng kế hoạch vận hành khối học thuật đảm bảo chất lượng đầu ra với từng học viên theo yêu cầu.</p><p>- Nâng cấp và phát triển các sản phẩm học thuật của trung tâm.</p><p>- Thiết kế các khóa học mới theo chỉ đạo và định hướng của BLĐ.</p><p>- Tổ chức, đào tạo và nâng cao nghiệp vụ của giáo viên nhằm đáp ứng yêu cầu công việc.</p><p>- Xây dựng kế hoạch vận hành nâng cao tỷ lệ tái tục của từng học viên.</p><p>- Đánh giá và kiểm soát chất lượng đào tạo, chất lượng dịch vụ đảm bảo đúng yêu cầu đầu ra theo chỉ đạo và định hướng của BLĐ.</p><p>- Đào tạo và Đánh giá năng lực và hiệu quả công việc trong quá trình thử việc và làm việc sau thử việc của giáo viên.</p><p>- Xây dựng văn bản, quy trình làm việc phòng Học thuật- Đào tạo.</p><p>- Có kế hoạch đào tạo nhân sự kế cận mới đi vào vận hành.</p><p>- Tham mưu, tư vấn cho BLĐ về các vấn đề liên quan đến học thuật (hợp đồng, chất lượng đào tạo..)</p><p><br></p><h2>Yêu cầu ứng viên</h2><p>- Trình độ thạc sĩ trở lên chuyên ngành quản trị kinh doanh, ngoại ngữ tiếng anh, sư phạm tiếng anh...</p><p>- Kinh nghiệm &gt; 2 năm vị trí Giám đốc đào tạo tại hệ thống đào tạo tiếng anh.</p><p>- Có chứng chỉ ngoại ngữ IELTS 7.0 hoặc TOEIC 900 trở lên.</p><p>- Chứng chỉ giảng dạy ngoại ngữ: TESOL, CELTA, DELTA, … (nếu tốt nghiệp Sư phạm tiếng Anh thì không cần)</p><p>- Có tầm nhìn phát triển đào tạo</p><p>- Phân tích &amp; xử lý vấn đề nhanh</p><p>- Khả năng lãnh đạo.</p><p>- Kỹ năng thuyết trình.</p><p>- Kỹ năng nói trước công chúng.</p><p>- Kỹ năng ngoại giao.</p><p>- Kỹ năng hoạch định, giải quyết vấn đề.</p><p>- Am hiểu thị trường giáo dục Việt nam và trên toàn thế giới.</p><p>- Thành thạo tin học văn phòng và các phần mềm phục vụ giảng dạy…</p><p>Quyền lợi</p><p><br></p><h2>Quyền lợi</h2><p>- Lương thưởng phù hợp theo năng lực.</p><p>- Được hưởng các chính sách phúc lợi cấp quản lý theo quy định của công ty ( Du lịch, thưởng lễ, tết, Bảo Hiểm sức khỏe, khám sức khỏe định kỳ...)</p><p>- Làm việc trong môi trường năng động, chuyên nghiệp có nhiều cơ hội thăng tiến.</p><p>- Cung cấp trang thiết bị đầy đủ để phục vụ công việc.Quyền lợi.</p><p><br></p><h2>Cách ứng tuyển</h2><p>Gửi CV qua abc@gmail.com</p>',
      contentEn:
        '<h2>Mô tả công việc</h2><p><br></p><p>- Xây dựng kế hoạch vận hành khối học thuật đảm bảo chất lượng đầu ra với từng học viên theo yêu cầu.</p><p>- Nâng cấp và phát triển các sản phẩm học thuật của trung tâm.</p><p>- Thiết kế các khóa học mới theo chỉ đạo và định hướng của BLĐ.</p><p>- Tổ chức, đào tạo và nâng cao nghiệp vụ của giáo viên nhằm đáp ứng yêu cầu công việc.</p><p>- Xây dựng kế hoạch vận hành nâng cao tỷ lệ tái tục của từng học viên.</p><p>- Đánh giá và kiểm soát chất lượng đào tạo, chất lượng dịch vụ đảm bảo đúng yêu cầu đầu ra theo chỉ đạo và định hướng của BLĐ.</p><p>- Đào tạo và Đánh giá năng lực và hiệu quả công việc trong quá trình thử việc và làm việc sau thử việc của giáo viên.</p><p>- Xây dựng văn bản, quy trình làm việc phòng Học thuật- Đào tạo.</p><p>- Có kế hoạch đào tạo nhân sự kế cận mới đi vào vận hành.</p><p>- Tham mưu, tư vấn cho BLĐ về các vấn đề liên quan đến học thuật (hợp đồng, chất lượng đào tạo..)</p><p><br></p><h2>Yêu cầu ứng viên</h2><p>- Trình độ thạc sĩ trở lên chuyên ngành quản trị kinh doanh, ngoại ngữ tiếng anh, sư phạm tiếng anh...</p><p>- Kinh nghiệm &gt; 2 năm vị trí Giám đốc đào tạo tại hệ thống đào tạo tiếng anh.</p><p>- Có chứng chỉ ngoại ngữ IELTS 7.0 hoặc TOEIC 900 trở lên.</p><p>- Chứng chỉ giảng dạy ngoại ngữ: TESOL, CELTA, DELTA, … (nếu tốt nghiệp Sư phạm tiếng Anh thì không cần)</p><p>- Có tầm nhìn phát triển đào tạo</p><p>- Phân tích &amp; xử lý vấn đề nhanh</p><p>- Khả năng lãnh đạo.</p><p>- Kỹ năng thuyết trình.</p><p>- Kỹ năng nói trước công chúng.</p><p>- Kỹ năng ngoại giao.</p><p>- Kỹ năng hoạch định, giải quyết vấn đề.</p><p>- Am hiểu thị trường giáo dục Việt nam và trên toàn thế giới.</p><p>- Thành thạo tin học văn phòng và các phần mềm phục vụ giảng dạy…</p><p>Quyền lợi</p><p><br></p><h2>Quyền lợi</h2><p>- Lương thưởng phù hợp theo năng lực.</p><p>- Được hưởng các chính sách phúc lợi cấp quản lý theo quy định của công ty ( Du lịch, thưởng lễ, tết, Bảo Hiểm sức khỏe, khám sức khỏe định kỳ...)</p><p>- Làm việc trong môi trường năng động, chuyên nghiệp có nhiều cơ hội thăng tiến.</p><p>- Cung cấp trang thiết bị đầy đủ để phục vụ công việc.Quyền lợi.</p><p><br></p><h2>Cách ứng tuyển</h2><p>Gửi CV qua abc@gmail.com</p>',
    },
    {
      id: 4,
      roleVn: 'Thực tập',
      roleEn: 'Thực tập',
      addressVn: 'Hà Nội',
      addressEn: 'Hà Nội',
      salary: null,
      priority: 4,
      isShow: true,
      contentVn:
        '<h2>Mô tả công việc</h2><p><br></p><p>- Xây dựng kế hoạch vận hành khối học thuật đảm bảo chất lượng đầu ra với từng học viên theo yêu cầu.</p><p>- Nâng cấp và phát triển các sản phẩm học thuật của trung tâm.</p><p>- Thiết kế các khóa học mới theo chỉ đạo và định hướng của BLĐ.</p><p>- Tổ chức, đào tạo và nâng cao nghiệp vụ của giáo viên nhằm đáp ứng yêu cầu công việc.</p><p>- Xây dựng kế hoạch vận hành nâng cao tỷ lệ tái tục của từng học viên.</p><p>- Đánh giá và kiểm soát chất lượng đào tạo, chất lượng dịch vụ đảm bảo đúng yêu cầu đầu ra theo chỉ đạo và định hướng của BLĐ.</p><p>- Đào tạo và Đánh giá năng lực và hiệu quả công việc trong quá trình thử việc và làm việc sau thử việc của giáo viên.</p><p>- Xây dựng văn bản, quy trình làm việc phòng Học thuật- Đào tạo.</p><p>- Có kế hoạch đào tạo nhân sự kế cận mới đi vào vận hành.</p><p>- Tham mưu, tư vấn cho BLĐ về các vấn đề liên quan đến học thuật (hợp đồng, chất lượng đào tạo..)</p><p><br></p><h2>Yêu cầu ứng viên</h2><p>- Trình độ thạc sĩ trở lên chuyên ngành quản trị kinh doanh, ngoại ngữ tiếng anh, sư phạm tiếng anh...</p><p>- Kinh nghiệm &gt; 2 năm vị trí Giám đốc đào tạo tại hệ thống đào tạo tiếng anh.</p><p>- Có chứng chỉ ngoại ngữ IELTS 7.0 hoặc TOEIC 900 trở lên.</p><p>- Chứng chỉ giảng dạy ngoại ngữ: TESOL, CELTA, DELTA, … (nếu tốt nghiệp Sư phạm tiếng Anh thì không cần)</p><p>- Có tầm nhìn phát triển đào tạo</p><p>- Phân tích &amp; xử lý vấn đề nhanh</p><p>- Khả năng lãnh đạo.</p><p>- Kỹ năng thuyết trình.</p><p>- Kỹ năng nói trước công chúng.</p><p>- Kỹ năng ngoại giao.</p><p>- Kỹ năng hoạch định, giải quyết vấn đề.</p><p>- Am hiểu thị trường giáo dục Việt nam và trên toàn thế giới.</p><p>- Thành thạo tin học văn phòng và các phần mềm phục vụ giảng dạy…</p><p>Quyền lợi</p><p><br></p><h2>Quyền lợi</h2><p>- Lương thưởng phù hợp theo năng lực.</p><p>- Được hưởng các chính sách phúc lợi cấp quản lý theo quy định của công ty ( Du lịch, thưởng lễ, tết, Bảo Hiểm sức khỏe, khám sức khỏe định kỳ...)</p><p>- Làm việc trong môi trường năng động, chuyên nghiệp có nhiều cơ hội thăng tiến.</p><p>- Cung cấp trang thiết bị đầy đủ để phục vụ công việc.Quyền lợi.</p><p><br></p><h2>Cách ứng tuyển</h2><p>Gửi CV qua abc@gmail.com</p>',
      contentEn:
        '<h2>Mô tả công việc</h2><p><br></p><p>- Xây dựng kế hoạch vận hành khối học thuật đảm bảo chất lượng đầu ra với từng học viên theo yêu cầu.</p><p>- Nâng cấp và phát triển các sản phẩm học thuật của trung tâm.</p><p>- Thiết kế các khóa học mới theo chỉ đạo và định hướng của BLĐ.</p><p>- Tổ chức, đào tạo và nâng cao nghiệp vụ của giáo viên nhằm đáp ứng yêu cầu công việc.</p><p>- Xây dựng kế hoạch vận hành nâng cao tỷ lệ tái tục của từng học viên.</p><p>- Đánh giá và kiểm soát chất lượng đào tạo, chất lượng dịch vụ đảm bảo đúng yêu cầu đầu ra theo chỉ đạo và định hướng của BLĐ.</p><p>- Đào tạo và Đánh giá năng lực và hiệu quả công việc trong quá trình thử việc và làm việc sau thử việc của giáo viên.</p><p>- Xây dựng văn bản, quy trình làm việc phòng Học thuật- Đào tạo.</p><p>- Có kế hoạch đào tạo nhân sự kế cận mới đi vào vận hành.</p><p>- Tham mưu, tư vấn cho BLĐ về các vấn đề liên quan đến học thuật (hợp đồng, chất lượng đào tạo..)</p><p><br></p><h2>Yêu cầu ứng viên</h2><p>- Trình độ thạc sĩ trở lên chuyên ngành quản trị kinh doanh, ngoại ngữ tiếng anh, sư phạm tiếng anh...</p><p>- Kinh nghiệm &gt; 2 năm vị trí Giám đốc đào tạo tại hệ thống đào tạo tiếng anh.</p><p>- Có chứng chỉ ngoại ngữ IELTS 7.0 hoặc TOEIC 900 trở lên.</p><p>- Chứng chỉ giảng dạy ngoại ngữ: TESOL, CELTA, DELTA, … (nếu tốt nghiệp Sư phạm tiếng Anh thì không cần)</p><p>- Có tầm nhìn phát triển đào tạo</p><p>- Phân tích &amp; xử lý vấn đề nhanh</p><p>- Khả năng lãnh đạo.</p><p>- Kỹ năng thuyết trình.</p><p>- Kỹ năng nói trước công chúng.</p><p>- Kỹ năng ngoại giao.</p><p>- Kỹ năng hoạch định, giải quyết vấn đề.</p><p>- Am hiểu thị trường giáo dục Việt nam và trên toàn thế giới.</p><p>- Thành thạo tin học văn phòng và các phần mềm phục vụ giảng dạy…</p><p>Quyền lợi</p><p><br></p><h2>Quyền lợi</h2><p>- Lương thưởng phù hợp theo năng lực.</p><p>- Được hưởng các chính sách phúc lợi cấp quản lý theo quy định của công ty ( Du lịch, thưởng lễ, tết, Bảo Hiểm sức khỏe, khám sức khỏe định kỳ...)</p><p>- Làm việc trong môi trường năng động, chuyên nghiệp có nhiều cơ hội thăng tiến.</p><p>- Cung cấp trang thiết bị đầy đủ để phục vụ công việc.Quyền lợi.</p><p><br></p><h2>Cách ứng tuyển</h2><p>Gửi CV qua abc@gmail.com</p>',
    },
  ],
  loading: 'idle',
} as recruitState;

const userSlice = createSlice({
  name: 'recruitment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecruitApi.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getRecruitApi.fulfilled, (state, action: PayloadAction<any>) => {
      const data = action.payload;
      if (Array.isArray(data)) {
        state.recruit = data;
        state.loading = 'succeeded';
      }
    });
    builder.addCase(getRecruitApi.rejected, (state, action: PayloadAction<any>) => {
      state.loading = 'failed';
      console.error('Get recruit failed!');
    });
  },
});

// export actions
export const {} = userSlice.actions;

export default userSlice.reducer;

import { getProjectDetail } from '@apis/projectApi';
import ProjectImg from '@assets/page-header/project.png';
import Helmet from '@components/Helmet/Helmet';
import Loader from '@components/Loader/Loader';
import PageHeader from '@components/PageHeader/PageHeader';
import { Carousel } from '@mantine/carousel';
import {
  Box, Flex, Image,
  ScrollArea,
  Table,
  Text,
  TypographyStylesProvider
} from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import i18next from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';
import { projectInterface } from 'redux/reducer/projects.slice';

const ProjectDetail = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { t } = useTranslation();
  // const data = {
  //   name: 'Hikari Bình Dương',
  //   scope: [
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //     'Thi công lắp đặt',
  //   ],
  //   area: '30000 m',
  //   time: '12 thang',
  //   owner: 'Abc',
  //   start: '12/2021',
  //   mainContractor: 'Ecmec',
  //   images: [
  //     '/assets/projects/hikari-binh-duong.png',
  //     '/assets/projects/hikari-binh-duong-2.png',
  //     '/assets/projects/hikari-binh-duong-2.png',
  //     '/assets/projects/hikari-binh-duong-2.png',
  //     '/assets/projects/hikari-binh-duong-2.png',
  //   ],
  //   content: `
  //   Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công nghiệp, nhà ở dịch vụ và dân sinh,..

  //   Chúng tôi đã tạo dựng niềm tin bởi thái độ cộng tác, chất lượng về giải pháp và thi công, đáp ứng thời gian thi công và giá thành để cùng đồng hành với nhiều khách hàng có danh tiếng hàng đầu trong từng lĩnh vực kinh doanh như CGV, Kingsmen, Starbucks, Pizza Hut, Redsun, Unicharm Diana, DK pharma, BigC,.. Các dự án thế mạnh tiêu biểu đội ngũ chúng tôi đã thực hiện:

  //   Chuỗi rạp chiếu phim CGV - tiền thân là Megastar, từ năm 2006 đến thời điểm này, chúng tôi đã thực hiện hơn 20 dự án cụm rạp trên toàn quốc. Mỗi dự án CGV đều được đầu tư đầy đủ các hệ thống kỹ thuật: điện động lực, điện dự phòng UPS, chiếu sáng, các hệ thống điện thấp áp như camera, thông báo công cộng, báo cháy, BMS, cửa từ, điều hòa không khí, hút khói, cấp thoát nước cho nhà vệ sinh, chữa cháy tự động sprinkler,..

  //   Chúng tôi đã cung cấp dịch vụ xây lắp cơ điện và bảo trì cho hầu hết các thương hiệu thời trang cao cấp như Louis Vuitton, Hermes, Dior, Chanel, Cartier, Botega, Saint Laurent, Prada,.. tại các trung tâm thương mại quận 1, quận Hoàn Kiếm, Siem Reap như Vincom Đồng Khởi, Union Square, khách sạn Rex, Tràng Tiền Plaza, khách sạn Sofitel Metropole Legend, DFS T Galleria,..

  //   Hệ thống các nhà hàng, café, cửa hàng thức ăn nhanh như Starbucks, Pizza Hut, King BBQ, Hotpot, King Deli, Hokkaido,.. là khách hàng thường xuyên của ECMEC. Chúng tôi cung cấp giải pháp thông gió nhà bếp, điều hòa không khí không gian ăn uống hoặc giải pháp trọn gói về cơ điện.

  //   Về lĩnh vực nhà công nghiệp, nhà kho, phòng sạch, đội ngũ chúng tôi đã thực hiện các dự án có tiêu chuẩn kỹ thuật và an toàn lao động rất cao như First Solar, BBraun, Terumo,..

  //   Những đối tác, nhà thầu chính, công ty tư vấn, nhà cung cấp, nhãn hiệu đã cùng cộng tác qua các dự án: Kingsmen, Alliance, Hòa Bình, M+W, Alstom Aurecon, Indochine, JRP, Architype, Artelia, Apave, Pure Projects, Atelier Schneider, Mitsubishi, Siemens, LS, Sunlight, Hải Nam, Sáng Tạo, Lutron, Helvar, Legrand, Gira, iGuzzini, Philips, Thorn, Cummins, Kohler, Honeywell, Delta Control, Tai Sin, Daikin, Carrier Toshiba, Panasonic, Trane, Hitachi, Salmson, Grundfos, Kruger, Fantech, Kone, Grohe, Kohler, Toto,..

  //   Với sứ mệnh đem đến cho khách hàng sự hài lòng trên mong đợi, đội ngũ ECMEC luôn làm việc tận tâm và ý thức làm mới chính mình để phát triển và cùng thịnh vượng.
  //   `,
  // };

  const { slug } = useParams();
  const [detail, setDetail] = useState<projectInterface | undefined>(undefined);
  const { project } = useAppSelector((state) => state.projects);
  const { service } = useAppSelector((state) => state.service);
  useEffect(() => {
    if (project.length > 0) {
      const result = project.find((detail) => detail.id.toString() === slug);
      setDetail(result);
    } else {
      slug && getProjectDetail(slug).then((detail: any) => setDetail(detail));
    }
  }, [project, slug]);
  if (detail) {
    return (
      <Helmet title={t('Project')}>
        <PageHeader image={ProjectImg}>{t('Project')}</PageHeader>
        <Link className="back__router" to="/projects">
          <div>
            <svg
              width="15"
              height="26"
              viewBox="0 0 15 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 10 }}
            >
              <path
                d="M13 24L2 13L13 2"
                stroke="#0072B8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>{t('Project')}</span>
          </div>
        </Link>
        <Flex
          sx={{
            background: '#0072B8',
            color: '#FFFFFF',
            height: 800,
            '@media (max-width:600px)': {
              height: 'fit-content',
            },
          }}
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 'sm', md: 80 }}
          mt={80}
        >
          <Box
            sx={{
              width: '60%',
              height: '100%',
              maxWidth: 'calc(60% - 40px)',
              '@media (max-width:600px)': {
                width: '100%',
                height: 335,
                maxWidth: '100%',
              },
            }}
          >
            <Image
              sx={{
                width: '100%',
                height: '100%',

                '& *': {
                  width: '100%',
                  height: '100%',
                },
              }}
              radius={0}
              width={'100%'}
              height={'100%'}
              src={detail?.images?.[0].url}
              alt="Random unsplash image"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: '100%',
              padding: '80px 40px 80px 0',
              maxWidth: 'calc(40% - 40px)',
              '@media (max-width:600px)': {
                padding: '15px',
                width: '100%',
                height: '100%',
                maxWidth: '100%',
              },
            }}
          >
            <Text
              sx={{
                fontSize: 46,
                fontWeight: 700,
                padding: '10px 30px',
                borderLeft: '10px solid #EDE51C',
                '@media (max-width: 1400px)': {
                  fontSize: 40,
                },
                '@media (max-width: 1024px)': {
                  marginTop: 0,
                  fontSize: 34,
                },
                '@media (max-width: 600px)': {
                  marginTop: 0,
                  fontSize: 48,
                },
              }}
            >
              {i18next.language === 'vi_VN' ? detail?.nameVn : detail?.nameEn}
            </Text>
            <ScrollArea
              offsetScrollbars
              scrollHideDelay={0}
              sx={{
                marginTop: 40,
                overflowY: 'auto',
                width: '100%',
              }}
            >
              <Table
                sx={{
                  color: '#FFFFFF',

                  '& tbody tr td': {
                    padding: '20px 0',
                    borderBottom: 'none',
                    wordWrap: 'break-word',

                    '&:first-of-type': {
                      fontWeight: 700,
                      width: 160,
                    },
                  },
                }}
              >
                <tbody>
                  {(detail?.nameVn || detail?.nameEn) && (
                    <tr>
                      <td>{t('ProjectName')}:</td>
                      <td>{i18next.language === 'vi_VN' ? detail?.nameVn : detail?.nameEn}</td>
                    </tr>
                  )}
                  {!!detail?.service?.length && (
                    <tr>
                      <td>{t('ScopeOfConstruction')}:</td>
                      <td>
                        {service
                          .filter((item) => detail.service.includes(item.id))
                          ?.map((item) =>
                            i18next.language === 'vi_VN' ? item.nameVn : item.nameEn,
                          )
                          ?.join(', ')}
                      </td>
                    </tr>
                  )}
                  {detail?.area && (
                    <tr>
                      <td>{t('Area')}:</td>
                      <td>{detail?.area}</td>
                    </tr>
                  )}
                  {(detail?.timeVn || detail?.timeEn) && (
                    <tr>
                      <td>{t('Start')}:</td>
                      <td>{i18next.language === 'vi_VN' ? detail?.timeVn : detail.timeEn}</td>
                    </tr>
                  )}
                  {detail?.mainContractor && (
                    <tr>
                      <td>{t('MainContractor')}:</td>
                      <td>{detail?.mainContractor}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </ScrollArea>
          </Box>
        </Flex>
        <Box
          className="main wrap"
          style={{
            marginTop: 80,
          }}
          sx={{
            '@media (max-width:600px)': {
              paddingLeft: '0!important',
              paddingRight: '0!important',
            },
          }}
        >
          <div>
            {!!detail?.images?.slice(1)?.length && (
              <Carousel
                sx={{ width: '100%' }}
                styles={{
                  indicators: {
                    bottom: -40,
                  },
                  indicator: {
                    width: 6,
                    height: 6,
                    opacity: 1,
                    zIndex: 100,
                    background: '#B3B3B3',

                    '&[data-active]': {
                      background: '#0072B8',
                    },
                  },
                }}
                mx="auto"
                withIndicators
                height={932}
                withControls={false}
                loop
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
              >
                {detail?.images.slice(1).map((item, index) => (
                  <Carousel.Slide key={index}>
                    <Image
                      sx={{
                        width: '100%',
                        height: '100%',

                        '& *': {
                          width: '100%',
                          height: '100% !important',
                        },
                      }}
                      radius={0}
                      width={'100%'}
                      src={detail?.images?.[0].url}
                      alt="Random unsplash image"
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            )}
          </div>
        </Box>
        <div className="main wrap">
          <TypographyStylesProvider mb={80} mt={126}>
            <div
              className="d-content"
              dangerouslySetInnerHTML={{
                __html: i18next.language === 'vi_VN' ? detail?.contentVn : detail?.contentEn,
              }}
            />
          </TypographyStylesProvider>
        </div>

        <Link className="back__router back__router--mobile" to="/projects">
          <div>
            <svg
              width="15"
              height="26"
              viewBox="0 0 15 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 10 }}
            >
              <path
                d="M13 24L2 13L13 2"
                stroke="#0072B8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>{t('Project')}</span>
          </div>
        </Link>
      </Helmet>
    );
  } else {
    return <Loader />;
  }
};

export default ProjectDetail;

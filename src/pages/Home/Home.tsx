import About from '@assets/images/about.png';
import Background from '@assets/images/background.png';
import group from '@assets/images/group.svg';
import serviceBackground from '@assets/images/service.png';
import Banner from '@components/Banner/Banner';
import Button from '@components/Button/Button';
import Helmet from '@components/Helmet/Helmet';
import ProjectCard from '@components/ProjectCard/ProjectCard';
import ServiceCard from '@components/ServiceCard/ServiceCard';
import configs from '@constants/configs';
import { Carousel } from '@mantine/carousel';
import {
  BackgroundImage,
  Box,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  TypographyStylesProvider,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import i18next from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getPartnerApi } from 'redux/reducer/partner.slice';

const Home = () => {
  const matches = useMediaQuery('(max-width: 600px)');
  const history = useNavigate();
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const { t } = useTranslation();
  const about = useAppSelector((state) => state.about.about);
  const service = useAppSelector((state) => state.service.service);
  const projects = useAppSelector((state) => state.projects.project);
  const partners = useAppSelector((state) => state.partner.partner);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPartnerApi());
  }, []);
  return (
    <Helmet title={t('Home')}>
      <Banner />
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: 602, cols: 1 }]}
        sx={{
          width: '100%',
          minHeight: 1080,
          background: '#0072B8',
          '@media (max-width: 1400px)': {
            minHeight: 880,
          },
          '@media (max-width: 1024px)': {
            minHeight: 720,
          },
        }}
        className="main__container wrap main"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 40,
          }}
        >
          <span className="title__underline color-white">{t('aboutUs')}</span>
          <Text
            className="color-white"
            sx={{
              fontSize: 32,
              fontWeight: 500,
              '@media (max-width: 600px)': {
                fontSize: 24,
              },
            }}
          >
            {t('introduced')}
          </Text>
          <Text
            size={24}
            lineClamp={9}
            style={{
              font: 'Helvetica Neue',
              fontWeight: 300,
              lineHeight: '40px',
            }}
            sx={{
              '@media (max-width: 600px)': {
                WebkitLineClamp: '12' as any,
              },
            }}
            className="color-white"
          >
            {about[0]?.contentVn ? (
              <TypographyStylesProvider>
                <div
                  className="d-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      i18next.language === 'vi_VN' ? about[0]?.contentVn : about[0]?.contentEn,
                  }}
                />
              </TypographyStylesProvider>
            ) : (
              `Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn
                        một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự
                        án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm
                        dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ
                        thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự
                        án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công
                        nghiệp, nhà ở dịch vụ và dân sinh,...`
            )}
          </Text>
          <Button
            sx={{
              '@media (max-width: 600px)': {
                width: '100%',
              },
            }}
            onClick={() => {
              history('/about');
            }}
          >
            {t('more')}
          </Button>
        </div>
        <Box
          sx={{
            position: 'relative',
            '@media (max-width: 600px)': {
              display: 'none',
            },
          }}
        >
          <Image
            withPlaceholder
            src={About}
            radius={20}
            maw={588}
            mah={737}
            sx={{
              position: 'absolute',
              zIndex: 2,
              '@media (max-width: 1400px)': {
                width: '85% !important',
                top: '50%',
                transform: 'translateY(-50%)',
              },
              '@media (max-width: 1024px)': {
                width: '85% !important',
                top: '50%',
                transform: 'translateY(-50%)',
              },
            }}
          />
          <Image
            withPlaceholder
            src={group}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 1,
              '@media (max-width: 1400px)': {
                width: '60% !important',
                top: '55%',
                transform: 'translateY(-50%)',
              },
              '@media (max-width: 1024px)': {
                width: '60% !important',
                top: '55%',
                transform: 'translateY(-50%)',
              },
            }}
            maw={446}
            mah={1000}
          />
          <Image
            withPlaceholder
            src={group}
            sx={{
              display: 'none',
              '@media (max-width: 1024px)': {
                height: 'fit-content',
                width: '80% !important',
              },
            }}
            maw={446}
            mah={1000}
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: 600, cols: 1 }]}
        className="main__container wrap main"
        sx={{
          width: '100%',
          //   minHeight: '100vh',
          background: `linear-gradient(180deg, #0072B8 0%, rgba(0, 114, 184, 0) 53.12%, rgba(0, 114, 184, 0.27) 80.21%, #0072B8 100%), linear-gradient(0deg, rgba(0, 114, 184, 0.27), rgba(0, 114, 184, 0.27)), url(${Background})`,
          backgroundSize: 'cover',
        }}
      >
        <Box
          sx={{
            height: 'auto',
            borderRadius: 20,
          }}
        >
          <BackgroundImage
            pos="relative"
            src={serviceBackground}
            mih={920}
            sx={{
              height: '100%',
              borderRadius: 'inherit',
              padding: '92px 50px',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              '@media (max-width: 1400px)': {
                padding: '60px 40px',
              },
              '@media (max-width: 1024px)': {
                padding: '60px 40px',
              },
              '@media (max-width: 600px)': {
                minHeight: 'max-content !important',
              },
            }}
          >
            <span className="title__underline color-white">{t('ourServices')}</span>
            <Text
              size={24}
              lineClamp={10}
              style={{
                font: 'Helvetica Neue',
                fontWeight: 300,
              }}
              sx={{
                lineHeight: '40px',
                '@media (max-width: 1400px)': {
                  fontSize: 18,
                },
                '@media (max-width: 1024px)': {
                  fontSize: 14,
                },
              }}
              className="color-white"
            >
              {about[0]?.contentVn ? (
                <TypographyStylesProvider>
                  <div
                    className="d-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        i18next.language === 'vi_VN' ? about[0]?.contentVn : about[0]?.contentEn,
                    }}
                  />
                </TypographyStylesProvider>
              ) : (
                `Được thành lập bởi đội ngũ nhiều tâm huyết với nghề nghiệp đã cùng cộng tác với nhau hơn
                        một thập kỷ từ công ty tiền thân, kế thừa kinh nghiệm thi công đa dạng các loại hình dự
                        án về quy mô, lĩnh vực và vùng miền địa lý cộng với năng lực tài chính ổn định, sản phẩm
                        dịch vụ của ECMEC hiện nay vẫn tập trung vào thế mạnh là cung cấp giải pháp dịch vụ kỹ
                        thuật cơ điện trọn gói (thi công xây lắp các hệ thống cơ điện công trình) thuộc các dự
                        án khu thương mại, rạp chiếu phim, cửa hàng thời trang cao cấp, nhà hàng, café, nhà công
                        nghiệp, nhà ở dịch vụ và dân sinh,...`
              )}
            </Text>
            <Button
              pos="absolute"
              bottom={81}
              sx={{
                '@media (max-width: 600px)': {
                  position: 'initial',
                  bottom: 0,
                },
              }}
            >
              <Link to="/service">{t('more')}</Link>
            </Button>
          </BackgroundImage>
        </Box>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 600, cols: 1 }]}>
          {!!service?.length &&
            service.slice(0, 6).map((item) => (
              <Link to={`/service/${item.id}`} key={item.id} className="service__item">
                <ServiceCard
                  sx={{
                    '@media (max-width: 1400px)': {
                      height: 250,
                      borderRadius: 20,
                    },
                    '@media (max-width: 1024px)': {
                      height: 220,
                      borderRadius: 20,
                    },
                    '@media (max-width: 600px)': {
                      height: 'fit-content',
                      borderRadius: 20,
                    },
                  }}
                  image={
                    item.images[0]?.url ? configs.BASE_IMAGE_URL + item.images[0]?.url : undefined
                  }
                  height={293}
                  name={i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                  withOverlay={true}
                />
              </Link>
            ))}
        </SimpleGrid>
      </SimpleGrid>
      <Box
        className="main__container wrap main"
        sx={{
          width: '100%',
          //   minHeight: '100vh',
          background: '#0072B8',
        }}
      >
        <span className="title__underline color-white">{t('projects')}</span>
        <Stack>
          {matches ? (
            !!projects?.length && (
              <Carousel
                styles={{
                  root: {
                    marginRight: '0px !important',
                    marginLeft: '0px !important',
                    marginBottom: 45,
                  },
                  indicators: {
                    bottom: -20,
                  },
                  indicator: {
                    width: 6,
                    height: 6,
                    opacity: 1,
                    zIndex: 100,

                    '&[data-active]': {
                      background: '#EDE51C',
                    },
                  },
                }}
                mx="auto"
                loop
                withControls={false}
                withIndicators
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
              >
                {projects
                  .filter((project) => project.isShow)
                  .map((project) => (
                    <Carousel.Slide key={project.id}>
                      <ProjectCard
                        image={
                          project.images[0]?.url
                            ? configs.BASE_IMAGE_URL + project.images[0]?.url
                            : undefined
                        }
                        name={i18next.language === 'vi_VN' ? project.nameVn : project.nameEn}
                        address={
                          i18next.language === 'vi_VN' ? project.addressVn : project.addressEn
                        }
                        status={project.status}
                      />
                    </Carousel.Slide>
                  ))}
              </Carousel>
            )
          ) : (
            <>
              <ProjectCard
                image={
                  selectedProject.images[0]?.url
                    ? configs.BASE_IMAGE_URL + selectedProject.images[0].url
                    : undefined
                }
                name={
                  i18next.language === 'vi_VN' ? selectedProject.nameVn : selectedProject.nameEn
                }
                address={
                  i18next.language === 'vi_VN'
                    ? selectedProject.addressVn
                    : selectedProject.addressEn
                }
                status={selectedProject.status}
              />
              <Group grow>
                {!!projects?.length &&
                  projects
                    .slice(0, 4)
                    .filter((item) => item.isShow)
                    .map((project) => (
                      <Image
                        withPlaceholder
                        key={project.id}
                        src={
                          project.images[0]?.url
                            ? configs.BASE_IMAGE_URL + project.images[0]?.url
                            : undefined
                        }
                        radius={20}
                        height={137}
                        sx={{
                          '@media (max-width: 1024px)': {
                            borderRadius: '10px !important',
                            img: { height: '100px !important', borderRadius: 10 },
                          },
                        }}
                        style={{
                          border: `${
                            selectedProject.id === project.id ? '3' : '0'
                          }px solid #EDE51C`,
                          borderRadius: 20,
                        }}
                        onClick={() => {
                          setSelectedProject({ ...project });
                        }}
                      />
                    ))}
              </Group>
            </>
          )}
        </Stack>
      </Box>
      <Box
        className="main__container wrap main"
        sx={{
          width: '100%',
          //   minHeight: '100vh',
          background: '#EDEDED',
          textAlign: 'center',
        }}
      >
        <span className="title__underline color-blue">{t('partners')}</span>
        <Carousel
          withIndicators
          slideGap="md"
          loop
          align="start"
          slidesToScroll={2}
          withControls={false}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          sx={{
            height: 200,
            '@media (max-width: 600px)': {
              height: 100,
            },
          }}
          styles={{
            slide: {
              flex: '0 0 25%',
              '@media (max-width: 1200px)': {
                flex: '0 0 33.33%',
              },
              '@media (max-width: 1024px)': {
                flex: '0 0 33.33%',
              },
              '@media (max-width: 600px)': {
                flex: '0 0 50%',
              },
            },
            indicators: {
              bottom: -10,
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
        >
          {partners.map((item, index) => (
            <Carousel.Slide key={index}>
              <Flex
                sx={{
                  width: '100%',
                  height: 192,
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 130, 216, 0.5)',
                  borderRadius: 20,
                  padding: 40,
                  textAlign: 'center',
                  '@media (max-width: 1400px)': {
                    height: 172,
                  },
                  '@media (max-width: 600px)': {
                    height: 95,
                    borderRadius: 10,
                    padding: 24,
                  },
                }}
                justify="center"
              >
                <Image
                  withPlaceholder
                  src={
                    item.image.length > 0
                      ? item.image[0].url
                        ? configs.BASE_IMAGE_URL + item.image[0].url
                        : null
                      : null
                  }
                  sx={{
                    '@media (max-width: 1400px)': {
                      img: { height: '92px !important' },
                    },
                    '@media (max-width: 600px)': {
                      img: { height: '47px !important' },
                    },
                  }}
                  height={112}
                  width="auto"
                  title={i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                  alt={i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                />
              </Flex>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Helmet>
  );
};

export default Home;

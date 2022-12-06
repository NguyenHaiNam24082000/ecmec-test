import { getProjectDetail } from '@apis/projectApi';
import ProjectImg from '@assets/page-header/project.png';
import Helmet from '@components/Helmet/Helmet';
import Loader from '@components/Loader/Loader';
import PageHeader from '@components/PageHeader/PageHeader';
import { Carousel } from '@mantine/carousel';
import { Box, Flex, Image, ScrollArea, Table, Text, TypographyStylesProvider } from '@mantine/core';
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
  const { slug } = useParams();
  const [detail, setDetail] = useState<projectInterface | undefined>(undefined);
  const { project } = useAppSelector((state) => state.projects);
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
              src={detail?.images?.[0]?.url}
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
                  {!!detail?.services?.length && (
                    <tr>
                      <td>{t('ScopeOfConstruction')}:</td>
                      <td>
                        {detail.services.map((item) =>
                          i18next.language === 'vi_VN' ? item.nameVn : item.nameEn,
                        ).join('; ')}
                      </td>
                    </tr>
                  )}
                  {detail?.area && (
                    <tr>
                      <td>{t('Area')}:</td>
                      <td>{detail?.area} m</td>
                    </tr>
                  )}
                  {detail?.duration && (
                    <tr>
                      <td>{t('Start')}:</td>
                      <td>
                        {i18next.language === 'vi_VN'
                          ? `${detail?.duration} tháng`
                          : `${detail.duration} months`}
                      </td>
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
                {detail?.images.map((item, index) => (
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
                      src={item.url}
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

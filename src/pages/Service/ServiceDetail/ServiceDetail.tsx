import { getServiceDetail } from '@apis/serviceApi';
import ServiceImg from '@assets/page-header/service.png';
import Helmet from '@components/Helmet/Helmet';
import Loader from '@components/Loader/Loader';
import PageHeader from '@components/PageHeader/PageHeader';
import ProjectItem from '@components/ProjectItem/ProjectItem';
import configs from '@constants/configs';
import { Image, Text, Title, TypographyStylesProvider } from '@mantine/core';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';
import { serviceInterface } from 'redux/reducer/service.slice';

const ServiceDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [detail, setDetail] = useState<serviceInterface | undefined>(undefined);
  const { service } = useAppSelector((state) => state.service);
  const { project } = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (service.length > 0) {
      const result = service.find((detail) => detail.id.toString() === slug);
      setDetail(result);
    } else {
      slug && getServiceDetail(slug).then((detail: any) => setDetail(detail));
    }
  }, [service, slug]);
  if (detail) {
    return (
      <Helmet title={t('Service')}>
        <PageHeader image={ServiceImg}>{t('Service')}</PageHeader>
        <Link className="back__router" to="/Service">
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

            <span>{t('Service')}</span>
          </div>
        </Link>
        <div className="detail main wrap">
          <Title
            sx={{
              font: 'Helvetica Neue',
              '@media (max-width: 1400px)': {
                fontSize: 60,
              },
              '@media (max-width: 1024px)': {
                marginTop: 0,
                fontSize: 50,
              },
              '@media (max-width: 600px)': {
                marginTop: 0,
                fontSize: 32,
              },
            }}
            mt={98}
            size={64}
            fw={700}
            mb={34}
            order={1}
          >
            {i18next.language === 'vi_VN' ? detail.nameVn : detail.nameEn}
          </Title>
        </div>
        <Image
          radius={0}
          mb={40}
          sx={{
            padding: '0px 240px',
            '@media (max-width: 1400px)': {
              padding: '40px 130px',
              img: { height: '600px !important' },
            },
            '@media (max-width: 1024px)': {
              padding: '40px 120px',
              img: { height: '500px !important' },
            },
            '@media (max-width: 600px)': {
              padding: '0px',
              img: { height: '320px !important' },
            },
          }}
          height={800}
          src={configs.BASE_IMAGE_URL + (detail.images[1]?.url ?? detail.images[0]?.url)}
        />
        <div className="detail main wrap">
          <TypographyStylesProvider>
            <div
              className="d-content"
              dangerouslySetInnerHTML={{
                __html: i18next.language === 'vi_VN' ? detail.contentVn : detail.contentEn,
              }}
            />
          </TypographyStylesProvider>

          <Text
            size={40}
            sx={{
              '@media (max-width: 1400px)': {
                fontSize: 35,
              },
              '@media (max-width: 600px)': {
                fontSize: 35,
              },
            }}
            fw={700}
            mb={34}
          >
            {t('ProjectUse')}
          </Text>
          {!!project.length &&
            project
              .filter((project) => project.isShow)
              .filter((prj) => prj.services.map((it) => it.id).includes(detail.id))
              .map((item, index) => (
                <ProjectItem
                  key={index}
                  image={
                    item.images[0]?.url ? configs.BASE_IMAGE_URL + item.images[0].url : undefined
                  }
                  name={i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                  address={i18next.language === 'vi_VN' ? item.addressVn : item.addressEn}
                  path={item.id.toString()}
                />
              ))}
        </div>

        <Link className="back__router back__router--mobile" to="/Service">
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

            <span>{t('Service')}</span>
          </div>
        </Link>
      </Helmet>
    );
  } else {
    return <Loader />;
  }
};

export default ServiceDetail;

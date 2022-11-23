import ServiceImg from '@assets/page-header/service.png';
import Helmet from '@components/Helmet/Helmet';
import Loader from '@components/Loader/Loader';
import PageHeader from '@components/PageHeader/PageHeader';
import ProjectItem from '@components/ProjectItem/ProjectItem';
import { Image, Text, Title, TypographyStylesProvider } from '@mantine/core';
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
      const result = service.find((detail) => detail.path === slug);
      setDetail(result);
    } else {
      // TODO: call api
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
            }}
            mt={98}
            size={64}
            fw={700}
            mb={34}
            order={1}
          >
            {detail.name}
          </Title>
          <Image
            radius={0}
            mb={40}
            sx={{
              '@media (max-width: 1400px)': {
                img: { height: '600px !important' },
              },
              '@media (max-width: 1024px)': {
                img: { height: '500px !important' },
              },
            }}
            height={800}
            src={detail.image}
          />
          <TypographyStylesProvider>
            <div className="d-content" dangerouslySetInnerHTML={{ __html: detail.content }} />
          </TypographyStylesProvider>

          <Text
            size={40}
            sx={{
              '@media (max-width: 1400px)': {
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
              .filter((prj) => prj.service.includes(detail.id))
              .map((item, index) => (
                <ProjectItem
                  key={index}
                  image={item.image[0]}
                  name={item.name}
                  address={item.address}
                  path={item.path}
                />
              ))}
        </div>
      </Helmet>
    );
  } else {
    return <Loader />;
  }
};

export default ServiceDetail;

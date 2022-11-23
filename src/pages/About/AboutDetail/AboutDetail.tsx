import AboutImg from '@assets/page-header/about.png';
import Helmet from '@components/Helmet/Helmet';
import Loader from '@components/Loader/Loader';
import PageHeader from '@components/PageHeader/PageHeader';
import { Image, Title, TypographyStylesProvider } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';
import { aboutInterface } from 'redux/reducer/about.slice';

const AboutDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [detail, setDetail] = useState<aboutInterface | undefined>(undefined);
  const { about } = useAppSelector((state) => state.about);
  useEffect(() => {
    if (about.length > 0) {
      const result = about.find((detail) => detail.id === Number(slug));
      setDetail(result);
    } else {
      // TODO: call api
    }
  }, [about, slug]);
  if (detail) {
    return (
      <Helmet title={t('About')}>
        <PageHeader image={AboutImg}>{t('About')}</PageHeader>
        <Link className="back__router" to="/about">
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

          <span>{t('About')}</span>
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
            sx={{
              '@media (max-width: 1400px)': {
                img: { height: '600px !important' },
              },
              '@media (max-width: 1024px)': {
                img: { height: '500px !important' },
              },
            }}
            height={800}
            mb={40}
            src={detail.image}
          />
          <TypographyStylesProvider>
            <div className="d-content" dangerouslySetInnerHTML={{ __html: detail.content }} />
          </TypographyStylesProvider>
        </div>
      </Helmet>
    );
  } else {
    return <Loader />;
  }
};

export default AboutDetail;

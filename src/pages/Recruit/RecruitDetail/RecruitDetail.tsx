import { getRecruitDetail } from '@apis/recruitApi';
import RecruitImage from '@assets/page-header/recruit.png';
import Helmet from '@components/Helmet/Helmet';
import PageHeader from '@components/PageHeader/PageHeader';
import { Loader, Title, TypographyStylesProvider } from '@mantine/core';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';
import { recruitInterface } from 'redux/reducer/recruit.slice';

const RecruitDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [detail, setDetail] = useState<recruitInterface | undefined>(undefined);
  const { recruit } = useAppSelector((state) => state.recruit);
  useEffect(() => {
    if (recruit.length > 0) {
      const result = recruit.find((detail) => detail.id.toString() === slug);
      setDetail(result);
    } else {
      slug && getRecruitDetail(slug).then((detail: any) => setDetail(detail));
    }
  }, [recruit, slug]);
  if (detail) {
    return (
      <Helmet title={t('Recruit')}>
        <PageHeader image={RecruitImage}>{t('Recruit')}</PageHeader>
        <Link className="back__router" to="/recruitment">
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
          {t('Recruit')}
        </Link>
        <div className="detail main wrap">
          <Title
            sx={{
              font: 'Helvetica Neue',
              '@media (max-width: 1400px)': {
                fontSize: 60,
              },
              '@media (max-width: 1024px)': {
                marginTop: 30,
                fontSize: 50,
              },
            }}
            mt={98}
            size={64}
            fw={700}
            mb={30}
            order={1}
          >
            {i18next.language === 'vi_VN' ? detail.roleVn : detail.roleEn}
          </Title>
          <TypographyStylesProvider mb={80}>
            <div
              className="d-content"
              dangerouslySetInnerHTML={{
                __html: i18next.language === 'vi_VN' ? detail.contentVn : detail.contentEn,
              }}
            />
          </TypographyStylesProvider>
        </div>
        <Link className="back__router back__router--mobile" to="/recruitment">
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
          {t('Recruit')}
        </Link>
      </Helmet>
    );
  } else {
    return <Loader />;
  }
};

export default RecruitDetail;

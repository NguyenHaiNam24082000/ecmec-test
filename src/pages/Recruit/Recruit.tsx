import arrowRight from '@assets/icons/arrow-right.svg';
import RecruitImage from '@assets/page-header/recruit.png';
import Helmet from '@components/Helmet/Helmet';
import PageHeader from '@components/PageHeader/PageHeader';
import RecruitCard from '@components/RecruitCard/RecruitCard';
import { SimpleGrid } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';

const Recruit = () => {
  const { t } = useTranslation();
  const { recruit } = useAppSelector((state) => state.recruit);

  return (
    <Helmet title={t('Recruit')}>
      <PageHeader image={RecruitImage}>{t('Recruit')}</PageHeader>
      <SimpleGrid
        className="about-page main wrap"
        cols={3}
        breakpoints={[
          { maxWidth: 1401, cols: 3, spacing: 20 },
          { maxWidth: 1025, cols: 2 },
          { maxWidth: 601, cols: 1 },
        ]}
        spacing={20}
        verticalSpacing={20}
        mb={100}
      >
        {recruit.map((item) => (
          <RecruitCard
            key={item.id}
            role={item.role}
            address={item.address}
            salary={item.salary}
            path={item.path}
          />
        ))}
      </SimpleGrid>
      <div className="breadcrumbs wrap">
        <NavLink to="/" className="breadcrumb__item">
          {t('Home')}
        </NavLink>{' '}
        <img src={arrowRight} alt="arrow right icon" />
        <NavLink to="" className="breadcrumb__item active">
          {t('Recruit')}
        </NavLink>
      </div>
    </Helmet>
  );
};

export default Recruit;

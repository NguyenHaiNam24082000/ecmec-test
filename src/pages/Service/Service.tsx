import ServiceImg from '@assets/page-header/service.png';
import Helmet from '@components/Helmet/Helmet';
import PageHeader from '@components/PageHeader/PageHeader';
import ServiceCard from '@components/ServiceCard/ServiceCard';
import { SimpleGrid } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';
import arrowRight from '@assets/icons/arrow-right.svg';

const Service = () => {
  const { t } = useTranslation();
  const service = useAppSelector((state) => state.service.service);

  return (
    <Helmet title={t('Service')}>
      <PageHeader image={ServiceImg}>{t('Service')}</PageHeader>
      <SimpleGrid
        className="service-page main wrap"
        sx={{
          '@media (max-width: 600px)': {
            display: 'none',
          },
        }}
        cols={3}
        breakpoints={[
          { maxWidth: 1400, cols: 3 },
          { maxWidth: 1024, cols: 2 },
          { maxWidth: 600, cols: 1 },
        ]}
        spacing={20}
        verticalSpacing={20}
      >
        {!!service?.length &&
          service
            .filter((item) => item.isShow)
            .map((item) => (
              <Link to={item.id.toString()} key={item.id} className="service__item">
                <ServiceCard
                  image={item.image[0].url || undefined}
                  name={item.nameVn}
                  withOverlay={false}
                />
              </Link>
            ))}
      </SimpleGrid>
      <SimpleGrid
        className="service-page--mobile main wrap"
        cols={3}
        sx={{
          display: 'none',
          '@media (max-width: 600px)': {
            display: 'grid',
          },
        }}
        breakpoints={[
          { maxWidth: 1400, cols: 3 },
          { maxWidth: 1024, cols: 2 },
          { maxWidth: 600, cols: 1 },
        ]}
        spacing={20}
        verticalSpacing={20}
      >
        {!!service?.length &&
          service
            .filter((item) => item.isShow)
            .map((item) => (
              <Link to={item.id.toString()} key={item.id} className="service__item">
                <ServiceCard image={item.image[0].url || undefined} name={item.nameVn} withOverlay={true} />
              </Link>
            ))}
      </SimpleGrid>
      <div className="breadcrumbs wrap">
        <NavLink to="/" className="breadcrumb__item">
          {t('Home')}
        </NavLink>{' '}
        <img src={arrowRight} alt="arrow right icon" />
        <NavLink to="" className="breadcrumb__item active">
          {t('Service')}
        </NavLink>
      </div>
    </Helmet>
  );
};

export default Service;

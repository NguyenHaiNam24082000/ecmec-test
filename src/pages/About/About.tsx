import arrowRight from '@assets/icons/arrow-right.svg';
import AboutImg from '@assets/page-header/about.png';
import Helmet from '@components/Helmet/Helmet';
import PageHeader from '@components/PageHeader/PageHeader';
import ServiceCard from '@components/ServiceCard/ServiceCard';
import { SimpleGrid } from '@mantine/core';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';

const About = () => {
  const { t } = useTranslation();
  const about = useAppSelector((state) => state.about.about);
  return (
    <Helmet title={t('About')}>
      <PageHeader image={AboutImg}>{t('About')}</PageHeader>
      <SimpleGrid
        className="about-page main wrap"
        breakpoints={[
          { maxWidth: 1401, cols: 3, spacing: 20 },
          { maxWidth: 1025, cols: 2 },
          { maxWidth: 601, cols: 1 },
        ]}
        cols={3}
        spacing={20}
        verticalSpacing={20}
      >
        {!!about?.length &&
          about
            .filter((item) => item.isShow)
            .map((item) => (
              <Link to={item.id.toString()} key={item.id} className="about__item">
                <ServiceCard
                  image={item.image[0]}
                  name={i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                />
              </Link>
            ))}
      </SimpleGrid>
      <div className="breadcrumbs wrap">
        <NavLink to="/" className="breadcrumb__item">
          {t('Home')}
        </NavLink>{' '}
        <img src={arrowRight} alt="arrow right icon" />
        <NavLink to="" className="breadcrumb__item active">
          {t('About')}
        </NavLink>
      </div>
    </Helmet>
  );
};

export default About;

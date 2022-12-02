import arrowRight from '@assets/icons/arrow-right.svg';
import ProjectImg from '@assets/page-header/project.png';
import Helmet from '@components/Helmet/Helmet';
import PageHeader from '@components/PageHeader/PageHeader';
import ProjectItem from '@components/ProjectItem/ProjectItem';
import { Flex, Text } from '@mantine/core';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getProjectApi } from 'redux/reducer/projects.slice';

const Projects = () => {
  const { t } = useTranslation();
  const { project, loading } = useAppSelector((state) => state.projects);
  const [tabIndex, setTabIndex] = useState<0 | 1>(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProjectApi());
  }, []);

  return (
    <Helmet title={t('Project')}>
      <PageHeader image={ProjectImg}>{t('Project')}</PageHeader>
      <div className="main wrap">
        <Flex mb={80}>
          <Text
            sx={{
              marginRight: 40,
              cursor: 'pointer',
              color: tabIndex === 0 ? '#0072B8' : '#B3B3B3',
              '@media (max-width: 1400px)': {
                fontSize: 35,
              },
              '@media (max-width: 600px)': {
                marginRight: 24,
                fontSize: 24,
                whiteSpace: 'nowrap',
              },
            }}
            fw={700}
            size={40}
            lh="49px"
            onClick={() => setTabIndex(0)}
          >
            {t('pending')}
          </Text>
          <Text
            mr={40}
            sx={{
              cursor: 'pointer',
              color: tabIndex === 1 ? '#0072B8' : '#B3B3B3',
              '@media (max-width: 1400px)': {
                fontSize: 35,
              },
              '@media (max-width: 600px)': {
                fontSize: 24,
                whiteSpace: 'nowrap',
              },
            }}
            fw={700}
            size={40}
            lh="49px"
            onClick={() => setTabIndex(1)}
          >
            {t('completed')}
          </Text>
        </Flex>

        {!!project.length &&
          tabIndex === 0 &&
          project
            .filter((item) => item.isShow)
            .filter((item) => item.status === 'in progress')
            .map((item) => (
              <ProjectItem
                key={item.id}
                image={item.image[0].url}
                name={i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                address={i18next.language === 'vi_VN' ? item.addressVn : item.addressEn}
                path={item.id.toString()}
              />
            ))}
        {!!project.length &&
          tabIndex === 1 &&
          project
            .filter((item) => item.isShow)
            .filter((item) => item.status === 'completed')
            .map((item) => (
              <ProjectItem
                key={item.id}
                image={item.image[0].url}
                name={i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                address={i18next.language === 'vi_VN' ? item.addressVn : item.addressEn}
                path={item.id.toString()}
              />
            ))}
      </div>

      <div className="breadcrumbs wrap">
        <NavLink to="/" className="breadcrumb__item">
          {t('Home')}
        </NavLink>{' '}
        <img src={arrowRight} alt="arrow right icon" />
        <NavLink to="" className="breadcrumb__item active">
          {t('Project')}
        </NavLink>
      </div>
    </Helmet>
  );
};

export default Projects;

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '@assets/favicon/logo.png';
import { useTranslation } from 'react-i18next';
import './header.scss';
import { Burger, Divider, HoverCard, Text } from '@mantine/core';
import i18next from 'i18next';
import { useAppSelector } from 'redux/hook';

type MainNavType = {
  display: string;
  path: string;
  hoverComponent?: React.FC;
  list?: any[];
};

const Header = () => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const aboutList = useAppSelector((state) => state.about.about);
  const serviceList = useAppSelector((state) => state.service.service);
  const projectList = useAppSelector((state) => state.projects.project);
  const recruitList = useAppSelector((state) => state.recruit.recruit);

  const mainNav: MainNavType[] = [
    {
      display: 'About',
      path: '/about',
      list: aboutList,
    },
    {
      display: 'Service',
      path: '/service',
      list: serviceList,
    },
    {
      display: 'Project',
      path: '/projects',
      list: projectList,
    },
    {
      display: 'Contact',
      path: '/contact',
    },
    {
      display: 'Recruit',
      path: '/recruitment',
      list: recruitList,
    },
  ];
  return (
    <div className="header wrap">
      <Link to="/">
        <img src={Logo} alt="Logo" className="logo" />
      </Link>
      <div className="nav-header">
        {!!mainNav?.length &&
          mainNav.map((nav, index) => (
            <HoverCard key={index} shadow="md" offset={56} radius={20}>
              <HoverCard.Target>
                <NavLink key={nav.display} to={nav.path} className="nav-header__item">
                  <span>{t(nav.display)}</span>
                </NavLink>
              </HoverCard.Target>
              <HoverCard.Dropdown p={48}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      marginRight: 73,
                    }}
                  >
                    <Text fw={700} fz={40} transform="uppercase">
                      {t(nav.display)}
                    </Text>
                    <Link key={nav.display} to={nav.path} className="nav-header__item">
                      <span>{t('More')}</span>
                    </Link>
                  </div>
                  {!!nav.list && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '3px solid #CCCCCC',
                        paddingLeft: 24,
                        gap: 10,
                      }}
                    >
                      {nav.list.slice(0, 5).map((item, index) => (
                        <Link key={index} to={nav.path + `/${item.id ?? item.path}`}>
                          {item.name || item.role}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          ))}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className={`nav-header__item lang ${
              i18next.language === 'vi_VN' ? 'active' : ''
            }`.trim()}
            onClick={() => i18next.changeLanguage('vi_VN')}
          >
            Tiếng việt
          </div>
          <Divider
            orientation="vertical"
            size="sm"
            style={{
              height: 24,
              margin: 'auto 0',
            }}
          />
          <div
            className={`nav-header__item lang ${
              i18next.language === 'en_US' ? 'active' : ''
            }`.trim()}
            onClick={() => i18next.changeLanguage('en_US')}
          >
            English
          </div>
        </div>
      </div>
      <div className="nav-header--mobile">
        <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
      </div>
    </div>
  );
};

export default Header;

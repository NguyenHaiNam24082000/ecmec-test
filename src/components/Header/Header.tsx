import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '@assets/favicon/logo.png';
import { useTranslation } from 'react-i18next';
import './header.scss';
import {
  Burger,
  Divider,
  HoverCard,
  Paper,
  Text,
  Transition,
  Accordion,
  createStyles,
} from '@mantine/core';
import i18next from 'i18next';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { useScrollLock } from '@mantine/hooks';
import { getRecruitApi } from 'redux/reducer/recruit.slice';
import { getAboutApi } from 'redux/reducer/about.slice';
import { getServiceApi } from 'redux/reducer/service.slice';

type MainNavType = {
  display: string;
  path: string;
  hoverComponent?: React.FC;
  list?: any[];
};

const useStyles = createStyles((theme) => ({
  dropdown: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    height: 'calc(100vh - 50px)',
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan(1024)]: {
      display: 'none',
    },
    [theme.fn.largerThan(600)]: {
      top: 90,
    },
  },
}));

const Header = () => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const [opened, setOpened] = useState(false);
  const aboutList = useAppSelector((state) => state.about.about);
  const serviceList = useAppSelector((state) => state.service.service);
  const projectList = useAppSelector((state) => state.projects.project);
  const recruitList = useAppSelector((state) => state.recruit.recruit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecruitApi());
    dispatch(getAboutApi());
    dispatch(getServiceApi());
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18next.language === 'vi_VN' ? 'vi' : 'en'
  },[i18next.language])

  const mainNav: MainNavType[] = [
    {
      display: 'About',
      path: '/about',
      list: aboutList?.filter((about) => about.isShow),
    },
    {
      display: 'Service',
      path: '/service',
      list: serviceList?.filter((service) => service.isShow),
    },
    {
      display: 'Project',
      path: '/projects',
      list: projectList?.filter((project) => project.isShow),
    },
    {
      display: 'Contact',
      path: '/contact',
    },
    {
      display: 'Recruit',
      path: '/recruitment',
      list: recruitList?.filter((recruitment) => recruitment.isShow),
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
                          {(i18next.language === 'vi_VN' ? item.nameVn : item.nameEn) ||
                            (i18next.language === 'vi_VN' ? item.roleVn : item.roleEn)}
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
        <Burger
          color="#0072B8"
          opened={opened}
          onClick={() => {
            const isOpen = opened;
            setOpened(!isOpen);
            setScrollLocked(!isOpen);
          }}
        />
      </div>
      <Transition transition="fade" duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} radius={0}>
            <Accordion
              variant="filled"
              styles={(theme) => ({
                item: {
                  background: 'inherit',
                },
                label: {
                  fontWeight: 500,
                  font: 'Helvetica Neue',
                  fontSize: 26,
                  color: '#0072B8',
                  textTransform: 'uppercase',
                },
                content: {
                  fontWeight: 500,
                },
              })}
            >
              {!!mainNav?.length &&
                mainNav.map((nav, index) => (
                  <Accordion.Item key={nav.display} value={nav.display}>
                    <Accordion.Control
                      chevron={
                        nav?.list?.slice(0, 5).length ? (
                          <svg
                            width={18}
                            height={9}
                            viewBox="0 0 18 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.666626 0.666992L8.99996 9.00033L17.3333 0.666992H0.666626Z"
                              fill="#0072B8"
                            />
                          </svg>
                        ) : (
                          ' '
                        )
                      }
                    >
                      <NavLink to={nav.path}>
                        <span>{t(nav.display)}</span>
                      </NavLink>
                    </Accordion.Control>
                    <Accordion.Panel>
                      {!!nav?.list?.slice(0, 5).length && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingLeft: 24,
                            gap: 10,
                          }}
                        >
                          {nav.list.slice(0, 5).map((item, index) => (
                            <Link key={index} to={nav.path + `/${item.id ?? item.path}`}>
                            {(i18next.language === 'vi_VN' ? item.nameVn : item.nameEn) ||
                              (i18next.language === 'vi_VN' ? item.roleVn : item.roleEn)}
                          </Link>
                          ))}
                        </div>
                      )}
                    </Accordion.Panel>
                  </Accordion.Item>
                  //   </HoverCard.Target>
                  //   <HoverCard.Dropdown p={48}>
                  //     <div
                  //       style={{
                  //         display: 'flex',
                  //         justifyContent: 'space-between',
                  //       }}
                  //     >
                  //       <div
                  //         style={{
                  //           marginRight: 73,
                  //         }}
                  //       >
                  //         <Text fw={700} fz={40} transform="uppercase">
                  //           {t(nav.display)}
                  //         </Text>
                  //         <Link key={nav.display} to={nav.path} className="nav-header__item">
                  //           <span>{t('More')}</span>
                  //         </Link>
                  //       </div>
                  //       {!!nav.list && (
                  //         <div
                  //           style={{
                  //             display: 'flex',
                  //             flexDirection: 'column',
                  //             borderLeft: '3px solid #CCCCCC',
                  //             paddingLeft: 24,
                  //             gap: 10,
                  //           }}
                  //         >
                  //           {nav.list.slice(0, 5).map((item, index) => (
                  //             <Link key={index} to={nav.path + `/${item.id ?? item.path}`}>
                  //               {item.name || item.role}
                  //             </Link>
                  //           ))}
                  //         </div>
                  //       )}
                  //     </div>
                  //   </HoverCard.Dropdown>
                  // </HoverCard>
                ))}
            </Accordion>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 12,
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
          </Paper>
        )}
      </Transition>
    </div>
  );
};

export default Header;

import { Text } from '@mantine/core';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';
import './footer.scss';

const Footer = () => {
  const { t } = useTranslation();
  const About = useAppSelector((state) => state.about.about);
  const Service = useAppSelector((state) => state.service.service);
  const Recruit = useAppSelector((state) => state.recruit.recruit);

  const listAddress = [
    {
      id: 'HN',
      name: t('Hanoi office'),
      address: t('HN_Address'),
      phone: '(84.24) 73073777',
      fax: '(84.24) 73073111',
    },
    {
      id: 'HCM',
      name: t('HCM office'),
      address: t('HCM_Address'),
      phone: '(84.24) 381 436 26',
      fax: '(84.24) 381 436 26',
    },
  ];
  return (
    <div className="row footer">
      <div className="footer__list">
        <h3>{t('About')}</h3>
        <ul>
          {About.filter((item) => item.isShow)
            .slice(0, 5)
            .map((item) => (
              <li key={item.id} className="footer__list__item">
                <svg
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path d="M96 96L256 256 96 416l-32 0L64 96l32 0z" />
                </svg>
                <Link to={`/about/${item.id}`}>
                  <Text lineClamp={2} fw={400}>
                    {i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                  </Text>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="footer__list">
        <h3>{t('Business areas')}</h3>
        <ul>
          {Service.filter((item) => item.isShow)
            .slice(0, 5)
            .map((item) => (
              <li key={item.id} className="footer__list__item">
                <svg
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path d="M96 96L256 256 96 416l-32 0L64 96l32 0z" />
                </svg>
                <Link to={`/service/${item.id}`}>
                  <Text lineClamp={2} fw={400}>
                    {i18next.language === 'vi_VN' ? item.nameVn : item.nameEn}
                  </Text>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="footer__list">
        <h3>{t('RecruitInfo')}</h3>
        <ul>
          {Recruit.filter((item) => item.isShow)
            .slice(0, 5)
            .map((item) => (
              <li key={item.id} className="footer__list__item">
                <svg
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                >
                  <path d="M96 96L256 256 96 416l-32 0L64 96l32 0z" />
                </svg>
                <Link to={`/recruitment/${item.id}`}>
                  <Text lineClamp={2} fw={400}>
                    {i18next.language === 'vi_VN' ? item.roleVn : item.roleEn}
                  </Text>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="footer__list">
        <h3>{t('Contact')}</h3>
        {listAddress.map((address) => (
          <div key={address.id} className="footer__list__address">
            <h4 className="address">{address.name}</h4>
            <ul>
              <li className="footer__list__item">
                <svg
                  width={30}
                  height={30}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z" />
                </svg>
                <span>{address.address}</span>
              </li>
              <li className="footer__list__item">
                <svg
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
                <span>{address.phone}</span>
              </li>
              <li className="footer__list__item">
                <svg
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M128 64v96h64V64H386.7L416 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L432 18.7C420 6.7 403.7 0 386.7 0H192c-35.3 0-64 28.7-64 64zM0 160V480c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zm480 32H128V480c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM256 320c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm160-32c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zM384 448c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm-96-32c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z" />
                </svg>
                <span>{address.fax}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;

import arrowRight from '@assets/icons/arrow-right.svg';
import ContactImage from '@assets/page-header/contact.png';
import ContactItem from '@components/ContactItem/ContactItem';
import Helmet from '@components/Helmet/Helmet';
import PageHeader from '@components/PageHeader/PageHeader';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'redux/hook';

const Contact = () => {
  const { t } = useTranslation();
  const { contact } = useAppSelector((state) => state.contact);
  return (
    <Helmet title={t('Contact')}>
      <PageHeader image={ContactImage}>{t('Contact')}</PageHeader>
      <div className="main wrap">
        {!!contact.length &&
          contact.map((item, index) => (
            <ContactItem
              key={index}
              name={item.name}
              address={item.address}
              phonenumb={item.phonenumb}
              staticPhone={item.staticPhone}
              email={item.email}
              alternativeEmail={item.alternativeEmail}
            />
          ))}
      </div>
      <div className="breadcrumbs wrap">
        <NavLink to="/" className="breadcrumb__item">
          {t('Home')}
        </NavLink>{' '}
        <img src={arrowRight} alt="arrow right icon" />
        <NavLink to="" className="breadcrumb__item active">
          {t('Contact')}
        </NavLink>
      </div>
    </Helmet>
  );
};

export default Contact;

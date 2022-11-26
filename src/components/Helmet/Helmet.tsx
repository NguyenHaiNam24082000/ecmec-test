import configs from '@constants/configs';
import React from 'react';

type HelmetPropTypes = {
  title: string;
  children?: any;
};

const Helmet = (props: HelmetPropTypes) => {
  document.title = configs.APP_NAME + ' - ' + props.title;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{props.children}</div>;
};

export default Helmet;

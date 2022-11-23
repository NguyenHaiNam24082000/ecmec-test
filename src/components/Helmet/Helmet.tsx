import React from 'react';

type HelmetPropTypes = {
  title: string;
  children?: any;
};

const Helmet = (props: HelmetPropTypes) => {
  document.title = 'CÔNG TY TNHH KỸ THUẬT XÂY DỰNG VÀ CƠ ĐIỆN CÔNG TRÌNH ECMEC - ' + props.title;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{props.children}</div>;
};

export default Helmet;

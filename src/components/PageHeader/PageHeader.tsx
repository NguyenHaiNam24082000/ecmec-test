import { BackgroundImage } from '@mantine/core';
import React from 'react';
import './page-header.scss';
type PageHeaderType = {
  children: React.ReactNode;
  image: string;
};
const PageHeader = (props: PageHeaderType) => {
  return (
    <BackgroundImage src={props.image} className="page-header">
      <div className="page-header__name wrap">{props.children}</div>
    </BackgroundImage>
  );
};

export default PageHeader;

import { Image } from '@mantine/core';
import './service-card.scss';

type ServiceCardType = {
  image?: string;
  name?: string;
  withOverlay?: boolean;
  width?: number | string;
  height?: number | string;
  sx?: any;
};

const ServiceCard = (props: ServiceCardType) => {
  return (
    <div className="service__item__wrapper">
      <Image
        className="service__item__image"
        radius={20}
        sx={props.sx}
        src={props.image}
        alt={props.name}
        maw={467}
        width={props.width}
        height={props.height || 413}
      />
      <div className={props.withOverlay ? 'service__item__overlay' : undefined}>
        <p className="service__item__caption">{props.name}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

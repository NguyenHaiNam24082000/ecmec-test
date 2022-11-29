import { BackgroundImage } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import './project-card.scss';
type ProjectCardType = {
  image: string;
  name: string;
  address: string;
  height?: number;
  width?: number;
  status: 'in progress' | 'completed' | 'failed';
};
const ProjectCard = (props: ProjectCardType) => {
  const { t } = useTranslation();
  const matches = useMediaQuery('(max-width: 600px)');
  return (
    <BackgroundImage
      radius={20}
      sx={{
        height: props.height ?? 666,
        width: props.width,
        '@media (max-width: 1400px)': {
          height: 555,
          borderRadius: 20,
        },
        '@media (max-width: 1024px)': {
          height: 400,
          borderRadius: 20,
        },
        '@media (max-width: 600px)': {
          height: 666,
          borderRadius: 20,
        },
      }}
      src={props.image}
      className="project-card"
    >
      {matches && <div className={`project-card__status ${props.status}`}>{t(props.status)}</div>}
      <div className="project-card__desc">
        <div className="project-card__name">{props.name}</div>
        <div className="project-card__address">
          <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
          </svg>{' '}
          {props.address}
        </div>
        {!matches && <div className={`project-card__status ${props.status}`}>{t(props.status)}</div>}
      </div>
    </BackgroundImage>
  );
};

export default ProjectCard;

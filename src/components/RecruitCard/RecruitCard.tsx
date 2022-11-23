import Button from '@components/Button/Button';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import './recruit-card.scss';

type RecruitCardProps = {
  role: string;
  address: string;
  salary: number | null;
  path: string;
};

const RecruitCard = (props: RecruitCardProps) => {
  return (
    <div className="recruit-card">
      <Text className="recruit-card__role">{props.role}</Text>
      <Text className="recruit-card__address">
        <svg
          width={20}
          height={20}
          fill="#CCCCCC"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
        </svg>
        {'  '}
        {props.address}
      </Text>
      <Text className="recruit-card__salary">
        <svg
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 0C1.34531 0 0 1.34531 0 3V15C0 16.6547 1.34531 18 3 18H24C25.6547 18 27 16.6547 27 15V3C27 1.34531 25.6547 0 24 0H3ZM6 15H3V12C4.65469 12 6 13.3453 6 15ZM3 6V3H6C6 4.65469 4.65469 6 3 6ZM21 15C21 13.3453 22.3453 12 24 12V15H21ZM24 6C22.3453 6 21 4.65469 21 3H24V6ZM13.5 13.5C11.0156 13.5 9 11.4844 9 9C9 6.51562 11.0156 4.5 13.5 4.5C15.9844 4.5 18 6.51562 18 9C18 11.4844 15.9844 13.5 13.5 13.5Z"
            fill="#CCCCCC"
          />
        </svg>
        {'  '}
        {props.salary
          ? `${props.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND`
          : 'Thỏa thuận'}
      </Text>
      <Link to={props.path} style={{ marginTop: 'auto' }}>
        <Button>Xem thêm</Button>
      </Link>
    </div>
  );
};

export default RecruitCard;

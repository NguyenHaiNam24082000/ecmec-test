import { Button as ButtonMantine, ButtonProps } from '@mantine/core';
import React from 'react';

type buttonProps = ButtonProps;

const Button = (props: buttonProps) => {
  return (
    <ButtonMantine
      className="customize-button"
      rightIcon={
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="#0072B8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.16663 6.99998H13.8333M8.29163 1.45831L13.8333 6.99998L8.29163 12.5416"
            stroke="#0072B8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      sx={{
        background: '#EDE51C',
        padding: '0 58px',
        ':hover': {
          background: '#EDE51C',
        },
      }}
      radius={10}
      {...props}
    >
      <span
        style={{
          color: '#0072B8',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: 17,
          lineHeight: 20,
          padding: '10px 0',
        }}
      >
        {props.children}
      </span>
    </ButtonMantine>
  );
};

export default Button;

import { NavBar } from '@components/NavBar/NavBar';
import { Header } from '@mantine/core';
import React from 'react';

function AdminContainer({ children }: any) {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <NavBar />
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <Header
          height={80}
          p={16}
          sx={{
            position: 'absolute',
            background: 'transparent',
          }}
          withBorder={false}
        >
          {''}
        </Header>
        <div
          style={{
            padding: '128px 0',
            background: '#0072b8',
            position: 'absolute',
            top: '0px',
            width: '100%',
            zIndex: -1,
          }}
        ></div>
        <div
          style={{
            padding: '64px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminContainer;

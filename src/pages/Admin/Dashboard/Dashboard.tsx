import { NavBar } from '@components/NavBar/NavBar';
import { Header } from '@mantine/core';
import React from 'react';

const Dashboard = () => {
  return (
    <div style={{
      display: 'flex',
    }}>
      <NavBar />
      <div style={{
        position: 'relative',
        width: '100%'
      }}>
        <Header height={80} p={16} sx={{
          position: 'absolute',
          background: 'transparent'
        }} withBorder={false}>
        </Header>
        <div style={{
            padding: '128px 0',
            background: '#0072b8'
          }}></div>
      </div>
    </div>
  );
};

export default Dashboard;

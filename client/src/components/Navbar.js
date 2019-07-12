import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import '../styles/App.css';

const { Header } = Layout;

const Navbar = ({ page }) => {
  return (
    <Layout>
      <div className='logo' />
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={[page]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='1'>
            <Link to='./'>ERC_20 </Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='./ERC_721'>ERC_721 </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;

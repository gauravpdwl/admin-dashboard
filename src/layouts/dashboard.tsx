import { NavLink, Navigate, Outlet } from 'react-router-dom';
import Icon, { HomeOutlined, UserOutlined, ProductOutlined, ProfileOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { foodIcon } from '../components/icons/foodicon';

const { Sider, Header, Content, Footer } = Layout;

const items = [
    {
        key: '/',
        icon: <HomeOutlined/>,
        label: <NavLink to="/">Home</NavLink>,
    },
    {
        key: '/users',
        icon: <UserOutlined/>,
        label: <NavLink to="/users">Users</NavLink>,
    },
    {
        key: '/restaurants',
        icon: <Icon component={foodIcon} />,
        label: <NavLink to="/restaurants">Restaurants</NavLink>,
    },
    {
        key: '/products',
        icon: <ProductOutlined />,
        label: <NavLink to="/products">Products</NavLink>,
    },
    {
        key: '/promos',
        icon: <ProfileOutlined />,
        label: <NavLink to="/promos">Promos</NavLink>,
    },
];
const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // call getself
    const { user } = useAuthStore();
    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }
    return (
        <div>
            <Layout style={{ minHeight: '100vh', padding: 0 }} >
                <Sider
                    style={{padding:0}}
                    collapsible
                    theme="dark"
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
                    <Menu style={{padding:8}} theme="dark" defaultSelectedKeys={['/']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Mernspace pizza shop</Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import Icon, { BellFilled, HomeOutlined, UserOutlined, ProductOutlined, ProfileOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store';
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from 'antd';
import { useState } from 'react';
import { foodIcon } from '../components/icons/foodicon';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../http/api';


const { Sider, Header, Content, Footer } = Layout;

const getMenuItems=(role:string)=>{

    const baseItems=[

        {
            key: '/',
            icon: <HomeOutlined/>,
            label: <NavLink to="/">Home</NavLink>,
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

    ]

    // *************to be changed after adding admin user creation route in backend***************
    //  change to admin 
    if(role === 'admin'){

        const menus=[...baseItems];
        // adds the user route on second position in list
        menus.splice(1, 0, {
            key: '/users',
            icon: <UserOutlined/>,
            label: <NavLink to="/users">Users</NavLink>,
        })

        return menus;
    }

    return baseItems;
}


// const items = [
//     {
//         key: '/',
//         icon: <HomeOutlined/>,
//         label: <NavLink to="/">Home</NavLink>,
//     },
//     {
//         key: '/users',
//         icon: <UserOutlined/>,
//         label: <NavLink to="/users">Users</NavLink>,
//     },
//     {
//         key: '/restaurants',
//         icon: <Icon component={foodIcon} />,
//         label: <NavLink to="/restaurants">Restaurants</NavLink>,
//     },
//     {
//         key: '/products',
//         icon: <ProductOutlined />,
//         label: <NavLink to="/products">Products</NavLink>,
//     },
//     {
//         key: '/promos',
//         icon: <ProfileOutlined />,
//         label: <NavLink to="/promos">Promos</NavLink>,
//     },
// ];

const Dashboard = () => {

    // to set state user to null
    const { logout: logoutFromStore } = useAuthStore();

    const { mutate: logoutMutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
        onSuccess: async () => {
            logoutFromStore();
            return;
        },
    });

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // call getself
    const { user } = useAuthStore();
    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }

    const items=getMenuItems(user.role);
    
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
                <Header
                        style={{
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            background: colorBgContainer,
                        }}>
                        <Flex gap="middle" align="start" justify="space-between">
                            <Badge text={
                                user.role === 'admin' ? "You are an Admin" : user.tenant?.name
                            } status="success" />
                            <Space size={16}>
                                <Badge dot={true}>
                                    <BellFilled />
                                </Badge>
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: 'logout',
                                                label: 'Logout',
                                                onClick: () => logoutMutate(),
                                            },
                                        ],
                                    }}
                                    placement="bottomRight">
                                    <Avatar
                                        style={{
                                            backgroundColor: '#fde3cf',
                                            color: '#f56a00',
                                        }}>
                                        U
                                    </Avatar>
                                </Dropdown>
                            </Space>
                        </Flex>
                    </Header>
                    <Content style={{ margin: '24px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Mernspace pizza shop</Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;
import { Breadcrumb, Button, Drawer, Space, Table } from 'antd';
import { RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../http/api';
import { User } from '../../types';
import { useAuthStore } from '../../store';
import UsersFilter from './usersfilter';
import React from 'react';

const fetchUsers= async ()=>{
    const output=await getUsers();
    return output.data;
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (_text: string, record: User) => {
            return (
                <div>
                    {record.firstName} {record.lastName}
                </div>
            );
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
];

const Users = () => {

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const {data : users, isLoading, isError, error}=useQuery({
        queryKey:['users'],
        queryFn:fetchUsers,
        retryOnMount:false,
        staleTime: 1000*60,
    });

    // *************to be changed after adding admin user creation route in backend***************

    const {user} = useAuthStore();
    if(user?.role !== 'customer'){
        return <Navigate to="/" replace={true} />;
    }

    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Breadcrumb
                    separator={<RightOutlined />}
                    items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Users' }]}
                />

                <UsersFilter onFilterChange={(filterName:string, filterValue:string)=>{
                    console.log("filterName - "+filterName+" filterValue - "+filterValue);
                }}>

                    <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => setDrawerOpen(true)}
                    >
                        Add User
                    </Button>

                </UsersFilter>

                {isLoading && <div>Loading...</div>}
                {isError && <div>{error.message}</div>}

                <Table columns={columns} dataSource={users} rowKey={"id"} />

                <Drawer
                    title="Create user"
                    width={720}
                    destroyOnClose={true}
                    open={drawerOpen}
                    onClose={() => {
                        setDrawerOpen(false);
                    }}
                    extra={
                        <Space>
                            <Button>Cancel</Button>
                            <Button type="primary">Submit</Button>
                        </Space>
                    }>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>

            </Space>
        </>
    );
};

export default Users;
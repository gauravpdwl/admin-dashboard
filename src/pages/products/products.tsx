import { Breadcrumb, Button, Flex, Form, Image, Space, Table, Tag, Typography } from 'antd';
import { RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductsFilter from './productsFilter';
import { FieldData, Product } from '../../types';
import React from 'react';
import { per_page } from '../../constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '../../http/api';
import { format } from 'date-fns';
import { debounce } from 'lodash';

const columns = [
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        render: (_text: string, record: Product) => {
            return (
                <div>
                    <Space>
                        <Image width={60} src={record.image} preview={false} />
                        <Typography.Text>{record.name}</Typography.Text>
                    </Space>
                </div>
            );
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Status',
        dataIndex: 'isPublish',
        key: 'isPublish',
        render: (_: boolean, record: Product) => {
            return (
                <>
                    {record.isPublish ? (
                        <Tag color="green">Published</Tag>
                    ) : (
                        <Tag color="red">Draft</Tag>
                    )}
                </>
            );
        },
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: string) => {
            return <Typography.Text>{format(new Date(text), 'dd/MM/yyyy HH:mm')}</Typography.Text>;
        },
    },
];

const Products = () => {
    const [filterForm] = Form.useForm();

    const [queryParams, setQueryParams] = React.useState({
        pageSize: per_page,
        currentPage: 1,
    });

    const {
        data: products
    } = useQuery({
        queryKey: ['products', queryParams],
        queryFn: () => {
            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );

            const queryString = new URLSearchParams(
                filteredParams as unknown as Record<string, string>
            ).toString();
            return getProducts(queryString).then((res) => res.data);
        },
        placeholderData: keepPreviousData,
        retryOnMount: false,
        staleTime: 1000 * 60,
    });

    const debouncedQUpdate = React.useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
        }, 500);
    }, []);

    const onFilterChange = (changedFields: FieldData[]) => {

        // console.log("Changed filters in products page ",changedFields);
        const changedFilterFields = changedFields
            .map((item) => ({
                [item.name[0]]: item.value,
            }))
            .reduce((acc, item) => ({ ...acc, ...item }), {});
        if ('q' in changedFilterFields) {
            debouncedQUpdate(changedFilterFields.q);
        } else {
            setQueryParams((prev) => ({ ...prev, ...changedFilterFields, currentPage: 1 }));
        }
    };

    // const onFilterChange=(changedFields: FieldData)=>{
    //     console.log("Changed filters in products page ",changedFields);
    // }

    // console.log(products);

    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Breadcrumb
                        separator={<RightOutlined />}
                        items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Products' }]}
                    />
                </Flex>
                {/* onFieldsChange={() => {onFilterChange}} */}
                <Form form={filterForm} onFieldsChange={onFilterChange}>
                    <ProductsFilter>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
                            Add Product
                        </Button>
                    </ProductsFilter>
                </Form>

                <Table
                    columns={[
                        ...columns,
                        {
                            title: 'Actions',
                            render: () => {
                                return (
                                    <Space>
                                        <Button type="link" onClick={() => {}}>
                                            Edit
                                        </Button>
                                    </Space>
                                );
                            },
                        },
                    ]}
                    dataSource={products?.data}
                    rowKey={'_id'}
                    pagination={{
                        total: products?.total,
                        pageSize: queryParams.pageSize,
                        current: queryParams.currentPage,
                        onChange: (page) => {
                            // console.log(page);
                            setQueryParams((prev) => {
                                return {
                                    ...prev,
                                    currentPage: page,
                                };
                            });
                        },
                        showTotal: (total: number, range: number[]) => {
                            // console.log(total, range);
                            return `Showing ${range[0]}-${range[1]} of ${total} items`;
                        },
                    }}
                />
            </Space>
        </>
    );
};

export default Products;
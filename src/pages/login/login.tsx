import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from 'antd';
import {LockFilled} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Credentials } from '../../types';
import { login, self, logout as logoutfromapireq } from '../../http/api';
import { useAuthStore } from '../../store';
import { usePermission } from '../../hooks/usePermission';
// import style from './login.module.css';

const loginUser=async (credentials: Credentials)=>{
  // server call logic
  // console.log("from mutate call -",credentials);
  const {data}=await login(credentials);
  return data;
}

const getSelf=async()=>{
  const output = await self();
  // console.log("data -",output);
  return output.data;
}

function LoginPage() {

  const {isAllowed}=usePermission()
  const {setUser, logout} = useAuthStore();

  const {refetch }=useQuery({
    queryKey:['self'],
    queryFn: getSelf,
    // on render this function execute automatically so to prevent we use enabled false.
    enabled:false
  })
  
  // returns mutate function
  const {mutate, isPending, isError, error}=useMutation({
      mutationKey:['login'],
      mutationFn:loginUser,
      onSuccess:async()=>{

        const selfDataPromise=await refetch();

        // here we are checking if user is admin or manager
        // if customer is present then isAllowed will return true
        // we are setting user in state to null and removing cookies through logout api call

        if(!isAllowed(selfDataPromise.data)){
          logout();
          await logoutfromapireq();
          return;
        }

        // if(selfDataPromise.data.role === 'customer'){
        //   await logout();
        //   await logoutfromapireq();
        //   return;
        // }

        setUser(selfDataPromise.data);
        console.log("User data - ", selfDataPromise.data);
        console.log("login successful");
      }
  })


  
  return (
    <>
      <Layout style={{height:'100vh', display:'grid', placeItems:'center'}}>
        <Card 
        bordered={false}
        style={{width:300}}
        title={<Space style={{width:'100%', fontSize:16, justifyContent:'center'}} ><LockFilled/>'Sign in'</Space>}
        >
          <Form 

          initialValues={{
            remember:true
          }}

          onFinish={(values)=>{
            mutate({email:values.username, password:values.password})
            // console.log(values);
          }}
          
          >

            {isError && <Alert style={{marginBottom:24}} type='error' message={error.message} />}

            <Form.Item name="username" rules={
              [{
                required:true,
                message:"Please enter username"
              }]
            }>
              <Input placeholder='Username'/>
            </Form.Item>
            <Form.Item name="password" rules={
              [{
                required:true,
                message:"Please enter password"
              }]
            }>
              <Input.Password placeholder='Password'/>
            </Form.Item>

              <Flex justify="space-between" >
                <Form.Item name="remember" valuePropName='checked'>
                  <Checkbox>Remember Me</Checkbox>
                </Form.Item>
                <Form.Item>
                  <a href=''>Forgot Password</a>
                </Form.Item>
              </Flex>
            
            <Form.Item>
              <Button type='primary' htmlType='submit' style={{width:'100%'}} loading={isPending}>
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
    </>
  )
}

export default LoginPage;
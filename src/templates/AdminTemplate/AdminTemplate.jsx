import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import {  USER_LOGIN } from "../../util/settings/Config";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const AdminTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

    })

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />

    }

    const operations = <Fragment >
        {!_.isEmpty(userLogin) ? <Fragment> 
            <button style={{  height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-xl  rounded-full   m-0 " onClick={() => {
            history.push('/user/thongtintaikhoan')
        }}> 
        <span >Hello ! {userLogin.hoTen}
        </span>
        </button> 
        <button onClick={() => {
            (localStorage.removeItem(USER_LOGIN))
            history.push('/home');
            // window.location.reload();
        }} style={{  height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-[14px]  rounded-full  m-0 ">Đăng xuất</button> 
        </Fragment> : ''}
    </Fragment>


    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-3 pl-4">
                        <NavLink to ='/'>

                        <img src="../img/logo.png" width={50} alt="..." />
                        </NavLink>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['sub1']} mode="inline">
                    <SubMenu key="2" icon={<FileOutlined />} title="Quan Lý Người Dùng">
                    <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/adminusers">Danh Sách Người Dùng</NavLink>
                        </Menu.Item>
                            <Menu.Item key="9" icon={<FileOutlined />}>
                            <NavLink to="/admin/adminusers/addnewuser">Thêm Người Dùng</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub1" icon={<FileOutlined />} title="Quản Lý Phim">
                            <Menu.Item key="10" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Danh Sách Phim</NavLink>
                               
                            </Menu.Item>
                            <Menu.Item key="11" icon={<FileOutlined />}>
                            <NavLink to="/admin/films/addnewfilm">Thêm Phim Mới</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background flex justify-content-end" style={{ paddingTop: '10px' }} >
                        {operations}
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}


export default AdminTemplate;
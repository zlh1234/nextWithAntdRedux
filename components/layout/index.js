import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Layout, Menu, Icon } from 'antd';
import NProgress from 'nprogress';
import NavLink from './navLink';
//路由时触发进度条
Router.onRouteChangeStart = () => {
    NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const { Header, Content, Footer } = Layout;
export default ({ children, title = '首页' }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8' />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
                />
                <link rel="stylesheet" href="/static/css/nprogress.css" />
                <link rel="shortcut icon" href="/static/img/favicon.ico" type="image/x-icon" />
            </Head>
            <Header>
                <Menu theme="dark" mode="horizontal" style={{ height: 64 }} >
                    <NavLink href='/'>主页</NavLink>
                    <NavLink href='/list'>列表页</NavLink>
                </Menu>
            </Header>
            <Content>
                {children}
            </Content>
            <Footer>这是底部</Footer>
        </div>
    )
}
import React, { Component } from 'react';
import Layout from '../../../components/layout';
import Link from 'next/link';
export default class List extends Component {
    render () {
        return <Layout title={`列表详情 - ${this.props.router.query.title}`}>
            <Link href='/list' as='/detailbackList'><a>返回</a></Link>
            <div>
                {this.props.router.query.title}
                我是详情页
            </div>
        </Layout>;
    }
}
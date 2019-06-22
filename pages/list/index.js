import React, { Component } from 'react';
import Layout from '../../components/layout';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import style from './index.less';
export default class List extends Component {
    static async getInitialProps ({ req }) {
        let res = await axios.get('http://127.0.0.1:3033/api/getList');
        return { data: res.data };
    }
    componentDidMount () {
        Router.prefetch('/');
    }
    handleClick = ({ title }) => () => {
        Router.push({
            pathname: '/list/detail',
            query: { title }
        })
    }
    render () {
        return <Layout title="列表页">
            <div className={style.list}>
                {
                    this.props.data && this.props.data.map(v => <h1 onClick={this.handleClick(v)} key={v.title} className='f'>{v.title}</h1>)
                }
            </div>
        </Layout>;
    }
}
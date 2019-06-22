import React, { Component } from 'react';
import { Button } from 'antd';
import Layout from '../../components/layout';
import axios from 'axios';
import { connect } from 'react-redux';
import style from './index.less';
import { incrementCount, decrementCount, asyncInc } from '../../store/actions/demo';
@connect(state => ({
    demoReducer: state.demoReducer
}), { incrementCount, decrementCount, asyncInc })
export default class Index extends Component {
    static async getInitialProps ({ req }) {
        let res = await axios.get('http://127.0.0.1:3033/api/getData');
        return { data: res.data };
    }
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        console.log(this.props);
    }
    increment = () => {
        this.props.incrementCount();
    }
    decrement = () => {
        this.props.decrementCount();
    }
    asyncIncrement = () => {
        this.props.asyncInc();
    }
    render () {
        return (
            <Layout title="主页哈哈">
                <p>当前数：{this.props.demoReducer.num}</p>
                <Button type="primary" onClick={this.increment}>加</Button>
                -
                <Button type="primary" onClick={this.decrement}>减</Button>
                -
                <Button type="primary" onClick={this.asyncIncrement}>异步增加</Button>
                <div className={style.index}>
                    {
                        this.props.data && this.props.data.map(v => <h1 key={v.name} className='f'>{v.name}</h1>)
                    }
                </div>
            </Layout>
        );
    }
}
import React from 'react';
import Router, { withRouter } from 'next/router'
@withRouter
class NavLink extends React.Component {
    handleClick = () => {
        const { href, router } = this.props;
        if (router.pathname !== href) {
            Router.push({
                pathname: href,
                query: href === '/list' ? { a: 1 } : {}
            }).then(() => {
                window.scrollTo(0, 0);
            });
        }
    }
    render () {
        const { href, children, router } = this.props;
        let arr = router.pathname.substr(1).split('/');
        const active = arr[0] === href.substr(1);
        const className = active
            ? 'ant-menu-item-selected ant-menu-item'
            : 'ant-menu-item';
        return (
            <>
                <span onClick={this.handleClick} className={className} aria-selected="false">
                    {children}
                </span>
                <style jsx>{`
                    span {
                        display:inline-block;
                        height:100%;
                        line-height:64px;
                        margin-right:10px;
                        color:#f5f5f5;
                        cursor: pointer;
                    }
                    span:hover{
                        color:#f5f5f5;
                    }
                `}</style>
            </>
        )
    }
}
export default NavLink;
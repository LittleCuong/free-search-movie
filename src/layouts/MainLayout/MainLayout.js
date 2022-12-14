import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/layouts/Header/Header.js';
import Private from '~/pages/Private/Private';
import Body from '../Body/Body';
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)

function MainLayout({children}) {
    return (
        <div className={cx('wrapper', 'grid')}>
            <Header/>
            <div className={cx('container')}>
                <Body/>
            </div>
            <Footer/> 
        </div>
    )
}

export default MainLayout;
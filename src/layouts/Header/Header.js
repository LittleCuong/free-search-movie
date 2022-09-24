import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import {AiOutlineCaretUp, AiFillCaretDown} from 'react-icons/ai'

import styles from './Header.module.scss';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Header({className}) {
    const [background, setBackground] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', changeBackground) 
    })

    const changeBackground = () => {
        if (window.scrollY > 100) {
            setBackground(true)
        } else {
            setBackground(false)
        }
    }  

    const wrapper = cx('wrapper')
    const wrapperWithBackground = cx('wrapper', 'show')

    return (
        <div id='header' className={background ? wrapperWithBackground : wrapper }>
            <div className={cx('left')}>
                <img 
                    src='https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/299271085_5479761142082361_3928683515544971155_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=bA2Td7Fs2oQAX-rt2Sj&_nc_ht=scontent.fsgn5-5.fna&oh=03_AVIjdOtlp0k4mzIuYBx2RrIHHN0xDDsYhbH_TAEmyhc-9A&oe=63245AEF' 
                    alt='CNG'
                    className={cx('logo')}
                />
                <ul className={cx('navbar_list-left', 'navbar-list')} >
                    <li className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                        <a href='/' className={cx('navbar_item-link')}>For You</a>
                    </li>
                    <li className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                        <a href='/' className={cx('navbar_item-link')}>Top Rated</a>
                    </li>
                    <li className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                        <a href='/' className={cx('navbar_item-link')}>Watch Lists</a>
                    </li>                   
                    <HeadlessTippy
                        interactive                       
                        offset={[46, 10]}
                        placement='bottom-end'
                        render={attrs => (
                            <>
                                <div className={cx('subnav')} tabIndex="-1" {...attrs}>
                                    <div className={cx('subnav-item', 'first-subnav')}>
                                        <a href='/'>Actors</a>                   
                                    </div>
                                    <div className={cx('subnav-item')}>
                                        <a href='/'>Anime</a>
                                    </div>
                                    <div className={cx('subnav-item')}>
                                        <a href='/'>TV Shows</a>
                                    </div>
                                    <div className={cx('subnav-item')}>
                                        <a href='/'>Support</a>
                                    </div>
                                    <div className={cx('subnav-item')}>
                                        <a href='/'>Coming Soon</a>
                                    </div>
                                </div>
                                <AiOutlineCaretUp className={cx('up-arrow')}/>
                            </>
                        )}
                    >
                        <li className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                            <a href='/' className={cx('navbar_item-link', 'option-m')}>
                                More
                                <AiFillCaretDown className={cx('down-icon')}/>
                            </a>
                        </li>
                    </HeadlessTippy>
                </ul>
            </div>
            <div className={cx('right')}>
                <Search/>
                <Link to='/register' className={cx('register-button')}>
                    <span className={cx('register-text')}>Sign in</span>
                </Link>
            </div>
        </div> 
    );
}

export default Header;
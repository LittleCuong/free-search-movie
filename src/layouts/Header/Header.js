import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import {AiOutlineCaretUp, AiFillCaretDown, AiOutlineMenu} from 'react-icons/ai'
import grid from '~/assets/GridSystem/grid.css'

import styles from './Header.module.scss';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import config from '~/config/config';


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

    const wrapper = cx('wrapper', 'grid', 'row', 'col' )
    const wrapperWithBackground = cx('wrapper', 'show', 'grid', 'row', 'col')

    return (
        <div id='header' className={background ? wrapperWithBackground : wrapper }>
            <div className={cx('left')}>
                <ul className={cx('navbar_list-left', 'navbar-list', 'hide-on-mobile')} >
                    <li className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                        <span  className={cx('navbar_item-link')}>For You</span>
                    </li>
                    <li className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                        <span  className={cx('navbar_item-link')}>Top Rated</span>
                    </li>
                    <li className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                        <span  className={cx('navbar_item-link')}>Watch Lists</span>
                    </li>                   
                    <HeadlessTippy
                        interactive                       
                        offset={[46, 10]}
                        placement='bottom-end'
                        render={attrs => (
                            <>
                                <div className={cx('subnav')} tabIndex="-1" {...attrs}>
                                    <div className={cx('subnav-item', 'first-subnav')}>
                                        <span href='/'>Actors</span>                   
                                    </div>
                                    <div className={cx('subnav-item')}>
                                        <span href='/'>Anime</span>
                                    </div>
                                    <div className={cx('subnav-item')}>
                                        <span href='/'>TV Shows</span>
                                    </div>
                                    <div className={cx('subnav-item')}>
                                        <span href='/'>Support</span>
                                    </div>
                                    <div className={cx('subnav-item')}>
                                        <span href='/'>Coming Soon</span>
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
                <button className={cx('menu_mobile-btn')}>
                    <AiOutlineMenu className={cx('menu_mobile-icon')}/>
                </button>
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
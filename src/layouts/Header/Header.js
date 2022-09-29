import { useEffect, useRef, useState } from 'react';
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
    const menuMobileRef = useRef()
    const [background, setBackground] = useState(false)
    const [menuMobile, setMenuMobile] = useState(false)

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


    // Handle
    const handleMenuMobile = () => {
        if (menuMobile === false) {
            setMenuMobile(true)
            menuMobileRef.current.style.transform = 'translateX(0)'
        } else {
            setMenuMobile(false)
            menuMobileRef.current.style.transform = 'translateX(-100%)'
        }
    }

    return (
        <div id='header' className={background ? wrapperWithBackground : wrapper }>
            <div className={cx('left')}>
                <ul className={cx('navbar_list-left', 'navbar-list', 'hide-on-mobile', 'hide-on-mobile-lowRel')} >
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
                    <HeadlessTippy
                        interactive       
                        // visible={menuMobile}  
                        visible             
                        render={attrs => (
                            <>
                                <div className={cx('mobile-subnav')} tabIndex="-1" {...attrs} ref={menuMobileRef}>
                                    <div className={cx('mobile-subnav-item', 'first-mobile-subnav')}>
                                        <span className={cx('mobile-navbar_item-link')}>For You</span>                                       
                                    </div>
                                    <div className={cx('mobile-subnav-item')}>
                                        <span className={cx('mobile-navbar_item-link')}>Top Rated</span>           
                                    </div>
                                    <div className={cx('mobile-subnav-item')}>
                                        <span className={cx('mobile-navbar_item-link')}>Watch Lists</span>                      
                                    </div>
                                    <div className={cx('mobile-subnav-item')}>
                                        <span className={cx('mobile-navbar_item-link')}>Actors</span>                                     
                                    </div>
                                    <div className={cx('mobile-subnav-item')}>
                                        <span className={cx('mobile-navbar_item-link')}>Anime</span>
                                    </div>
                                    <div className={cx('mobile-subnav-item')}>
                                        <span className={cx('mobile-navbar_item-link')}>TV Shows</span>
                                    </div>
                                    <div className={cx('mobile-subnav-item')}>
                                        <span className={cx('mobile-navbar_item-link')}>Support</span>
                                    </div>
                                    <div className={cx('mobile-subnav-item')}>
                                        <span className={cx('mobile-navbar_item-link')}>Coming Soon</span>
                                    </div>
                                </div>
                            </>

                        )}
                    >
                        <button className={cx('menu_mobile-btn')} onClick={handleMenuMobile}>
                            <AiOutlineMenu className={cx('menu_mobile-icon')}/>
                        </button>
                    </HeadlessTippy>                
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
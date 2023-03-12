import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import {AiOutlineCaretUp, AiFillCaretDown, AiOutlineMenu} from 'react-icons/ai'
import { useAuth } from "~/Context/AuthContext";


import styles from './Header.module.scss';
import Search from '../Search/Search';
import { Link, useNavigate } from 'react-router-dom';


const cx = classNames.bind(styles)


function Header({className}) {
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()
    const user = currentUser
    // const watchlistUrl = `/watchlist/${user.uid}`

    async function handleLogout() {
        try {
            await logout()
            navigate('/free-search-movie')
        } catch (error) {
            console.log("Fail to logout");
        }
    }

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

    // Handle
    const handleMenuMobile = () => {
        if (menuMobile === false) {
            setMenuMobile(true)
            Object.assign(menuMobileRef.current.style, {
                height: '200px',
            })
        } else {
            setMenuMobile(false)
            Object.assign(menuMobileRef.current.style, {
                height: '0px',
            })
        }
    }

    const handleWatchlist = () => {
        if (currentUser) {
            navigate(`/watchlist/${user.uid}`)
        } else {
            alert("Please sign in first")
        }
    }

   const handleHomepage = () => {
        navigate('/free-search-movie')
   }

    const wrapper = cx('wrapper')
    const wrapperWithBackground = cx('wrapper', 'show')

    return (
        <div id='header' className={background ? wrapperWithBackground : wrapper }>
                <div className={cx('left')}>
                    <ul className={cx('navbar_list-left', 'navbar-list')} >
                        <li onClick={handleHomepage} className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                            <span className={cx('navbar_item-link')}>Home</span>
                        </li>
                        <li onClick={handleWatchlist} className={cx('navbar_item-left', 'navbar_item', 'hover-underline-animation')}>
                            <span className={cx('navbar_item-link')}>Watch Lists</span>
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
                                <span href='' className={cx('navbar_item-link', 'option-m')}>
                                    More
                                    <AiFillCaretDown className={cx('down-icon')}/>
                                </span>
                            </li>
                        </HeadlessTippy>
                    </ul>
                    <button className={cx('menu_mobile-btn')} onClick={handleMenuMobile}>
                        <AiOutlineMenu className={cx('menu_mobile-icon')}/>
                    </button>
                </div>
                <div className={cx('right')}>
                    <Search/>
                    {currentUser 
                        ? 
                            <HeadlessTippy         
                                // visible                                          
                                interactive                       
                                offset={[0, 2]}             
                                placement='bottom-end'
                                render={attrs => (
                                    <>
                                        <div className={cx('account-options')} tabIndex="-1" {...attrs}>
                                            <div onClick={handleLogout} className={cx('account-option-link')}>
                                                <span>Log out</span>
                                            </div>
                                        </div>                                 
                                    </>
                                )}
                            >
                                <div className={cx('user-wrapper')}>
                                    <span className={cx('user-name')}>{user.displayName}</span>
                                </div>
                            </HeadlessTippy>                        
                        : 
                            <Link to='/register' className={cx('register-button')}>
                                <span className={cx('register-text')}>Sign in</span>
                            </Link>
                    } 
                </div>
                <div className={cx('menu-mobile', 'grid')} ref={menuMobileRef}>
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
        </div> 
    );
}

export default Header;
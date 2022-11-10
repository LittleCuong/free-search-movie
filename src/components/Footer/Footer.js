import { FaPhone, FaMailBulk, FaFacebook, FaTwitterSquare, FaInstagram, FaTiktok } from "react-icons/fa";
import classNames from "classnames/bind";
import styles from './Footer.module.scss';


const cx = classNames.bind(styles)

function Footer() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('grid wide')}>
                <div className={cx('wrapper_information row no-gutters')}>
                    <div className={cx('wrapper_information-col col l-2-4 m-4 c-4')}>
                        <span className={cx('wrapper_information-item-title')}>The Basics</span>                  
                        <span className={cx('wrapper_information-item')}>FAQ</span>
                        <span className={cx('wrapper_information-item')}>Premium</span>
                        <span className={cx('wrapper_information-item')}>About us</span>
                    </div>
                    <div className={cx('wrapper_information-col col l-2-4 m-4 c-4')}>
                        <span className={cx('wrapper_information-item-title')}>Legal</span>                  
                        <span className={cx('wrapper_information-item')}>Contact us</span>
                        <span className={cx('wrapper_information-item')}>Term of services</span>
                        <span className={cx('wrapper_information-item')}>Privacy Policy</span>
                    </div>
                    <div className={cx('wrapper_information-col col l-2-4 m-4 c-4')}>
                        <span className={cx('wrapper_information-item-title')}>Features</span>                  
                        <span className={cx('wrapper_information-item')}>Top IMDB</span>
                        <span className={cx('wrapper_information-item')}>Recent Release</span>
                        <span className={cx('wrapper_information-item')}>Donate</span>
                    </div>
                </div>
                <div className={cx('wrapper_information-social')}>
                    <span className={cx('wrapper_information-social--contact')}>
                        <FaPhone className={cx('wrapper_information-social--contact-icon')}/>
                        0913135854
                    </span>
                    <span className={cx('wrapper_information-social--contact')}>
                        <FaMailBulk className={cx('wrapper_information-social--contact-icon')}/>
                        littlecuong922@gmail.com
                    </span>
                    <div className={cx('wrapper_information-social-container')}>
                        <a href='https://www.facebook.com/profile.php?id=100009057145047' className={cx('social_icon-wrapper')}>
                            <FaFacebook className={cx('wrapper_information-social-icon')}/>
                        </a>
                        <a href='' className={cx('social_icon-wrapper')}>
                            <FaInstagram className={cx('wrapper_information-social-icon')}/>                        
                        </a>
                        <a href='' className={cx('social_icon-wrapper')}>
                            <FaTwitterSquare className={cx('wrapper_information-social-icon')}/>                     
                        </a>
                        <a href='' className={cx('social_icon-wrapper')}>
                            <FaTiktok className={cx('wrapper_information-social-icon')}/>                     
                        </a>
                    </div>
                </div>
                <span className={cx('wrapper_information-copyright')}>
                    Copyright @2022 | Designed With ReactJS by CNG
                </span>
            </div>       
        </div>
    );
}
    
export default Footer;
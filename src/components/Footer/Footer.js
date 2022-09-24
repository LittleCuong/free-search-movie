import classNames from "classnames/bind";
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('information')}>
                <div className={cx('information-col')}>
                    <span className={cx('information-item')}>FAQ</span>
                    <span className={cx('information-item')}>Premium</span>
                    <span className={cx('information-item')}>About us</span>
                </div>
                <div className={cx('information-col')}>
                    <span className={cx('information-item')}>Contact us</span>
                    <span className={cx('information-item')}>Term of services</span>
                    <span className={cx('information-item')}>Privacy Policy</span>
                </div>
                <div className={cx('information-col')}>
                    <span className={cx('information-item')}>Top IMDB</span>
                    <span className={cx('information-item')}>Recent Release</span>
                    <span className={cx('information-item')}>Donate</span>
                </div>
            </div>
        </div>
    );
}
    
export default Footer;
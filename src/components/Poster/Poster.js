import classNames from "classnames/bind";
import styles from './Poster.module.scss';

const cx = classNames.bind(styles)

function Poster() {
    return ( 
        <img 
            className={cx('poster')}     
            src="https://static.ssphim.net/static/5fe2d564b3fa6403ffa11d1c/5fe2d564b3fa649cf7a129b2_transfomers-the-last-knight-1.jpg" 
            alt="Video"
        />
     );
}

export default Poster

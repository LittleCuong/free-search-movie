import styles from './WatchlistItem.module.scss'
import classNames from 'classnames/bind';
import apiConfig from "~/api/apiConfig";

const cx = classNames.bind(styles)

function WatchlistItem(props) {
    const item = props.item

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-image')}>
                <div className={cx('wrapper-img-link')}>
                    <img  
                        className={cx('img')}                             
                        src={apiConfig.w500Image(item.poster_path)}
                        alt="movie"                         
                    />
                </div>    
            </div> 
            <div className={cx('wrapper-content')}>
                <span className={cx('wrapper-content-name')}>{item.title}</span>
            </div>
        </div>
    );
}

export default WatchlistItem;
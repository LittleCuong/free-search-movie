import classNames from 'classnames/bind';
import styles from './Similar.module.scss'

const cx = classNames.bind(styles)

function Similar(props) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('image-card')}>
                <img 
                    className={cx('image')}
                    // src={IMAGE_API + data.poster_path}
                />
            </div>  
            <div className={cx('movie-infor')}>
                <span className={cx('movie-name')}>
                    {/* {data.title} */}
                </span>
            </div>
        </div>
    );
}

export default Similar;
;
import classNames from 'classnames/bind';
import styles from './ItemResults.module.scss'
import { Link } from 'react-router-dom';
import {category} from "~/api/tmdbApi";
import apiConfig from '~/api/apiConfig';

const cx = classNames.bind(styles)

const IMAGE_API = 'https://image.tmdb.org/t/p/w1280'

function ItemResutls(props) {
    const item = props.data

    // media_type tuong ung voi category
    const link = '/' + category[item.media_type] + '/' + item.id;

    return (
        <Link to={link} className={cx('wrapper')}>
            <img 
                className={cx('image')}
                src={IMAGE_API + item.poster_path}
                alt={item.title}              
            />
            <span className={cx('movie-name')}>{item.original_title}</span>          
        </Link >
    );
}

export default ItemResutls;
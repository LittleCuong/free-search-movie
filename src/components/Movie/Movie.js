import classNames from 'classnames/bind';
import tmdApi, { category } from '~/api/tmdbApi';
import { Link, useParams } from 'react-router-dom';
import styles from './Movie.module.scss'
import { memo } from 'react';

const cx = classNames.bind(styles)
const IMAGE_API = 'https://image.tmdb.org/t/p/w1280';

function Movie({data}) {
    
    const link = '/movie' + '/' + data.id;

    return ( 
        <Link to={link} className={cx('wrapper', 'col l-2 m-4 c-4')}>
            <div className={cx('image-card')}>
                <img 
                    className={cx('image')}
                    src={IMAGE_API + data.poster_path}
                    alt={data.title}
                />
            </div>  
            <div className={cx('movie-infor')}>
                <span className={cx('movie-name')}>{data.title}</span>
            </div>
        </Link>
    );
}

export default memo(Movie);
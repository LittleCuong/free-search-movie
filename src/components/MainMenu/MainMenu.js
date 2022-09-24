import classNames from "classnames/bind";
import MovieList from "../MenuItem/MovieList";
import styles from './MainMenu.module.scss';

import {category, movieType, tvType} from '~/api/tmdbApi'

const cx = classNames.bind(styles)

function MainMenu() {
    return ( 
        <div className={cx('wrapper')}>
            <MovieList category={category.movie} type={movieType.upcoming}/>
            <MovieList category={category.movie} type={movieType.popular}/>
            <MovieList category={category.movie} type={movieType.top_rated}/>
        </div>
    );
}

export default MainMenu;
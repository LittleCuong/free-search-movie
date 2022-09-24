import tmdApi, { category } from "~/api/tmdbApi";
import classNames from "classnames/bind";
import styles from './HeaderMovie.module.scss';
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const cx = classNames.bind(styles)

function HeaderMovie(props) {
    var type = ''
    if (props.type === 'popular') {
        type = 'Popular'
    } else if (props.type === 'top_rated') {
        type = 'Top Rated'
    } else if (props.type === 'upcoming'){
        type = 'Upcoming'
    } else {
        type = 'Similar'
    }



    return ( 
        <header className={cx('header')}>{type}</header>
    );
}

export default HeaderMovie;
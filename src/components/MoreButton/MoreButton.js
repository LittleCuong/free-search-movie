import classNames from "classnames/bind";
import styles from './MoreButton.module.scss';
import { Link } from "react-router-dom";
import MoviesType from "~/pages/MoviesType";

var moreLink = null
const cx = classNames.bind(styles)

function MoreButton(props) {
    moreLink = `/${props.type}`

    return ( 
        <Link to={moreLink}>
            <span className={cx('more')}>See more</span>
        </Link>                  
    );
}

export default MoreButton;
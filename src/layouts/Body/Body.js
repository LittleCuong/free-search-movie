import classNames from "classnames/bind";
import styles from './Body.module.scss';
import Videos  from "~/components/Videos/Videos.js";
import {FaGooglePlay} from 'react-icons/fa'
import Poster from "~/components/Poster/Poster";
import Billboard from "~/components/Billboard/Billboard";
import MainMenu from "~/components/MainMenu/MainMenu";



const cx = classNames.bind(styles)

function Body() {
    return (
        <div className={cx('wrapper')}>
            <Billboard/>
            <MainMenu/>
        </div>             
    );
}

export default Body;

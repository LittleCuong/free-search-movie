import classNames from "classnames/bind";
import styles from './Body.module.scss';
import Billboard from "~/components/Billboard/Billboard";
import MainMenu from "~/components/MainMenu/MainMenu";
import grid from '~/assets/GridSystem/grid.css'



const cx = classNames.bind(styles)

function Body() {
    return (
        <div className={cx('wrapper', 'grid')}>
            <Billboard/>
            <MainMenu/>
        </div>             
    );
}

export default Body;

import classNames from "classnames/bind";
import { FaPlay } from "react-icons/fa";
import {category} from "~/api/tmdbApi";
import apiConfig from "~/api/apiConfig";

import styles from './MovieItem.module.scss';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function MovieItem(props) {
    const item = props.item
    const link = '/' + category[props.category] + '/' + item.id;

    return (  
            <Link 
                to={link}
                className={cx('wrapper')}               
            >                  
                <div className={cx('image')}>
                    <div className={cx('img-link')}>
                        <img  
                            className={cx('img')}                             
                            src={apiConfig.w500Image(item.poster_path)}
                            alt="Propose"                         
                        />
                        <div className={cx('play')}>
                            <FaPlay className={cx('play-icon')}/>
                        </div>
                    </div>                                      
                </div> 
                <div className={cx('content')}>
                    <div href='/' className={cx('name')}>
                        {item.title}                         
                    </div>    
                </div>
            </Link>          
     );
}

export default MovieItem;
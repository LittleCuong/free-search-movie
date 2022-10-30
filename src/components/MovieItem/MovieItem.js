import classNames from "classnames/bind";
import { db } from "~/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import {category} from "~/api/tmdbApi";
import { useAuth } from "~/Context/AuthContext";
import apiConfig from "~/api/apiConfig";
import HeadlessTippy from '@tippyjs/react/headless';
import { FaPlay } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import styles from './MovieItem.module.scss';
import { useState } from "react";


const cx = classNames.bind(styles)

function MovieItem(props) {
    const { currentUser, watchlist } = useAuth()

    const item = props.item
    const link = '/' + category[props.category] + '/' + item.id;

    // check trong watchlist co bao gom movie add hau khong
    const inWatchList = watchlist.includes(item.id)

    const handleAddMovie = async () => {
        const movieRef = doc(db, "watchlist", currentUser.uid)
        try {
            await setDoc(movieRef, 
                // trong watchlist co movie thi push them vao
                {movie: watchlist ? [...watchlist, item.id] : [item.id]},
            )
            alert(`${item.title} added to Watchlist!`)
        } catch (error) {
            alert(`${item.title} fail to added to Watchlist!`)
        }
    }

    const handleRemoveMovie = async () => {
        const movieRef = doc(db, "watchlist", currentUser.uid)
        try {
            await setDoc(movieRef, 
                // remove movie co id khac voi movie con lai trong watchlist
                {movie: watchlist.filter((watch) => watch !== item.id)},
                {merge: "true"}
            )
            alert(`${item.title} removed from Watchlist!`)
        } catch (error) {
            alert(`${item.title} fail to removed from Watchlist!`)
        }
    }

    return (  
        <div className={cx('wrapper')}>
            <Link 
                to={link}
                className={cx('wrapper-link')}               
            >                  
                <div className={cx('image')}>
                    <div className={cx('img-link')}>
                        <img  
                            className={cx('img')}                             
                            src={apiConfig.w500Image(item.poster_path)}
                            alt="movie"                         
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
            {currentUser && (
                <HeadlessTippy         
                    // visible                                          
                    interactive                       
                    offset={[0, 2]}             
                    placement='bottom-end'
                    render={attrs => (
                        <>
                            <div className={cx('options')} tabIndex="-1" {...attrs}>
                                <div 
                                    className={cx('option-item')}                                  
                                    onClick={inWatchList ? handleRemoveMovie : handleAddMovie}
                                >
                                    <span 
                                        className={cx('option-item_span')}
                                    >
                                        {inWatchList ? "Remove" : "Add to Watchlist"}
                                    </span>
                                </div>
                            </div>                                 
                        </>
                    )}
                >
                    <button className={cx('more-button')}>
                        <FiMoreHorizontal className={cx('more-icon')}/>
                    </button>
                </HeadlessTippy>                  
            )} 
        </div>         
     );
}

export default MovieItem;
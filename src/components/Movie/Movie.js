import classNames from 'classnames/bind';
import { db } from "~/firebase";
import { Link} from 'react-router-dom';
import styles from './Movie.module.scss'
import { memo } from 'react';
import { useAuth } from "~/Context/AuthContext";
import { FiMoreHorizontal } from "react-icons/fi";
import { setDoc, doc } from "firebase/firestore";
import HeadlessTippy from '@tippyjs/react/headless';


const cx = classNames.bind(styles)
const IMAGE_API = 'https://image.tmdb.org/t/p/w1280';

function Movie({data}) {
    const { currentUser, watchlist } = useAuth()
    
    const link = '/movie' + '/' + data.id;

    const imageUrl = 'https://image.tmdb.org/t/p/w1280' + data.poster_path

    const poster = {
        backgroundImage: 'url(' + imageUrl + ')',
    }

    const inWatchList = watchlist.includes(data.id)

    const handleAddMovie = async () => {
        const movieRef = doc(db, "watchlist", currentUser.uid)

        if (!inWatchList) {
            try {
                await setDoc(movieRef, 
                    // trong watchlist co movie thi push them vao
                    {movie: watchlist ? [...watchlist, data.id] : [data.id]}
                )
                alert(`${data.title} added to Watchlist!`)
            } catch (error) {
                alert(`${data.title} fail to added to Watchlist!`)
            }
        } else {
            console.log("Failed");
        }
        
    }

    const handleRemoveMovie = async () => {
        const movieRef = doc(db, "watchlist", currentUser.uid)
        try {
            await setDoc(movieRef, 
                // remove movie co id khac voi movie con lai trong watchlist
                {movie: watchlist.filter((watch) => watch !== data.id)},
                {merge: "true"}
            )
            alert(`${data.title} removed from Watchlist!`)
        } catch (error) {
            alert(`${data.title} fail to removed from Watchlist!`)
        }
    }

    return ( 
        <div className={cx('wrapper', 'col l-2-4 m-4 c-6')}>
            <Link to={link} className={cx('wrapper-link')}>
                <div 
                    className={cx('image-card')}
                >
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
            <div className={cx('button-wrapper')}>
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
                                        onClick={ inWatchList ? handleRemoveMovie : handleAddMovie }
                                    >
                                        <span 
                                            className={cx('option-item_span')}
                                        >
                                            { inWatchList ? "Remove" : "Add to Watchlist" }
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
        </div>
    );
}

export default memo(Movie);
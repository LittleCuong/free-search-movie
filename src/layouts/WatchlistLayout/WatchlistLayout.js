import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Header from "../Header/Header";
import styles from './WatchlistLayout.module.scss'
import Movie from '~/components/Movie/Movie';
import Footer from "~/components/Footer/Footer";
import { useAuth } from "~/Context/AuthContext";
import axios from "axios";

const cx = classNames.bind(styles)

function WatchlistLayout() {
    const { watchlist, currentUser } = useAuth()
    
    const name = currentUser.displayName.split('')[0]
    const [movies, setMovies] = useState([])
           
    useEffect(() => {    
        const getId = async () => {
            const promises = watchlist.map(async (id) => {
                return await axios({
                    method: "get",
                    baseURL: "http://api.themoviedb.org",
                    url: `/3/movie/${id}`,
                    params: {
                        api_key: "973d45784769b5e834721b303dbfc386",
                        language: "en-US"
                    }
                })
            })
            try {
                const result = await Promise.all(promises)           
                setMovies(result.map(item => item.data))
            } catch (err) {
                console.log(err)
            }
        }
        getId()
    }, [watchlist])

    

    return ( 
        <div className={cx('wrapper', 'grid')}>
            <Header/>
            <div className={cx('wrapper_body', 'grid')}>
                <div className={cx('wrapper_body-background')}>
                    <div className={cx('wrapper_body-infor')}>
                        <span className={cx('wrapper_body-infor--name')}>{name}</span>
                        <div className={cx('wrapper_body-infor--about')}>
                            <span className={cx('about-name')}>{currentUser.displayName}</span>
                            <span className={cx('about-number')}>{watchlist.length + " movies have added"}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper_body-content', 'grid wide')}>
                    <div className={cx('wrapper_body-content-list','row')}>
                        {movies.map(movie => (
                            <Movie
                                key={movie.id}
                                data={movie}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default WatchlistLayout;
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import styles from './DetailsLayout.module.scss'

import tmdApi, { movieType } from "~/api/tmdbApi";
import apiConfig from "~/api/apiConfig";
import { useState, useEffect } from "react";
import Credits from "~/components/Credits/Credits";
import Trailer from "~/components/Trailer/Trailer";
import MovieList from "~/components/MenuItem/MovieList";
import Footer from "~/components/Footer/Footer";

const cx = classNames.bind(styles)

function DetailsLayout() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    
    const {category, id} = useParams();

    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdApi.detail(category, id, {params: {}})
            setMovie(response);
        }
        getDetail()
    }, [category, id])

    return ( 
        <>
            {
                movie && (
                    <>
                        <Header/>
                        <div 
                            className={cx('banner')}
                            style={{backgroundImage: `url(${apiConfig.originalImage(movie.poster_path)})`}}
                        >                      
                        </div>
                        <div className={cx('container', 'grid')}>
                            <div className={cx('container-header')}>
                                <div className={cx('container-heading', 'row')}>
                                    <img
                                        className={cx('image')}
                                        src={apiConfig.w500Image(movie.poster_path)}
                                        alt={movie.title}
                                    />
                                    <div className={cx('movie-information')}>
                                        <h3 className={cx('movie-name')}>{movie.title}</h3>
                                        <div className={cx('movie-genres')}>
                                        {movie.genres && movie.genres.map((genre, index) => (
                                                <span 
                                                    className={cx('genres')}
                                                    key={index} 
                                                >
                                                    {genre.name}
                                                </span>
                                        ))}
                                        </div>
                                        <p className={cx('movie-overview')}>
                                            {movie.overview}
                                        </p>
                                        <div className={cx('movie-casts')}>
                                            <h3>Casts</h3>
                                            <Credits data={movie.id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('container-body', 'row')}>
                                <Trailer data={movie.id}/>            
                            </div>
                            <div className={cx('container-similar', 'row')}>
                                <MovieList category={category} type={'similar'} id={movie.id}/>
                            </div>
                        </div>                      
                        <Footer/>                                  
                    </>
                )
            }
        </>
    );
}

export default DetailsLayout;
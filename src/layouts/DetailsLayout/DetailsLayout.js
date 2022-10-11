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
                    <div className={cx('wrapper', 'grid')}>
                        <Header/>
                        <div className={cx('container_banner')} style={{backgroundImage: `url(${apiConfig.originalImage(movie.poster_path)})`}}>
                            </div>
                        <div className={cx('container')}>
                            <div className={cx('container_movie', 'grid wide')}>
                                <div className={cx('container_movie-header', 'row no-gutters')}>
                                    <img
                                        className={cx('container_movie-header--image', 'col l-3 m-3')}
                                        src={apiConfig.w500Image(movie.poster_path)}
                                        alt={movie.title}
                                    />
                                    <div className={cx('container_movie-header--movie', 'col l-9 m-9')}>
                                        <div className={cx('container_movie-header--movie_wrapper')}>
                                            <h3 className={cx('movie_name')}>{movie.title}</h3>
                                            <div className={cx('movie_genres')}>
                                                {movie.genres && movie.genres.map((genre, index) => (
                                                    <span 
                                                        className={cx('genres')}
                                                        key={index} 
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className={cx('movies_overview')}>
                                                {movie.overview}
                                            </span>
                                            <div className={cx('movie_credit')}>
                                                <h4>Cast</h4>
                                                <Credits data={movie.id}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('container_movie-body', 'row')}>
                                    <Trailer data={movie.id}/> 
                                </div>
                            </div>
                        </div>
                        <Footer/>                                  
                    </div>
                )
            }
        </>
    );
}


{/*
    <div 
        className={cx('banner')}
        style={{backgroundImage: `url(${apiConfig.originalImage(movie.poster_path)})`}}
    </div>

    <img
        className={cx('image', 'col l-3 m-3')}
        src={apiConfig.w500Image(movie.poster_path)}
        alt={movie.title}
    />

    {movie.genres && movie.genres.map((genre, index) => (
        <span 
            className={cx('genres')}
            key={index} 
        >
            {genre.name}
        </span>
    ))}

    <Credits data={movie.id}/>
    
    <Trailer data={movie.id}/>            

    <MovieList category={category} type={'similar'} id={movie.id}/>
>   */}
export default DetailsLayout;
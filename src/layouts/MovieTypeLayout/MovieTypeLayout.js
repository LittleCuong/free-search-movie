import { useEffect, useState, memo, useRef } from 'react';
import classNames from 'classnames/bind';
import {FaAngleDown, FaPlus} from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import tmdApi from "~/api/tmdbApi";
import Header from '~/layouts/Header/Header.js';
import styles from './MovieTypeLayout.module.scss'
import Movie from '~/components/Movie/Movie';
import GridStyle from '~/components/GridSystem/GridStyle';

import HeadlessTippy from '@tippyjs/react/headless';
import Footer from '~/components/Footer/Footer';

const cx = classNames.bind(styles)

function MovieTypeLayout(props) {
    // window.scrollTo(0,0)

    // Variables 
    var title = ''

    // type tu tren URL
    const { type } = useParams()
    console.log(type);
    // ref
    const containerRef = useRef()

    // useState
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [page, setPage] = useState([])
    const [totalPage, setTotalPage] = useState([])

    // useEffect
    useEffect(() => {       
            const getMovies = async () => {
                const params = {}
                const response = await tmdApi.getMovieList(type, {params});
                setMovies(response.results) 
                setPage(response.page)
                setTotalPage(response.total_pages)
            }
            getMovies()
        

        const getGenres = async () => {
            const params = {}
            const res = await tmdApi.genres({params});
            setGenres(res.genres)
        }
        getGenres()
    }, [type])

    // Headers 
    if (type === 'popular') {
        title = 'Popular'
    } else if (type === 'top_rated') {
        title = 'Top Rated'
    } else if (type === 'upcoming'){
        title = 'Upcoming'
    } else {
        title = 'Similar'
    }

    // Handle click
    const sortByPopularAscending = () => {
        // sortedMovies la copy array cua state movies
        const sortedMovies = [...movies].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1)
        setMovies(sortedMovies)
    }

    const sortByPopularDescending = () => {
        const sortedMovies = [...movies].sort((a, b) => (a.vote_average > b.vote_average) ? 1 : -1)
        setMovies(sortedMovies)
    }

    const sortTitleAccesding = () => { 
        const sortedMovies = [...movies].sort((a, b) => (a.title > b.title) ? 1 : -1)
        setMovies(sortedMovies)
    }

    const sortTitleDescending = () => {
        const sortedMovies = [...movies].sort((a, b) => (a.title < b.title) ? 1 : -1)
        setMovies(sortedMovies)
    }

    const handleGenre = (data) => {
        const getMovie = async () => {
            const params= {}
            const response = await tmdApi.discover(data, {params});
            console.log(response.results);
            setMovies(response.results)
        }
        getMovie()
    }

    const loadMore = async () => {
        
        const params = {
            page: page + 1
        }
        const response = await tmdApi.getMovieList(type, {params})
        setMovies([...movies, ...response.results])
        setPage(page + 1)
        
        const containerHeight = containerRef.current.offsetHeight
        containerRef.current.style.height = containerHeight + 720 + 'px';
    }

    return (
        <div className={cx('wrapper', 'grid')}>
            <Header className={cx('propose-header')}/>
            <div className={cx('wrapper-body', 'grid')}>
                <div ref={containerRef} className={cx('container', 'row no-gutters')}>
                    <div className={cx('container-filters', 'col l-2')}>
                        <h3 className={cx('container-header')}>{title}</h3>
                        <div className={cx('filter-sort')}>
                            <HeadlessTippy
                                interactive
                                // visible
                                inertia={true}
                                moveTransition='all 0.6s'
                                render={attrs => (                                    
                                    <div className={cx('filter-options')} tabIndex="-1" {...attrs}>                                  
                                        <button className={cx('filter-options-btn')} onClick={sortByPopularAscending}>
                                            <span>Popular Ascending</span>
                                        </button>
                                        <button className={cx('filter-options-btn')} onClick={sortByPopularDescending}>
                                            <span>Popular Descending</span>
                                        </button>
                                        <button className={cx('filter-options-btn')} onClick={sortTitleAccesding}>
                                            <span>Title (A-Z)</span>
                                        </button>
                                        <button className={cx('filter-options-btn')} onClick={sortTitleDescending}>
                                            <span>Title (Z-A)</span>
                                        </button>
                                    </div>                                       
                                )}
                                >
                                    <button className={cx('sort-btn')}>
                                        <span>Sort results by</span>
                                        <FaAngleDown className={cx('angle-down')}/>
                                    </button>
                            </HeadlessTippy>      
                        </div>
                        <div className={cx('filter-genre')}>
                            <HeadlessTippy
                                interactive
                                inertia={true}
                                moveTransition='all 0.6s'
                                render={attrs => (                                    
                                    <div className={cx('filter-options')} tabIndex="-1" {...attrs}>                                                             
                                        {genres.map(genre => (
                                            <button 
                                                onClick={e => {handleGenre(genre.id)}}
                                                key={genre.id}
                                                data={genre} 
                                                className={cx('filter-options-btn')}
                                            >
                                                <span>{genre.name}</span>
                                            </button>
                                        ))}
                                    </div>                                       
                                )}
                            >
                                <button className={cx('sort-btn')}>
                                    <span>Genres</span>
                                    <FaAngleDown className={cx('angle-down')}/>
                                </button>
                            </HeadlessTippy>
                        </div>
                    </div>
                    <div className={cx('container-content', 'col l-10 m-12 c-12')}>
                        <div className={cx('movies-list', 'row sm-gutter')}>                                                                                                         
                            {movies.map(movie => (
                                <Movie key={movie.id} data={movie}/>
                            ))}                    
                        </div>
                    </div>                
                </div>
                {
                    page < totalPage ? (
                        <span className={cx('more-button')} onClick={loadMore}>
                            See more
                        </span>
                    ) : null
                }  
            </div>
            <Footer/>
        </div> 
    )
}

export default memo(MovieTypeLayout);


// 

{/* 
<div className={cx('grid')}>
                <div className={cx('wrapper-content', 'row no-gutters')}>
                    <div className={cx('wrapper-content-filter','col l-2')}></div>
                    <div className={cx('wrapper-content-body','col l-10')}>
                        {/* <div className={cx('row sm-gutter')}></div> 
                        </div>
                        </div>
                    </div>

 */}

// 
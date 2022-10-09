import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import classNames from "classnames/bind";
import styles from './MovieList.module.scss';
import tmdApi, { category } from "~/api/tmdbApi";
import HeaderMovie from "../HeaderMovie/HeaderMovie";
import MovieItem from "../MovieItem/MovieItem";
import MoreButton from "../MoreButton/MoreButton";

const cx = classNames.bind(styles)

function MovieList(props) {

    // useState
    const [results, setResults] = useState([])

    useEffect(() => {
        const getPropose = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdApi.getMovieList(props.type, {params});
                        break;
                    case category.tv:
                        response = await tmdApi.getTvList(props.type, {params});
                        break;
                } 
            } else {
                response = await tmdApi.similar(props.category, props.id)
            }

            setResults(response.results)
        }
        getPropose()
    }, [props.category, props.id, props.type])

    //Get first 10 movies
    const movieResutls = results.slice(0, 10)

    return ( 
        <div className={cx('wrapper', 'grid wide')}>
                <HeaderMovie type={props.type}/>
                <div className={cx('movie-list')}>
                    <div className={cx('movie-container')}>
                        {movieResutls.map((result, index) => (                 
                            <MovieItem 
                                index={index} 
                                key={result.id} 
                                category={props.category}
                                item={result}                                                          
                            />                   
                        ))}
                    </div>
                </div>       
                {props.type !== 'similar' ? (
                    <MoreButton category={props.category} type={props.type} id={props.id}/>
                ) : undefined}                    
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList;
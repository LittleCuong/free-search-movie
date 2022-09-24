import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import styles from './DiscoverItem.module.scss';
import { FaPlay, FaPlus} from "react-icons/fa";
import {AiOutlineClose} from 'react-icons/ai'
import axios from "axios";


const cx = classNames.bind(styles)
const IMAGE_API = 'https://image.tmdb.org/t/p/w1280';
const YOUTUBE_API = 'https://www.youtube.com/embed/';

function DiscoverItem({data}) {
    var key = ''
    var genre = ''
    var duration = ''
    const ITEM_API = `https://api.themoviedb.org/3/movie/${data.id}?api_key=973d45784769b5e834721b303dbfc386&append_to_response=videos,genres`

    // useState
    const [video, setVideo] = useState([])
    const [genres, setGenres] = useState([])
    const [runtime, setRuntime] = useState('')

    const [isHovering, setIsHovering] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        axios
            .get(ITEM_API)
            .then(res => {
                setGenres(res.data.genres)
                setVideo(res.data.videos.results)   
                setRuntime(res.data.runtime)
            })
            .catch(error => {
                console.log(error);
            }) 
    }, [ITEM_API])   

    // get type = "Trailer" from api
    video.find(item => {
        if (item.type === "Trailer") {
            key = item.key
        }
    })

    const link = YOUTUBE_API + key

    duration = runtime

    // map qua từng genres lấy ra name
    genres.map(item => {
        genre = item.name
    })

    // handle
    const onClick = () => {
        if (openModal === false) {
            setOpenModal(true)
        }
    }
    
    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleClickOutSideModal = () => {
        setOpenModal(false)
    }

    // handle
     
    
    return ( 
        // <Link to={`/@${data.title}`} className={cx('wrapper')}> 
        <div className={cx('wrapper')} onClick={onClick}>                       
                <div className={cx('image')}>
                    <div className={cx('img-link')} >
                        <img  
                            className={cx('img')}                             
                            src={IMAGE_API + data.poster_path}
                            alt="Popular"
                        />
                        <div className={cx('play')}>
                            <FaPlay className={cx('play-icon')}/>
                        </div>
                    </div>                 
                </div> 
                <div className={cx('content')} onClick={onClick}>
                    <div href='/' className={cx('name')}>
                        {data.title}                         
                    </div>    
                </div>
                {openModal && (
                    <div className={cx('modal')}>
                        <div className={cx('modal-container')}>
                            <div className={cx('modal-trailer')} >
                               <iframe className={cx('modal-iframe')}
                                    title={data.name}
                                    src={link}>
                                </iframe>
                            </div>
                            <div className={cx('modal-information')}>
                                <div className={cx('modal-infor--heading')}>
                                    <h3 className={cx('header')}>{data.title}</h3>
                                    <div className={cx('fact')}>
                                        <button className={cx('fact-genre')}>
                                            {genres.map(genre => (
                                                <a key={genre.id} className={cx('fact-genre-link')}>{genre.name}</a>
                                            ))}
                                        </button>
                                            <span className={cx('fact-runtime')}>{duration}m</span>
                                    </div>
                                </div>
                                <div className={cx('modal-information-body')}>
                                    <span className={cx('release')}>Release date: {data.release_date}</span>
                                    <div className={cx('overview')}>
                                        <span className={cx('overview-header')}>Overview</span>
                                        <span className={cx('overview-content')}>{data.overview}</span>
                                    </div>
                                </div>                                                           
                            </div>
                            <div className={cx('modal-button')}>
                                <button className={cx('add-button')}>
                                    <FaPlus/>
                                    <span>Add to watchlist</span>
                                </button>
                            </div>
                            <AiOutlineClose 
                                onClick={handleCloseModal}                                
                                className={cx('modal-close')}
                            />
                        </div>
                    </div>
                )}
            </div>  
    );
}

export default DiscoverItem;
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from './Billboard.module.scss';
import {FaGooglePlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import video from '~/assets/videos/transformer.mp4'
import Videos from "../Videos/Videos";

const cx = classNames.bind(styles)

function Billboard() {
    // useState

    // useRef
    const billboardRef = useRef()
    const posterRef = useRef()
    const videoRef = useRef()
    const playRef = useRef()
    const pauseRef = useRef()
    const soundOnRef = useRef()
    const soundOffRef = useRef()

    useEffect(() => {
        window.addEventListener('scroll' ,(e) => {
            const position = window.scrollY;
            if (position < 400) {
                if (videoRef.current?.play()) {
                    pauseRef.current.style.display = 'block'
                }
            } else {
                if (videoRef.current?.pause()) {
                    pauseRef.current.style.display = 'none'
                }
            }
        })
    })

    const handleEnded = () => {
        videoRef.current.style.display = 'none'
        Object.assign(posterRef.current.style, {
            display: 'block'
        })
    }  

    const handlePlay = () => {
        videoRef.current?.play()
        pauseRef.current.style.display = 'block'
        videoRef.current.style.display = 'block'
        posterRef.current.style.display = 'none'       
    }
    
    const handlePause = () => {
        videoRef.current.pause()
        videoRef.current.muted = 'true'
        videoRef.current.style.display = 'none'
        pauseRef.current.style.display = 'none'
        soundOffRef.current.style.display = 'none'
        posterRef.current.style.display = 'block'
    }

    const handleSound = () => {      
        videoRef.current.muted = false
        soundOffRef.current.style.display = 'block'             
    }

    const handleSoundOff = () => {
        videoRef.current.muted = true
        soundOffRef.current.style.display = 'none'      
    }

    return ( 
        <div className={cx('wrapper', 'grid')}>
            <img 
                ref={posterRef}
                className={cx('billboard-main-poster')}     
                src="https://wallpaperaccess.com/full/3031452.jpg"
                alt="Video"
            /> 
            <div ref={billboardRef} className={cx('billboard')}>
                <img 
                    ref={posterRef}
                    className={cx('billboard-poster')}     
                    src="https://wallpaperaccess.com/full/3031452.jpg"
                    alt="Video"
                />            
                <div className={cx('billboard-trailer')}>             
                    <video      
                        ref={videoRef}                                   
                        muted={true}
                        poster="https://wallpaperaccess.com/full/3031452.jpg"
                        className={cx('billboard-video')}    
                        onEnded={handleEnded}
                        src={video}        
                    >         
                    </video>
                    <div className={cx('billboard-infor')}>
                        <h3 className={cx('movie-name')}>Transformers 5: The Last Knight</h3>
                        <div className={cx('infor')}>
                            <span className={cx('release')}>2017</span>
                            <span className={cx('divider')}></span>
                            <span className={cx('duration')}>2h35m</span>
                        </div>
                        <div className={cx('description')}>
                            <span className={cx('descrip-span')}>
                                Autobots and Decepticons are at war, with humans on the sidelines. Optimus Prime is gone. The key to saving our future lies buried in the secrets of the past, in the hidden history of Transformers on Earth.
                            </span>
                        </div>
                        <span className={cx('quote')}>For my world to live, yours must die</span>
                        <button 
                            ref={playRef} 
                            className={cx('play-btn')}
                            onClick={handlePlay}
                        >
                            <FaGooglePlay className={cx('toggle-play')}/>
                        </button>
                        <button
                            ref={pauseRef}
                            className={cx('pause-btn')}
                            onClick={handlePause}
                        >
                            <FaPause className={cx('toggle-pause')}/>
                        </button> 
                        <button 
                            ref={soundOnRef}
                            className={cx('sound-btn')}
                            onClick={handleSound}
                        >
                            <FaVolumeUp className={cx('toggle-sound')}/>
                        </button>
                        <button
                            ref={soundOffRef}
                            className={cx('sound-off-btn')}
                            onClick={handleSoundOff}
                        >
                            <FaVolumeMute className={cx('toggle-sound-off')}/>
                        </button>
                    </div>
                </div>               
            </div>
            {/* Mobile */}
            <div className={cx('billboard-content')}>

            </div>
        </div>
     );
}

export default Billboard;
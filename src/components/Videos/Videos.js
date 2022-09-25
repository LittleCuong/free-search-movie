import {useRef} from 'react'
import classNames from 'classnames/bind'
import styles from './Videos.module.scss'
import video from '~/assets/videos/transformer.mp4'
import Poster from '../Poster/Poster'

const cx = classNames.bind(styles)

function Videos({className}) {
    return  (<video           
                autoPlay
                controls
                muted
                poster='https://static.ssphim.net/static/5fe2d564b3fa6403ffa11d1c/5fe2d564b3fa649cf7a129b2_transfomers-the-last-knight-1.jpg'
                className={className}    
                // src={"." + video}        
                src="/cng-movie/static/media/transformer.083d2c098b565247dd74.mp4"     
            >         
            </video>)  

}
export default Videos;
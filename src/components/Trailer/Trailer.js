import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import tmdApi from "~/api/tmdbApi";
import styles from './Trailer.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function Trailer(props) {
    let key = ''
    const {category} = useParams()

    const [trailer, setTrailer] = useState([])

    useEffect(() => {
        const getTrailer = async () => {
            const response = await tmdApi.getVideos(category, props.data)
            setTrailer(response.results);
        }
        getTrailer()
    }, [category, props.data])

    trailer.find(item => {
        if (item.type === 'Trailer') {
            key = item.key
        }
        return key
    })

    return ( 
        <div className={cx('wrapper')}>
            <iframe
                className={cx('iframe')}
                src={`https://www.youtube.com/embed/${key}`}
                title="video"
            ></iframe>
        </div>
    );
}

export default Trailer;
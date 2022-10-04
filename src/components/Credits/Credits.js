import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tmdApi from "~/api/tmdbApi";
import apiConfig from "~/api/apiConfig";
import styles from './Credits.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)


function Credits(props) {
    const {category} = useParams()

    const [casts, setCasts] = useState([])

    useEffect(() => {
        const getCast = async () => {
            const response = await tmdApi.credit(category, props.data)
            setCasts(response.cast.slice(0, 5))
        }
        getCast()
    }, [category, props.data])


    return ( 
        <div className={cx('wrapper', 'grid')}>
            {casts.map((cast, i) => (
                <div key={i} className={cx('cast-item', 'l-2 m-2 c-2')}>
                    <img 
                        className={cx('cast-item--img')}
                        src={apiConfig.w500Image(cast.profile_path)}
                        alt='/'
                    />
                    <span className={cx('cast-item--name')}>{cast.name}</span>
                </div>
            ))}
        </div>
    );
}

export default Credits;
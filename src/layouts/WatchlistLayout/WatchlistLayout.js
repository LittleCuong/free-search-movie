import classNames from "classnames/bind";
import Header from "../Header/Header";
import styles from './WatchlistLayout.module.scss'
import Movie from '~/components/Movie/Movie';

import Footer from "~/components/Footer/Footer";
import { useAuth } from "~/Context/AuthContext";
import MovieItem from "~/components/MovieItem/MovieItem";
import Watchlist from "~/pages/Watchlist";
import WatchlistItem from "~/components/WatchlistItem/WatchlistItem";


const cx = classNames.bind(styles)

function WatchlistLayout() {
    const { watchlist } = useAuth()

    // watchlist.map(result => {
    //     console.log(result.id);
    // })

    return ( 
        <div className={cx('wrapper', 'grid')}>
            <Header/>
            <div className={cx('wrapper-body', 'grid wide row')}>
                {watchlist.map((result, index) => (
                    <Movie
                        key={result.id}
                        data={result}
                    />
                ))}
            </div>
            <Footer/>
        </div>
    );
}

export default WatchlistLayout;
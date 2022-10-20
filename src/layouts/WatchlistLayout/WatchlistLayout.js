import classNames from "classnames/bind";
import Header from "../Header/Header";
import styles from './WatchlistLayout.module.scss'
import tmdApi from "~/api/tmdbApi";
import { useState, useEffect } from "react";
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
        <>
            <Header/>
            <div className={cx('wrapper')}>
                {watchlist.map((result, index) => (
                    <WatchlistItem
                        index={index}
                        key={result.id}
                        item={result}
                    />
                ))}
            </div>
            <Footer/>
        </>
    );
}

export default WatchlistLayout;
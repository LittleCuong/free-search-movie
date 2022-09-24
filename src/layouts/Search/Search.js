import {useEffect, useState, useRef} from 'react'
import classNames from 'classnames/bind';
import styles from './Search.module.scss'
import HeadlessTippy from '@tippyjs/react/headless';
import useDebounce from '~/hooks/useDebounce/useDebounce';
import ItemResutls from '~/components/ItemResults/ItemResutls';

import {AiOutlineSearch, AiOutlineCloseCircle, AiOutlineLoading} from 'react-icons/ai'

const cx = classNames.bind(styles)

function Search() {
    // useState
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)
    // useRef
    const inputRef = useRef()

    // Debounced
    const debouncedValue = useDebounce(searchValue, 500)

    // useEffect
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true)

        fetch (`https://api.themoviedb.org/3/search/multi?api_key=973d45784769b5e834721b303dbfc386&language=en-US&query=${searchValue}&page=1&include_adult=false`)
            .then ((res) => res.json())
            .then ((res) => {
                if (!res.results) {
                    console.log(res.results);
                    setSearchResult([])
                } else {               
                setSearchResult(res.results)
                setLoading(false)
                }
            })
            .catch ((error) => {
                console.log(error);
            })
    }, [debouncedValue, searchValue])

    // CLear input
    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
    }

    // Hide Result when click outside
    const handleHideResult = () => {
        setShowResult(false)
    }
        return (
            <HeadlessTippy
                interactive
                placement='bottom-end'
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={attrs => (                                    
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        {searchResult?.map(item => (
                            <ItemResutls 
                                key={item.id} 
                                data={item}
                                category={item.media_type}
                            />
                        ))}
                    </div>                                       
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        type='text' 
                        placeholder='Search' 
                        className={cx('input')}     
                        onChange={(e) => setSearchValue(e.target.value)}  
                        onFocus={() => setShowResult(true)}
                        
                    ></input>                   
                    {!!searchValue && !loading && (
                        <AiOutlineCloseCircle 
                            className={cx('delete-icon')} 
                            onClick={handleClear}
                        />
                    )}

                    {loading && (
                        <AiOutlineLoading className={cx('loading-icon')} /> 
                    )}
                   
                    <span className={cx('divider')}></span>
                    <AiOutlineSearch className={cx('icon-search')}/>
                </div>
            </HeadlessTippy>
        )
}
export default Search;
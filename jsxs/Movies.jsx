import React, { useCallback, useEffect, useReducer, useRef } from 'react';

const SET_ARRAY = 'SET_ARRAY'
const SET_STYLE = 'SET_STYLE'
const INCREASE_NOW = 'INCREASE_NOW'
const INCREATE_TEMP = 'INCREATE_TEMP'
const SET_BUTTONSCALE = 'SET_BUTTONSCALE'
const SET_NOW = 'SET_NOW'
const SET_TEMP = 'SET_TEMP'
const CHANGE_FADEIN = 'CHANGE_FADEIN'

const initialState = {
    array: [],
    style: [],
    now: 0,
    temp: 0,
    buttonScale: 0,
    fadeIn: { opacity: '-0.4', transform: 'translateY(50px)', overviewTransform: 'translateY(200px)' }
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ARRAY:
            return {
                ...state,
                array: action.array,
            }
        case SET_STYLE:
            return {
                ...state,
                style: action.style
            }
        case INCREASE_NOW:
            return {
                ...state,
                now: state.now + 1
            }
        case INCREATE_TEMP:
            return {
                ...state,
                temp: state.temp + 1
            }
        case SET_NOW:
            return {
                ...state,
                now: action.now
            }
        case SET_TEMP:
            return {
                ...state,
                temp: action.temp
            }
        case SET_BUTTONSCALE:
            return {
                ...state,
                buttonScale: action.buttonScale
            }
        case CHANGE_FADEIN:
            return {
                ...state,
                fadeIn: action.payload
            }
        default:
            throw new Error('Unexpected action')
    }
}

const Movies = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // what genre ?
    // fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=a140e47a86a90b2ab39f034406c716a3&language=en-US`)
    // .then(response => { return response.json() })
    // .then((data)=>{
    //     console.log(data)
    // })

    const fetchData = useCallback(() => {
        let i = Math.ceil(Math.random() * 10)
        const tempArray = []
        const genre = [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' }, { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' }, { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Science Fiction' }, { id: 10770, name: 'Tv Movie' }, { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' }, { id: 37, name: 'Western' }]

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a140e47a86a90b2ab39f034406c716a3&sort_by=vote_average.desc&page=${i}&vote_count.gte=1000`)
            .then(response => { return response.json() })
            .then((data) => {
                Array(20).fill().map((v, i) => {
                    tempArray.push({
                        title: data.results[i].title,
                        date: data.results[i].release_date,
                        genre: data.results[i].genre_ids,
                        overview: data.results[i].overview,
                        voteAverage: data.results[i].vote_average,
                        posterpath: data.results[i].poster_path,
                    })
                    Array(tempArray[i].genre.length).fill().map((v, n) => {
                        Array(genre.length).fill().map((v, j) => {
                            if (tempArray[i].genre[n] === genre[j].id) {
                                tempArray[i].genre[n] = genre[j].name
                            }
                        })
                    })
                })
                dispatch({ type: SET_ARRAY, array: tempArray })
            })
            .catch(err => { console.error(err); });
    }, [])

    const styleSet = () => {
        let tempArray = []

        tempArray.push(
            { id: 0, left: '0', scale: '0', zIndex: '6', opacity: '0', rotate: '35deg', duration: '' },
            { id: 1, left: '0', scale: '0', zIndex: '5', opacity: '0', rotate: '35deg', duration: '' },
            { id: 2, left: '0', scale: '0', zIndex: '4', opacity: '0', rotate: '35deg', duration: '' },
            { id: 3, left: '0', scale: '0', zIndex: '3', opacity: '0', rotate: '35deg', duration: '' },
            { id: 4, left: '0', scale: '0', zIndex: '2', opacity: '0', rotate: '35deg', duration: '' },
            { id: 5, left: '0', scale: '0', zIndex: '1', opacity: '0', rotate: '35deg', duration: '' },
        )
        Array(14).fill().map((v, i) => {
            tempArray.push({ id: i + 6, left: '0', scale: '0', zIndex: '0', opacity: '0', rotate: '35deg', duration: '' })
        })
        dispatch({ type: SET_STYLE, style: tempArray })
        setTimeout(() => {
            tempArray = []
            tempArray.push(
                { id: 0, left: '460px', scale: '1.1', zIndex: '6', opacity: '1', rotate: '35deg', duration: '' },
                { id: 1, left: '260px', scale: '0.75', zIndex: '5', opacity: '1', rotate: '35deg', duration: '' },
                { id: 2, left: '180px', scale: '0.6', zIndex: '4', opacity: '1', rotate: '35deg', duration: '' },
                { id: 3, left: '110px', scale: '0.45', zIndex: '3', opacity: '1', rotate: '35deg', duration: '' },
                { id: 4, left: '50px', scale: '0.3', zIndex: '2', opacity: '1', rotate: '35deg', duration: '' },
                { id: 5, left: '0', scale: '0.15', zIndex: '1', opacity: '1', rotate: '35deg', duration: '' },
                { id: 6, left: '-30px', scale: '0', zIndex: '0', opacity: '1', rotate: '35deg', duration: '', },
            )
            Array(13).fill().map((v, i) => {
                tempArray.push({ id: i + 7, left: '0', scale: '0', zIndex: '0', opacity: '0', rotate: '35deg' })
            })
            dispatch({ type: SET_STYLE, style: tempArray })
        }, 600)
    }

    const clickNext = () => {
        dispatch({ type: INCREATE_TEMP })
        const tempArray = state.style
        tempArray.map((v, i) => {
            if (state.now === tempArray[i].id) {
                tempArray[i].scale = '1.3'
                tempArray[i].left = '600px'
                tempArray[i].opacity = '0'
                tempArray[i].zIndex = '-1'
            } else if (state.now + 1 === tempArray[i].id) {
                tempArray[i].scale = '1.1'
                tempArray[i].left = '460px'
                tempArray[i].zIndex = '6'
            } else if (state.now + 2 === tempArray[i].id) {
                tempArray[i].scale = '0.75'
                tempArray[i].left = '260px'
                tempArray[i].zIndex = '5'
            } else if (state.now + 3 === tempArray[i].id) {
                tempArray[i].scale = '0.6'
                tempArray[i].left = '180px'
                tempArray[i].zIndex = '4'
            } else if (state.now + 4 === tempArray[i].id) {
                tempArray[i].scale = '0.45'
                tempArray[i].left = '110px'
                tempArray[i].zIndex = '3'
            } else if (state.now + 5 === tempArray[i].id) {
                tempArray[i].scale = '0.3'
                tempArray[i].left = '50px'
                tempArray[i].zIndex = '2'
            } else if (state.now + 6 === tempArray[i].id) {
                tempArray[i].scale = '0.15'
                tempArray[i].left = '0'
                tempArray[i].opacity = '1'
                tempArray[i].zIndex = '1'
            } else if (state.now + 7 === tempArray[i].id) {
                tempArray[i].left = '-30px'
            }
        })
        dispatch({ type: SET_STYLE, style: tempArray })
        setTimeout(() => {
            dispatch({ type: INCREASE_NOW })
        }, 500)
    }

    const clickReset = () => {
        fetchData()

        const tempArray = state.style
        tempArray.map((v, i) => {
            if (state.now === tempArray[i].id) {
                tempArray[i].scale = '1.3'
                tempArray[i].left = '600px'
                tempArray[i].opacity = '-6'
                tempArray[i].zIndex = '-1'
            } else if (state.now + 1 === tempArray[i].id) {
                tempArray[i].scale = '1.3'
                tempArray[i].left = '600px'
                tempArray[i].opacity = '-5'
                tempArray[i].zIndex = '-1'
            } else if (state.now + 2 === tempArray[i].id) {
                tempArray[i].scale = '1.3'
                tempArray[i].left = '600px'
                tempArray[i].opacity = '-4'
                tempArray[i].zIndex = '-1'
            } else if (state.now + 3 === tempArray[i].id) {
                tempArray[i].scale = '1.3'
                tempArray[i].left = '600px'
                tempArray[i].opacity = '-3'
                tempArray[i].zIndex = '-1'
            } else if (state.now + 4 === tempArray[i].id) {
                tempArray[i].scale = '1.3'
                tempArray[i].left = '600px'
                tempArray[i].opacity = '-2'
                tempArray[i].zIndex = '-1'
            } else if (state.now + 5 === tempArray[i].id) {
                tempArray[i].scale = '1.3'
                tempArray[i].left = '600px'
                tempArray[i].opacity = '-1'
                tempArray[i].zIndex = '-1'
            } else if (state.now + 6 === tempArray[i].id) {
                tempArray[i].scale = '1.3'
                tempArray[i].left = '600px'
                tempArray[i].opacity = '0'
                tempArray[i].zIndex = '-1'
            }
        })
        dispatch({ type: SET_STYLE, style: tempArray })
        dispatch({ type: SET_NOW, now: -1 })

        setTimeout(() => {
            styleSet()
            dispatch({ type: SET_TEMP, temp: -1 })

        }, 600)

        setTimeout(() => {
            dispatch({ type: SET_NOW, now: 0 })
            dispatch({ type: SET_TEMP, temp: 0 })
        }, 1200)
    }

    const clickPoster = () => {
        const tempArray = state.style
        tempArray.map((v, i) => {
            if (state.now === tempArray[i].id) {
                if (tempArray[i].rotate === '35deg') {
                    tempArray[i].rotate = 0
                } else {
                    tempArray[i].rotate = '35deg'
                }
            }
        })
        dispatch({ type: SET_STYLE, style: tempArray })
    }

    useEffect(() => {
        fetchData()
        styleSet()
    }, [])

    useEffect(() => {
        if (state.now > 19) {
            clickReset()
        }
    }, [state.now])

    useEffect(() => {
        let tempArray = []
        dispatch({ type: CHANGE_FADEIN, payload: { opacity: 0, transform: 'translateY(-50px)', overviewTransform: 'translateY(-200px)' } })
        dispatch({ type: SET_BUTTONSCALE, buttonScale: 0 })
        tempArray.push(setTimeout(() => {
            dispatch({ type: CHANGE_FADEIN, payload: { opacity: 0, transform: 'translateY(50px)', overviewTransform: 'translateY(200px)' } })
        }, 300))
        tempArray.push(setTimeout(() => {
            dispatch({ type: CHANGE_FADEIN, payload: { opacity: 1, transform: 'translateY(0)', overviewTransform: 'translateY(0)' } })
            dispatch({ type: SET_BUTTONSCALE, buttonScale: 1.2 })
        }, 600))
        tempArray.push(setTimeout(() => {
            dispatch({ type: SET_BUTTONSCALE, buttonScale: 1 })
        }, 900))
        return (() => {
            for (let i = 0; i < tempArray.length; i++) {
                clearTimeout(tempArray[i]);
            }
            tempArray = []
        })
    }, [state.temp])

    return (
        <div className='movie-top' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div style={{ float: 'left', width: '50%', height: '51vh' }}>
                <ul style={{ margin: 0, padding: '0', position: 'absolute', top: '-40px', left: '-140px' }}>
                    {state.array[state.temp] && Array(20).fill().map((v, i) => {
                        return <li onClick={i === state.temp ? clickPoster : clickNext} key={i} style={{ listStyle: 'none', }}>
                            <img alt={`poster of ${state.array[i].title}`} src={`https://image.tmdb.org/t/p/original${state.array[i].posterpath}`} style={{ opacity: state.style[i].opacity, transform: `perspective(600px) rotateY(${state.style[i].rotate}) scale(${state.style[i].scale})`, zIndex: state.style[i].zIndex, left: state.style[i].left, cursor: 'pointer', transition: ' all .6s', boxShadow: '-0.1px -0.1px 1px white', position: 'absolute', top: '0', width: '360px', height: '540px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '20px', WebkitBoxReflect: 'below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent) , to(rgba(250, 250, 250, 0.4)))' }}></img>
                        </li>
                    })}
                </ul>
            </div>
            {state.array[state.now] &&
                <div className='movie-top-description' style={{ float: 'right',height: '51vh', color: 'white' }}>
                    <div style={{ overflow: 'hidden', height: '40px', fontSize: '30px', marginBottom: '30px', fontWeight: '600' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: state.fadeIn.opacity, transform: state.fadeIn.transform, }}>{state.now !== -1 ? state.array[state.now].title : ''}</div>
                    </div>
                    <div style={{ overflow: 'hidden', height: '20px', color: '#5b5b5b', marginBottom: '15px', fontWeight: '600' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: state.fadeIn.opacity, transform: state.fadeIn.transform, }}>{state.now !== -1 ? state.array[state.now].date : ''}</div>
                    </div>
                    <div style={{ overflow: 'hidden', height: '20px', fontWeight: '600' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: state.fadeIn.opacity, transform: state.fadeIn.transform, }}>{state.now !== -1 ? `Rate : ${state.array[state.now].voteAverage}` : ''}</div>
                    </div>
                    <div style={{ overflow: 'hidden', height: '20px', marginBottom: '15px', fontWeight: '600' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: state.fadeIn.opacity, transform: state.fadeIn.transform, }}>{state.now !== -1 ? `Genres : ${state.array[state.now].genre.join(' / ')}` : ''}</div>
                    </div>
                    <div style={{ overflow: 'hidden', height: '150px', whiteSpace: 'normal', textOverflow: 'ellipsis', marginBottom: '15px', fontSize: '15px' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: state.fadeIn.opacity, transform: state.fadeIn.overviewTransform, }}>{state.now !== -1 ? state.array[state.now].overview : ''}</div>
                    </div>

                    <button className='movie-button' onClick={clickReset} style={{ cursor: 'pointer', transition: 'ease-in-out all .3s', transform: `scale(${state.buttonScale})`, width: '60px', height: '60px', outline: 'none', backgroundColor: 'black', margin: '0', fontWeight: '600', fontSize: '12px', padding: '6px', textAlign: 'center', border: '0', borderRadius: '100%', }} >Refesh <span style={{ transition: 'all .4s', }}>List</span></button>
                </div>
            }
        </div>
    )
};

export default Movies
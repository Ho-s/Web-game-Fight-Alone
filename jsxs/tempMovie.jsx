import React, { useState, useEffect } from 'react';
import Canvas from './Canvas'


const Movies = () => {

    const [genre, setGenre] = useState([{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' }, { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' }, { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Science Fiction' }, { id: 10770, name: 'Tv Movie' }, { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' }, { id: 37, name: 'Western' }])
    const [array, setArray] = useState([])

    const [style, setStyle] = useState([])

    const [temp, setTemp] = useState(0)
    const [now, setNow] = useState(0)
    const [fadeIn, setFadeIn] = useState({ opacity: '-0.4', transform: 'translateY(50px)', overviewTransform: 'translateY(200px)' })
    const [buttonScale, setButtonScale] = useState(0)

    // fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=a140e47a86a90b2ab39f034406c716a3&language=en-US`)
    // .then(response => { return response.json() })
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch(err => { console.error(err); });

    const fetchData = () => {
        let i = Math.ceil(Math.random() * 10)
        const tempArray = []

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
                setArray(tempArray)
            })
            .catch(err => { console.error(err); });

    }

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
        setStyle(tempArray)
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
            setStyle(tempArray)
        }, 600)
    }

    useEffect(() => {
        fetchData()
        styleSet()
    }, [])

    useEffect(() => {
        if (now > 19) {
            clickReset()
        }
    }, [now])

    useEffect(() => {
        let tempArray = []
        setFadeIn({ ...fadeIn, opacity: 0, transform: 'translateY(-50px)', overviewTransform: 'translateY(-200px)' })
        setButtonScale(0)
        tempArray.push(setTimeout(() => {
            setFadeIn({ ...fadeIn, opacity: 0, transform: 'translateY(50px)', overviewTransform: 'translateY(200px)' })
        }, 300))
        tempArray.push(setTimeout(() => {
            setFadeIn({ ...fadeIn, opacity: 1, transform: 'translateY(0px)', overviewTransform: 'translateY(0px)' })
            setButtonScale(1.2)
        }, 600))
        tempArray.push(setTimeout(() => {
            setButtonScale(1)
        }, 900))
        return (() => {
            for (let i = 0; i < tempArray.length; i++) {
                clearTimeout(tempArray[i]);
            }
            tempArray = []
        })
    }, [temp, array])

    const clickNext = () => {
        setTemp((prev) => { return prev + 1 })
        setStyle(style.map((v, i) => {
            if (now === style[i].id) {
                return { ...v, scale: '1.3', left: '600px', opacity: '0', zIndex: '-1' }
            } else if (now + 1 === style[i].id) {
                return { ...v, scale: '1.1', left: '460px', zIndex: '6' }
            } else if (now + 2 === style[i].id) {
                return { ...v, scale: '0.75', left: '260px', zIndex: '5' }
            } else if (now + 3 === style[i].id) {
                return { ...v, scale: '0.6', left: '180px', zIndex: '4' }
            } else if (now + 4 === style[i].id) {
                return { ...v, scale: '0.45', left: '110px', zIndex: '3' }
            } else if (now + 5 === style[i].id) {
                return { ...v, scale: '0.3', left: '50px', zIndex: '2' }
            } else if (now + 6 === style[i].id) {
                return { ...v, scale: '0.15', left: '0', zIndex: '1', opacity: '1' }
            } else if (now + 7 === style[i].id) {
                return { ...v, left: '-30px' }
            } else {
                return v
            }
        }))
        setTimeout(() => {
            setNow((prev) => { return prev + 1 })
        }, 500)
    }

    const clickReset = () => {
        fetchData()
        setStyle(style.map((v, i) => {
            if (now === style[i].id) {
                return { ...v, scale: '1.3', left: '600px', opacity: '0', zIndex: '-1' }
            } else if (now + 1 === style[i].id) {
                return { ...v, scale: '1.3', left: '600px', opacity: '0', zIndex: '-1' }
            } else if (now + 2 === style[i].id) {
                return { ...v, scale: '1.3', left: '600px', opacity: '0', zIndex: '-1' }
            } else if (now + 3 === style[i].id) {
                return { ...v, scale: '1.3', left: '600px', opacity: '0', zIndex: '-1' }
            } else if (now + 4 === style[i].id) {
                return { ...v, scale: '1.3', left: '600px', opacity: '0', zIndex: '-1' }
            } else if (now + 5 === style[i].id) {
                return { ...v, scale: '1.3', left: '600px', opacity: '0', zIndex: '-1' }
            } else if (now + 6 === style[i].id) {
                return { ...v, scale: '1.3', left: '600px', opacity: '0', zIndex: '-1' }
            } else {
                return v
            }
        }))

        setTimeout(() => {
            setNow(-1)
            setTemp(-1)

            styleSet()
        }, 600)
        setTimeout(() => {
            setNow(0)
            setTemp(0)
        }, 1200)
    }

    const clickPoster = () => {
        setStyle(style.map((v, i) => {
            if (now === style[i].id) {
                if (style[i].rotate === '35deg') {
                    return { ...v, rotate: '0' }
                } else {
                    return { ...v, rotate: '35deg' }
                }
            } else {
                return v
            }
        }))
    }

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%' }}>
            <div style={{ float: 'left', width: '50%', height: '51vh' }}>
                <ul style={{ margin: 0, padding: '0', position: 'absolute', top: '-40px', left: '-140px' }}>
                    {array[temp] && Array(20).fill().map((v, i) => {
                        return <li onClick={i === temp ? clickPoster : clickNext} key={i} style={{ opacity: style[i].opacity, transform: `perspective(600px) rotateY(${style[i].rotate}) scale(${style[i].scale})`, zIndex: style[i].zIndex, left: style[i].left, backgroundImage: `url(https://image.tmdb.org/t/p/original${array[i].posterpath})`, cursor: 'pointer', transition: ' all .6s', boxShadow: '-0.1px -0.1px 1px white', position: 'absolute', top: '0', listStyle: 'none', width: '360px', height: '540px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '20px', webkitBoxReflect: 'below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent) , to(rgba(250, 250, 250, 0.4)))' }}></li>
                    })}
                </ul>
            </div>
            <Canvas></Canvas>
            {array[now] &&
                <div style={{ float: 'left', width: '40%', height: '51vh', color: 'white' }}>
                    <div style={{ overflow: 'hidden', height: '40px', fontSize: '30px', marginBottom: '30px', fontWeight: '600' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: fadeIn.opacity, transform: fadeIn.transform, }}>{now !== -1 ? array[now].title : ''}</div>
                    </div>
                    <div style={{ overflow: 'hidden', height: '20px', color: '#5b5b5b', marginBottom: '15px', fontWeight: '600' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: fadeIn.opacity, transform: fadeIn.transform, }}>{now !== -1 ? array[now].date : ''}</div>
                    </div>
                    <div style={{ overflow: 'hidden', height: '20px', fontWeight: '600' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: fadeIn.opacity, transform: fadeIn.transform, }}>{now !== -1 ? `Rate : ${array[now].voteAverage}` : ''}</div>
                    </div>
                    <div style={{ overflow: 'hidden', height: '20px', marginBottom: '15px', fontWeight: '600' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: fadeIn.opacity, transform: fadeIn.transform, }}>{now !== -1 ? `Genres : ${array[now].genre.join(' / ')}` : ''}</div>
                    </div>
                    <div style={{ overflow: 'hidden', height: '150px', whiteSpace: 'normal', textOverflow: 'ellipsis', marginBottom: '15px', fontSize: '15px' }}>
                        <div style={{ transition: 'ease-in-out all .3s', opacity: fadeIn.opacity, transform: fadeIn.overviewTransform, }}>{now !== -1 ? array[now].overview : ''}</div>
                    </div>

                    <button className='movie-button' style={{ cursor: 'pointer', transition: 'ease-in-out all .3s', transform: `scale(${buttonScale})`, width: '60px', height: '60px', outline: 'none', backgroundColor: 'black', margin: '0', fontWeight: '600', fontSize: '12px', padding: '6px', textAlign: 'center', border: '0', borderRadius: '100%', }} onClick={clickReset}>Refesh <span style={{ transition: 'all .4s', }}>List</span></button>
                </div>
            }
        </div>

    )

};

export default Movies
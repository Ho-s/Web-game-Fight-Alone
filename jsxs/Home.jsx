import React, { useState, useEffect, useRef, useCallback } from 'react';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const Home = () => {
    const [isRunning, setIsRunning] = useState(true)
    const [temp, setTemp] = useState(0)
    const [number, setNumber] = useState(0)
    const [first, setFirst] = useState({ transform: '', top: '0', opacity: '0' })
    const [second, setSecond] = useState({ transform: '', top: '0', opacity: '0' })
    const [third, setThird] = useState({ transform: '', top: '0', opacity: '0' })
    const [fourth, setFourth] = useState({ bottom: '0', right: '0', comment: '' })
    const [fifth, setFifth] = useState({ transform: '', opacity: '', comment: '' })

    useInterval(() => {
        if (number < 2) {
            setTemp((prev) => { return prev + 1 })
            setTimeout(() => {
                setNumber((prev) => { return prev + 1 })
            }, 400)
        } else {
            setTemp(0)
            setTimeout(() => {
                setNumber(0)
            }, 400)
        }
    }, isRunning ? [4000] : null)

    useEffect(() => {
        setIsRunning(false)
        setIsRunning(true)
        let timer = []
        if (temp === 0) {
            timer = []
            setFirst({ ...first, transform: 'scale(0.6)', opacity: '0', top: '900px' })
            setFifth({ ...fifth, transform: 'translateY(-200px)', opacity: '0' })

            timer.push(setTimeout(() => {
                setFirst({ ...first, transform: 'scale(0.8)', opacity: '1', top: '0' })
                setFourth({ ...fourth, bottom: '-100px', right: '-100px' })
                setFifth({ ...fifth, transform: 'translateY(200px)', opacity: '0' })
            }, 400))

            timer.push(setTimeout(() => {
                setFirst({ ...first, transform: 'scale(1)', opacity: '1', top: '0' })
                setFourth({ ...fourth, bottom: '0', right: '0', comment: 'Choice' })
                setFifth({ ...fifth, transform: 'translateY(0)', opacity: '1', comment: 'Do not consider anymore.' })
            }, 800))

            if (number === 1) {
                setSecond({ ...second, transform: 'scale(0.8)', opacity: '1', top: '0' })

                timer.push(setTimeout(() => {
                    setSecond({ ...second, transform: 'scale(0.6)', opacity: '0', top: '-900px' })
                }, 400))

            } else if (number === 2) {
                setThird({ ...third, transform: 'scale(0.8)', opacity: '1', top: '0' })

                timer.push(setTimeout(() => {
                    setThird({ ...third, transform: 'scale(0.6)', opacity: '0', top: '-900px' })
                }, 400))
            }

        } else if (temp === 1) {
            timer = []
            setSecond({ ...second, transform: 'scale(0.6)', opacity: '0', top: '900px' })
            setFifth({ ...fifth, transform: 'translateY(-200px)', opacity: '0' })
            timer.push(setTimeout(() => {
                setSecond({ ...second, transform: 'scale(0.8)', opacity: '1', top: '0' })
                setFourth({ ...fourth, bottom: '-100px', right: '-100px' })
                setFifth({ ...fifth, transform: 'translateY(200px)', opacity: '0' })
            }, 400))
            timer.push(setTimeout(() => {
                setSecond({ ...second, transform: 'scale(1)', opacity: '1', top: '0' })
                setFourth({ ...fourth, bottom: '0', right: '0', comment: 'Just watch' })
                setFifth({ ...fifth, transform: 'translateY(0)', opacity: '1', comment: 'Just choose the movie.' })
            }, 800))
            if (number === 0) {
                setFirst({ ...first, transform: 'scale(0.8)', opacity: '1', top: '0' })
                timer.push(setTimeout(() => {
                    setFirst({ ...first, transform: 'scale(0.6)', opacity: '0', top: '-900px' })
                }, 400))
            } else if (number === 2) {
                setThird({ ...third, transform: 'scale(0.8)', opacity: '1', top: '0' })
                timer.push(setTimeout(() => {
                    setThird({ ...third, transform: 'scale(0.6)', opacity: '0', top: '-900px' })
                }, 400))
            }
        } else if (temp === 2) {
            timer = []
            setThird({ ...third, transform: 'scale(0.6)', opacity: '0', top: '900px' })
            setFifth({ ...fifth, transform: 'translateY(-200px)', opacity: '0' })
            timer.push(setTimeout(() => {
                setThird({ ...third, transform: 'scale(0.8)', opacity: '1', top: '0' })
                setFourth({ ...fourth, bottom: '-100px', right: '-100px' })
                setFifth({ ...fifth, transform: 'translateY(200px)', opacity: '0' })
            }, 400))
            timer.push(setTimeout(() => {
                setThird({ ...third, transform: 'scale(1)', opacity: '1', top: '0' })
                setFourth({ ...fourth, bottom: '0', right: '0', comment: 'Nomore considering' })
                setFifth({ ...fifth, transform: 'translateY(0)', opacity: '1', comment: 'And go watching it.' })
            }, 800))
            if (number === 0) {
                setFirst({ ...first, transform: 'scale(0.8)', opacity: '1', top: '0' })
                timer.push(setTimeout(() => {
                    setFirst({ ...first, transform: 'scale(0.6)', opacity: '0', top: '-900px' })
                }, 400))
            } else if (number === 1) {
                setSecond({ ...second, transform: 'scale(0.8)', opacity: '1', top: '0' })
                timer.push(setTimeout(() => {
                    setSecond({ ...second, transform: 'scale(0.6)', opacity: '0', top: '-900px' })
                }, 400))
            }
        }
        return () => {
            for (let i = 0; i < timer.length; i++) {
                clearTimeout(timer[i]);
            }
            timer = []
        }
    }, [temp])

    const clickFirst = () => {
        setTemp(0)
        setTimeout(() => {
            setNumber(0)
        }, 400)
    }

    const clickSecond = () => {
        setTemp(1)
        setTimeout(() => {
            setNumber(1)
        }, 400)
    }

    const clickThird = () => {
        setTemp(2)
        setTimeout(() => {
            setNumber(2)
        }, 400)
    }

    const clickRight = () => {
        if (number < 2) {
            setTemp((prev) => { return prev + 1 })
            setTimeout(() => {
                setNumber((prev) => { return prev + 1 })
            }, 400)
        } else {
            setTemp(0)
            setTimeout(() => {
                setNumber(0)
            }, 400)
        }
    }

    const clickLeft = () => {
        if (number > 0) {
            setTemp((prev) => { return prev - 1 })
            setTimeout(() => {
                setNumber((prev) => { return prev - 1 })
            }, 400)
        } else {
            setTemp(2)
            setTimeout(() => {
                setNumber(2)
            }, 400)
        }
    }

    return (
        <>
            <div style={{ transition: 'all .4s', top: first.top, transform: first.transform, opacity: first.opacity, zIndex: '-1', width: '87vw', height: '88vh', backgroundImage: 'url(https://user-images.githubusercontent.com/71132893/108152432-64da8e80-711c-11eb-9b80-b7e50cd66603.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', right: '0', position: 'absolute' }}></div>
            <div style={{ transition: 'all .4s', top: second.top, transform: second.transform, opacity: second.opacity, zIndex: '-1', width: '87vw', height: '88vh', backgroundImage: 'url(https://user-images.githubusercontent.com/71132893/108152431-64da8e80-711c-11eb-84ef-13a26de52169.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', right: '0', position: 'absolute' }}></div>
            <div style={{ transition: 'all .4s', top: third.top, transform: third.transform, opacity: third.opacity, zIndex: '-1', width: '87vw', height: '88vh', backgroundImage: 'url(https://user-images.githubusercontent.com/71132893/108152563-9f442b80-711c-11eb-8bfc-7ddfbce149d5.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', right: '0', position: 'absolute' }}></div>

            <div style={{ overflow: 'hidden', fontWeight: '600', fontSize: '60px', width: '600px', wordBreak: 'break-word', position: 'absolute', lineHeight: '1.5', top: '50%', transform: 'translate(0,-50%)', left: '150px', color: 'white' }}>
                <div style={{ transition: 'all .4s', transform: fifth.transform, opacity: fifth.opacity }}>{fifth.comment}</div>
            </div>

            <div style={{ position: 'absolute', bottom: '60px', left: '0' }}>
                <div>
                    <div style={{ position: 'absolute', top: '0', left: '100px', width: '30px', height: '2px', cursor: 'pointer' }}>
                        <button className="arrow-left" onClick={clickLeft} style={{ cursor: 'pointer', outline: 'none', border: '0', position: 'absolute', width: '90%' }}></button>
                    </div>
                    <div style={{ position: 'absolute', top: '0', left: '180px', width: '30px', height: '2px', cursor: 'pointer' }}>
                        <button className="arrow-right" onClick={clickRight} style={{ cursor: 'pointer', outline: 'none', border: '0', position: 'absolute', width: '90%' }}></button>
                    </div>
                </div>
                <div className='main-bar' style={{ position: 'absolute', top: '0', left: '400px', color: 'white', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: '10px', marginRight: '10px' }}>0{temp + 1}</div>
                    <button onClick={clickFirst} style={{ backgroundColor: (temp === 0) ? "white" : "", outline: 'none', border: '0', width: '30px', height: '3px', marginRight: '20px', cursor: 'pointer', transition: 'all .2s linear' }}></button>
                    <button onClick={clickSecond} style={{ backgroundColor: (temp === 1) ? "white" : "", outline: 'none', border: '0', width: '30px', height: '3px', marginRight: '20px', cursor: 'pointer', transition: 'all .2s linear' }}></button>
                    <button onClick={clickThird} style={{ backgroundColor: (temp === 2) ? "white" : "", outline: 'none', border: '0', width: '30px', height: '3px', marginRight: '10px', cursor: 'pointer', transition: 'all .2s linear' }}></button>
                    <div style={{ fontSize: '10px' }}>03</div>
                </div>
            </div>

            <div style={{ transition: 'all .4s ', right: fourth.right, bottom: fourth.bottom, width: '12vw', height: '10vh', backgroundColor: 'white', padding: '4vh 3vw', position: 'absolute', boxShadow: '-2px -1px 3px' }}>
                <div style={{ color: 'gray', fontWeight: '600' }}>UP NEXT</div>
                <div style={{ marginTop: '30px', fontWeight: '600', fontSize: '25px' }}>
                    {fourth.comment}
                </div>
            </div>
        </>
    )

};

export default Home
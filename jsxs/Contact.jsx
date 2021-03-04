import React, { useRef, useEffect, useState } from 'react';


const Contact = () => {
    const [browserWidth, setBrowerWidth] = useState(document.body.offsetWidth)
    const [style, setStyle] = useState({ width: 0, height: 0, transform: 'translateY(65px)' })
    const canvasRef = useRef()

    const doTextAnimation = () => {
        let leon, canvas, ctx;

        let sw = browserWidth > 1000 ? 800 : 400;
        let sh = browserWidth > 1000 ? 300 : 200;
        const pixelRatio = 2;

        function init() {
            canvas = canvasRef.current
            ctx = canvas?.getContext("2d");

            canvas.width = sw * pixelRatio;
            canvas.height = sh * pixelRatio;
            canvas.style.width = sw + 'px';
            canvas.style.height = sh + 'px';
            ctx.scale(pixelRatio, pixelRatio);

            leon = new LeonSans({
                text: 'A Movie Picker Site\nmade by Joo\nfrom South Korea',
                color: ['white'],
                size: browserWidth > 1000 ? 80 : 40,
                weight: 600
            });
            let i, total = leon.drawing.length;
            for (i = 0; i < total; i++) {
                TweenMax.fromTo(leon.drawing[i], 1.6, {
                    value: 0
                }, {
                    delay: i * 0.1,
                    value: 1,
                    ease: Power4.easeOut
                });
            }
            setTimeout(() => {
                canvas.style.width = 0
                canvas.style.height = 0
                canvas.style.opacity = 0
            }, 5000)
            requestAnimationFrame(animate);
        }

        function animate(t) {
            requestAnimationFrame(animate);

            ctx.clearRect(0, 0, sw, sh);

            const x = (sw - leon.rect.w) / 2;
            const y = (sh - leon.rect.h) / 2;
            leon.position(x, y);

            leon.draw(ctx);
        }

        init();
    }

    const chageStyle = () => {
        setTimeout(() => {
            setStyle({ ...style, width: '160px', height: '160px', transform: 'translateY(0)' })
        }, 5500)
    }

    useEffect(() => {
        doTextAnimation()
        chageStyle()
    }, [])

    return (
        <>
            <canvas style={{ transition: 'all 2s', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} ref={canvasRef}></canvas>
            <div style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', position: 'absolute', }}>
                <div>
                    <div style={{ transition: 'all .4s', width: style.width, height: style.height, borderRadius: '100%', backgroundSize: '400px 260px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: 'url(https://user-images.githubusercontent.com/71132893/103438501-ec586500-4c76-11eb-8914-28a85fa2cae7.jpg)' }}></div>
                </div>
                <ul style={{ padding: 0, margin: 0 }}>
                    <li style={{ listStyle: 'none', width: '65px', height: '20px', overflow: 'hidden', margin: '10px auto' }}>
                        <a href='mailto:kjcoco13@gmail.com'>
                            <div style={{ transition: 'all .4s', transitionDelay: '.3s', transform: style.transform, width: '65px', height: '20px', backgroundImage: 'url(https://img.shields.io/badge/Gmail-d14836?style=flat-square&logo=Gmail&logoColor=white&link=mailto:kjcoco13@gmail.com)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        </a>
                    </li>
                    <li style={{ listStyle: 'none', width: '65px', height: '20px', overflow: 'hidden', margin: '10px auto' }}>
                        <a href='https://github.com/Ho-s'>
                            <div style={{ transition: 'all .4s', transitionDelay: '.6s', transform: style.transform, width: '65px', height: '20px', backgroundImage: 'url(https://img.shields.io/badge/Github-black?style=flat-square&logo=github)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        </a>
                    </li>
                    <li style={{ listStyle: 'none', width: '65px', height: '20px', overflow: 'hidden', margin: '10px auto' }}>
                        <a href='http://qr.kakao.com/talk/Qs4iWKmmtszYlS_qLsk9msnspqs-'>
                            <div style={{ transition: 'all .4s', transitionDelay: '.9s', transform: style.transform, width: '65px', height: '20px', backgroundImage: 'url(https://img.shields.io/badge/Kakao-white?style=flat-square&logo=kakao)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        </a>
                    </li>
                    <li style={{ listStyle: 'none', width: '65px', height: '20px', overflow: 'hidden', margin: '10px auto' }}>
                        <a href='https://ho-space.netlify.app/'>
                            <div style={{ transition: 'all .4s', transitionDelay: '1.2s', transform: style.transform, width: '65px', height: '20px', backgroundImage: 'url(http://img.shields.io/badge/-Blog-gray?style=flat-square&logo=gatsby&link=https://ho-space.netlify.app/)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        </a>
                    </li>
                    <li style={{ listStyle: 'none', width: '65px', height: '20px', overflow: 'hidden', margin: '10px auto' }}>
                        <a href='https://www.facebook.com/byungho.joo.5/'>
                            <div style={{ transition: 'all .4s', transitionDelay: '1.5s', transform: style.transform, width: '65px', height: '20px', backgroundImage: 'url(https://img.shields.io/badge/FBook-1877f2?style=flat-square&logo=facebook&logoColor=white&link=https://www.facebook.com/byungho.joo.5/)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )

};

export default Contact
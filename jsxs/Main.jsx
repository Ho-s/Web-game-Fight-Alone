import React from 'react';
import { Link, Route, HashRouter } from "react-router-dom";
import Home from './Home'
import Contact from './Contact'
import Movies from './Movies'

const Main = () => {

    return (
        <HashRouter>
            <header style={{padding:'2vh 3vw',width:'94vw',height:'5vh'}}>
                <Link to='/'>
                    <button className='header-left' style={{outline:'none',backgroundColor:'transparent',color:'white',transition:'all .2s',fontWeight:'bolder',textAlign:'center',float:'left',cursor:'pointer',width:'60px',height:'60px',borderRadius:'100%',border:'1px white solid'}}>
                        <div>What</div>
                        <div>Movie</div>
                        <div>Tonight</div>
                    </button>
                </Link>
                <ul className='header-right' style={{padding:'0',margin:'0',lineHeight:'60px'}}>
                    <li style={{fontWeight:'600',listStyle:'none',float:'right',cursor:'pointer',marginLeft:'30px'}}><Link style={{transition:'all .4s',textDecoration:'none'}} to='contact'>Contact</Link></li>
                    <li style={{fontWeight:'600',listStyle:'none',float:'right',cursor:'pointer',marginLeft:'30px'}}><Link style={{transition:'all .4s',textDecoration:'none'}} to='movies'>Movie Picker</Link></li>
                    <li style={{fontWeight:'600',listStyle:'none',float:'right',cursor:'pointer'}}><Link style={{transition:'all .4s',textDecoration:'none'}} to=''>Home</Link></li>
                </ul>
            </header>
            <main>
                <Route exact path="/" component={Home} />
                <Route path="/movies" component={Movies} />
                <Route path="/contact" component={Contact} />
            </main>
        </HashRouter>
    )
};

export default Main
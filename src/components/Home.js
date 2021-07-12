import React from 'react'
import Nav from './Nav'
import Silde from './Silde'
import Content from './Content'

const Home = () => {
    return (
        <>
            <Nav />
            <div id="layoutSidenav">
                <Silde />
                <Content />
            </div>
        </>
    )
}

export default Home

import React, { Component } from 'react'
import NavBarComponent from '../components/navbar_component';
import Footer from '../components/footer';
import HomeComponent from '../components/home_component';

export class HomePage extends Component {
    render() {
        return (
            <div>
                <NavBarComponent/>
                <HomeComponent/>
                <Footer/>
            </div>
        )
    }
}

export default HomePage

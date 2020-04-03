import React, { Component } from 'react'
import NavBarComponent from '../components/navbar_component';
import Footer from '../components/footer';
import PastArticlesComponent from '../components/past_articles_component';

export class PasrArticlesPage extends Component {
    render() {
        return (
            <div>
                <NavBarComponent/>
                <PastArticlesComponent/>
                <Footer/>
            </div>
        )
    }
}

export default PasrArticlesPage

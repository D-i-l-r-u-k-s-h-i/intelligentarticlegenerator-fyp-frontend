import React, { Component } from 'react'
import NavBarComponent from '../components/navbar_component';
import Footer from '../components/footer';
import PastArticlesComponent from '../components/past_articles_component';

export class PasrArticlesPage extends Component {
    render() {
        return (
            <div>
                <div className='page-wrap'>
                <NavBarComponent/>
                <PastArticlesComponent/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default PasrArticlesPage

import React, { Component } from 'react'
import NavBarComponent from '../components/navbar_component';
import Footer from '../components/footer';
import AdminComponent from '../components/admin_component';

export class AdminPage extends Component {
    render() {
        return (
            <div>
                <div className='page-wrap'>
                    <NavBarComponent />
                    <AdminComponent />
                </div>
                <Footer />
            </div>
        )
    }
}

export default AdminPage

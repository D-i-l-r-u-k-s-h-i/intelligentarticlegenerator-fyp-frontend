import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import SignupComponent from '../components/signup_component';

export class SignupPage extends Component {
    render() {
        return (
            <div>
                <SignupComponent/>
            </div>
        )
    }
}

export default withRouter (SignupPage)

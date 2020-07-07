import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class AdminComponent extends Component {
    render() {
        return (
            <div>
                <section>
                <div className="center">
                    <Link to={{
                        pathname: '/signup',
                        // state: {
                        //     property: this.state.property
                        // }
                    }}
                        id="submit"
                        type="submit"
                        className="btn btn-primary btn-lg"
                    >Register New User</Link><br />
                </div>
            </section>
            </div>
        )
    }
}

export default AdminComponent

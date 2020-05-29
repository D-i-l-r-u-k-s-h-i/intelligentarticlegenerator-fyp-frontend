import React from 'react'
import {NavDropdown, Navbar,Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBarComponent() {
    function loginBtn(){
        return(
            <Nav className="ml-auto">
                <Nav.Link href="/">Login</Nav.Link>
            </Nav>
        )
    }

    function content(){
        return(
            <Nav className="ml-auto">
                <Nav.Item className="p-2 mb-1 text-white">{localStorage.getItem("user")}</Nav.Item>
                
                <NavDropdown title="&#9881; Options" id="nav-dropdown" >
                    <LinkContainer to={{
                        pathname: '/pastarticles',
                        
                    }}>
                        <NavDropdown.Item eventKey="4.1">Past Articles</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer onClick={() => {

                        localStorage.removeItem("@token")
                        localStorage.clear()

                    }} to={{
                        pathname: '/',
                    }}>
                        <NavDropdown.Item eventKey="4.4">Logout</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
                {localStorage.getItem("roleId") == 1 ? <Nav.Link href='/admin' >Dashboard</Nav.Link>:"``````"}
            </Nav>
        )
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">&#10073;ntelligent &#x212B;rticle Generator &#x270F;</Navbar.Brand>
                {/* <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav> */}
                {localStorage.getItem("jwt")?content():loginBtn()}
            </Navbar>
            <br />
        </div>
    )
}

export default NavBarComponent
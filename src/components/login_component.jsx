import React, { Component } from 'react'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { loginActions } from '../actions'
import { Alert } from 'reactstrap'

export class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            uname:null,
            pass:null,
            loginState:null,
            visible:false,
        }
    }

    static getDerivedStateFromProps(nextProps,prevState){
        console.log(nextProps)
        if(prevState.loginState===null){
            return{
                loginState: nextProps.loginData
            }
        }else return null
    }

    handleUsername=(e)=>{
        this.setState({uname:e.target.value})
    }

    handlePassword=(e)=>{
        this.setState({pass:e.target.value})
    }

    handleloginBtnClick=(e)=>{
        e.preventDefault();
        // debugger
        this.props.loginActions.login(this.state)
        
    }

    componentDidUpdate(prevProps){
        console.log(prevProps)
        console.log(this.props)
        if(this.state.loginState && prevProps.loginData==this.state.loginState && this.state.loginState.accessToken==undefined){
            this.setState({
                visible:true
            })
        }
    }

    onDismiss = () =>{
        this.setState({
            visible:false
        })
    }

    render() {
        return (
            <div>
                <Form className="login-form">
                    <h1><span className="font-weight-bold">Intelligent Article &#x270D; Generator</span></h1>
                    <h2 className="text-center">Sign in</h2>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input onChange={this.handleUsername} type="text" placeholder="Username"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input onChange={this.handlePassword} type="password" placeholder="Password"/>
                    </FormGroup>
                    <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {this.state.loginState}
                    </Alert>
                    <Button className="btn-lg btn-dark btn-block" onClick={this.handleloginBtnClick} type="submit">Log in</Button>
                    <div className="text-center"><hr/>
                        <a href="/signup">Sign Up</a>
                        <span className="p-2">|</span>
                        <a href="/forgot-password">Forgot Password</a>
                    </div>
                    </Form>
            </div>
        )
    }
}
function mapDispatchToProps (dispatch){
    return{
        loginActions: bindActionCreators(loginActions,dispatch)
    }
}


function mapStateToProps (state){
    return{
        ...state.Login,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginComponent))
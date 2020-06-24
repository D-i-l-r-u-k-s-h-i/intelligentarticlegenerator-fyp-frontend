import {Button, Form, FormGroup, Label, Input,ButtonGroup,FormFeedback,FormText} from 'reactstrap';
import React, { Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { signUpActions } from '../actions'
import {Toast} from 'react-bootstrap'

export class SignupComponent extends Component {

    constructor(props){
        super(props);
        this.state={ 
            email:null,
            username:null,
            password:null,
            confirm_pass:null,
            fname:null,
            lname:null,
            signupState:null,
            validate:{
                emailState:'',
                confirm_passState:'',
            },
            required_inputs:false,
            visible:false,
        }
    }
    
    checkRequiredInputs=()=>{
        const {email,username,password,confirm_pass,validate}=this.state

        if(email!=null && username !=null && password!=null && confirm_pass!=null && validate.emailState!='has-danger' && validate.confirm_passState!='has-danger'){
            this.setState({required_inputs:true})
            return true
        }
    }

    static getDerivedStateFromProps(nextProps,prevState){
        console.log(nextProps)
        if(prevState.signupState===null){
            return{
                signupState: nextProps.SignUpData
            }
        }else return null
    }

    handleEmail=(e)=>{
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
          if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
          } else {
            validate.emailState = 'has-danger'
          }
        this.setState({ validate })

        this.setState({email:e.target.value})
        this.checkRequiredInputs()
    }
    handleUsername=(e)=>{
        this.setState({username:e.target.value})
        this.checkRequiredInputs()
    }
    
    handlePassword=(e)=>{
        this.setState({password:e.target.value})
        this.checkRequiredInputs()
    }
    handleConfirmPassword=(e)=>{
        const { validate, password } = this.state
          if (password == e.target.value) {
            validate.confirm_passState = 'has-success'
          } else {
            validate.confirm_passState = 'has-danger'
          }
        this.setState({ validate })
        this.setState({confirm_pass:e.target.value})
        this.checkRequiredInputs()
    }

    handleSignUpBtnClick=(e)=>{
        e.preventDefault();
        this.setState({
            visible:true
        })
        this.props.signUpActions.signUp(this.state)
    }

    render() {
        console.log(this.state)
        let toastClose = () => this.setState({ visible: false });
        return (
            <div className='background_container'>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        position: 'relative',
                        minHeight: '0px',
                    }}>
                    <Toast show={this.state.visible} onClose={toastClose} autohide={true}
                        style={{
                            position: 'fixed',
                            top: '100px',
                            right: '100px',
                            'z-index': '1'
                        }}>
                        <Toast.Header>
                        </Toast.Header>
                        <Toast.Body>{this.props.SignUpData && this.props.SignUpData}</Toast.Body>
                    </Toast>
                </div>
                <div className='app-card app-card-content'>
                    <div className='app-card-content-inner'>
                        <div className="app-form-item">
                            <Form onSubmit={this.loginhandler}>
                                <h1><span className="font-weight-bold">Intelligent Article &#x270D; Generator</span></h1>
                                <h2 className="text-info">Sign Up</h2><hr/>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input onChange={this.handleEmail} type="email" placeholder="email" valid={ this.state.validate.emailState === 'has-success' } invalid={ this.state.validate.emailState === 'has-danger' } required/>
                                    <FormFeedback invalid>
                                        Uh oh! Looks like there is an issue with your email. Please input a correct email.
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input onChange={this.handleUsername} type="text" placeholder="username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input onChange={this.handlePassword} type="password" placeholder="password" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Confirm Password</Label>
                                    <Input onChange={this.handleConfirmPassword} type="password" placeholder="Confirm Password" valid={ this.state.validate.confirm_passState === 'has-success' } invalid={ this.state.validate.confirm_passState === 'has-danger' } />
                                    <FormFeedback invalid>
                                        Passwords doesn't match. Sorry!
                                    </FormFeedback>
                                </FormGroup>
                                
                                {this.state.required_inputs ? null:<FormText>All Fields are required to be filled.</FormText>}
                                <hr />
                                {this.state.required_inputs ? <Button onClick={this.handleSignUpBtnClick} className="btn-lg btn-dark btn-block" type="submit">Sign Up</Button>:<Button onClick={this.handleSignUpBtnClick} className="btn-lg btn-dark btn-block" type="submit" disabled>Sign Up</Button>}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return{
        signUpActions: bindActionCreators(signUpActions,dispatch)
    }
}


function mapStateToProps (state){
    return{
        ...state.SignUp,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignupComponent))

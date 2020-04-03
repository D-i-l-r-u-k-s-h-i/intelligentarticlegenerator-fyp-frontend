import React, { Component } from 'react'
import { Modal ,Button} from 'react-bootstrap'
// import { addAdminActions} from '../actions'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { withRouter} from 'react-router-dom'
import {Form, FormGroup, Label, Input} from 'reactstrap';

export class EditLmResultModal extends Component {
    constructor(props){
        super(props);
        this.state={ 
            editedData:null,
            
        }
    }

    handleTextArea=(e)=>{
        this.setState({editedData:e.target.value})
    }

    onSubmitClick=()=>{

        this.props.onHide()
    }

    render() {
        console.log(this.props)

        return (
            <div>
                <Modal {...this.props} animation={false}>

                    <Modal.Body>
                    <Form onSubmit={this.loginhandler}>
                                <h2><span className="font-weight-bold">Edit To Give Proper context</span></h2>
                                <FormGroup>
                                    <Label>Details Check</Label>
                                    <Input onChange={this.handleTextArea} type="textarea" defaultValue={this.props.props}/>
                                </FormGroup>
                                
                                <Button onClick={this.onSubmitClick} className="btn-lg btn-dark btn-block" type="submit">Submit</Button>
                            </Form>
                            {/* <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}> */}
                        {/* {this.props.SignUpData} */}
                    {/* </Alert> */}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default EditLmResultModal

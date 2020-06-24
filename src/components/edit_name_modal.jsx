import React, { Component } from 'react'
import { Modal ,Button} from 'react-bootstrap'
import {Form, FormGroup, Label, Input} from 'reactstrap';
import { editNameActions } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'

export class EditNameModal extends Component {
    constructor(props){
        super(props);
        this.state={ 
            editedData:null,
            
        }
    }

    handleInput=(e)=>{
        this.setState({editedData:e.target.value})
    }

    onSubmitClick=()=>{
        let obj={
            editedName:this.state.editedData,
            articleId:this.props.props.itemId
        }

        this.props.editNameActions.editName(obj)
    }

    render() {
        console.log(this.props.props.itemId)
        return (
            <div>
                <Modal {...this.props} animation={false}>
                
                <Modal.Body>
                <Form onSubmit={this.loginhandler}>
                                <h2><span className="font-weight-bold">Edit Article Name</span></h2>
                                <FormGroup>
                                    <Label>Article Name</Label>
                                    <Input onChange={this.handleInput} type="text" defaultValue={this.props.props.itemName}/>
                                </FormGroup>
                                
                                <Button onClick={this.onSubmitClick} className="btn-lg btn-dark btn-block" type="button">Update</Button>
                            </Form>
                </Modal.Body>
            </Modal>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return{
        editNameActions: bindActionCreators(editNameActions,dispatch),
    }
}


function mapStateToProps (state){
    return{
        ...state.Article,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (EditNameModal))

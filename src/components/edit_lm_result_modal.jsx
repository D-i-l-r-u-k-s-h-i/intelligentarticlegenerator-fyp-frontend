import React, { Component } from 'react'
import { Modal ,Button} from 'react-bootstrap'
import { getGeneratedArticleActions } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
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
        let obj={
            details:this.state.editedData,
            length:this.props.stateAsProps.length,
            temperature:this.props.stateAsProps.temperature,
            samples:this.props.stateAsProps.samples,
        }

        this.props.onSubmitClickk()
        this.props.getGeneratedArticleActions.getGeneratedArticles(obj)
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
                                
                                <Button onClick={this.onSubmitClick} className="btn-lg btn-dark btn-block" type="button">Submit</Button>
                            </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return{
        getGeneratedArticleActions: bindActionCreators(getGeneratedArticleActions,dispatch)
    }
}


function mapStateToProps (state){
    return{
        ...state.LMResult,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (EditLmResultModal))

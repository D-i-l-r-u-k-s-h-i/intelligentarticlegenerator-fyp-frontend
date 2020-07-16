import React, { Component } from 'react'
import {Form, FormGroup, Label, Input,Alert} from 'reactstrap';
import { Modal ,Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { saveArticleActions} from '../actions'

export class SaveArticleNameModal extends Component {
    constructor(props){
        super(props);
        this.state={ 
            articleName:null,
            visible:false,
        }
    }

    handleArticleName=(e)=>{
        this.setState({articleName:e.target.value})
    }

    onDismiss = () =>{
        this.setState({
            visible:false
        })
        this.props.onHide()
    }

    onSaveClick=()=>{
        this.setState({
            visible:true
        })

        console.log(this.props.props)
        
        let obj={
            articleText:this.props.props.item,
            articlename:this.state.articleName
        }

        this.props.saveArticleActions.saveArticle(obj)
    }

    render() {
        return (
            <div>
                <Modal {...this.props} animation={false}>

                    <Modal.Body>
                        <Form onSubmit={this.loginhandler}>
                            <h2><span className="font-weight-bold">Edit To Give Proper context</span></h2>
                            <FormGroup>
                                <Label>Article Name:</Label>
                                <Input onChange={this.handleArticleName} type="text" placeholder="Enter Article Name" />
                            </FormGroup>

                            <Button onClick={this.onSaveClick} className="btn-lg btn-dark btn-block" type="button">Save</Button>

                        </Form>
                        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                            {this.props.articleData && this.props.articleData}
                        </Alert>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return{
        saveArticleActions: bindActionCreators(saveArticleActions,dispatch),
    }
}


function mapStateToProps (state){
    return{
        ...state.Article,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (SaveArticleNameModal))

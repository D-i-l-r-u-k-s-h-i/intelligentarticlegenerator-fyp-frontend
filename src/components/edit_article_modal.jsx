import React, { Component } from 'react'
import { Alert } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react';
import { Modal ,Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { editArticleActions} from '../actions'

export class EditArticleModal extends Component {
    constructor(props){
        super(props);
        this.state={ 
            articleid:this.props.props.itemId && this.props.props.itemId!=undefined? this.props.props.itemId:this.props.props.articleid,
            articleContent:null,
            visible:false,
        }
    }

    handleEditorChange = (content, editor) => {
        // console.log(editor);
        this.setState({articleContent:content})
    }

    onDismiss = () =>{
        this.setState({
            visible:false
        })
        // this.props.onHide()
        window.location.reload();
    }

    onSaveClick=()=>{
        this.setState({
            visible:true
        })

        this.props.editArticleActions.editArticle(this.state)
    }

    componentDidUpdate(prevProps,prevState){
        console.log(prevState)

        console.log(prevProps)
        
        if(this.props.props.itemId != prevProps.props.itemId){
            this.setState({
                articleid:this.props.props.itemId,
            })
        }
        
        console.log(this.props)

        console.log(this.state)
    }

    render() {

        console.log(this.props)

        return (
            <div>
                <Modal {...this.props} animation={false}>
                
                    <Modal.Body>
                        <Editor
                            initialValue={`<p>${this.props.props.item !=undefined? this.props.props.item.caption:this.props.htmlData}</p>`}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={this.handleEditorChange}
                        />

                        <Button onClick={this.onSaveClick} className="btn-lg btn-dark btn-block" type="button">Save</Button>

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
        editArticleActions: bindActionCreators(editArticleActions,dispatch),
    }
}


function mapStateToProps (state){
    return{
        ...state.Article,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (EditArticleModal))

import React, { Component } from 'react'
import { Alert } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react';
import { Modal ,Button, OverlayTrigger,Popover} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { editArticleActions} from '../actions'
import { EmailShareButton,EmailIcon,FacebookShareButton,FacebookIcon,
    LinkedinIcon,LinkedinShareButton,RedditShareButton,RedditIcon,
    TwitterShareButton,TwitterIcon,ViberShareButton,ViberIcon,WhatsappShareButton,WhatsappIcon} from 'react-share'

export class EditArticleModal extends Component {
    constructor(props){
        super(props);
        this.state={ 
            articleid:this.props.props.itemId && this.props.props.itemId!=undefined? this.props.props.itemId:this.props.props.articleid,
            articleContent:null,
            nonHTMLContent:null,
            visible:false,
        }
    }

    handleEditorChange = (content, editor) => {
        console.log(editor.getContent({format : 'text'}));
        this.setState({articleContent:content,nonHTMLContent:editor.getContent({format : 'text'})})
    }

    onDismiss = () =>{
        this.setState({
            visible:false
        })
        // this.props.onHide()
        if (this.props.props.item == undefined){
            window.location.reload()
        }
        
    }

    onSaveClick=()=>{
        this.setState({
            visible:true
        })

        this.props.editArticleActions.editArticle(this.state)
    }

    componentDidUpdate(prevProps,prevState){
        // console.log(prevState)

        // console.log(prevProps)
        
        if(this.props.props.itemId != prevProps.props.itemId){
            this.setState({
                articleid:this.props.props.itemId,
                nonHTMLContent:null,
                articleContent:null
            })
        }
        
        // console.log(this.props)

        // console.log(this.state)
    }

    strip=(html)=>{
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
     }
    

    render() {
        let {nonHTMLContent,articleContent}=this.state

        console.log(this.strip(this.props.htmlData))
        console.log(this.props.props.item)

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Share using...</Popover.Title>
                <Popover.Content>
                <div>
        <FacebookShareButton
          url={" "}
          quote={articleContent && this.props.props.item !=undefined ?nonHTMLContent:articleContent==null && this.props.props.item !=undefined ?this.props.props.item:nonHTMLContent!=null?nonHTMLContent:this.strip(this.props.htmlData)}
          hashtag={"#generated_news"}
        >
          <FacebookIcon size="2.5rem" logoFillColor="white" round={true}/>
        </FacebookShareButton>
        <TwitterShareButton
          url={" "}
          title={articleContent && this.props.props.item !=undefined ?nonHTMLContent:articleContent==null && this.props.props.item !=undefined ?this.props.props.item:nonHTMLContent!=null?nonHTMLContent:this.strip(this.props.htmlData)}
        >
          <TwitterIcon size="2.5rem" round={true}/>
        </TwitterShareButton>
        <WhatsappShareButton
          url={" "}
          title={articleContent && this.props.props.item !=undefined ?nonHTMLContent:articleContent==null && this.props.props.item !=undefined ?this.props.props.item:nonHTMLContent!=null?nonHTMLContent:this.strip(this.props.htmlData)}
        >
          <WhatsappIcon size="2.5rem" round={true}/>
        </WhatsappShareButton>
        <ViberShareButton
          url={" "}
          title={articleContent && this.props.props.item !=undefined ?nonHTMLContent:articleContent==null && this.props.props.item !=undefined ?this.props.props.item:nonHTMLContent!=null?nonHTMLContent:this.strip(this.props.htmlData)}
        >
          <ViberIcon size="2.5rem" round={true}/>
        </ViberShareButton>
        <EmailShareButton
          url={" "}
          subject={"Check this news Article"}
          body={articleContent && this.props.props.item !=undefined ?nonHTMLContent:articleContent==null && this.props.props.item !=undefined ?this.props.props.item:nonHTMLContent!=null?nonHTMLContent:this.strip(this.props.htmlData)}
        >
          <EmailIcon size="2.5rem" round={true}/>
        </EmailShareButton>
        <RedditShareButton
          url={" "}
          title={articleContent && this.props.props.item !=undefined ?nonHTMLContent:articleContent==null && this.props.props.item !=undefined ?this.props.props.item:nonHTMLContent!=null?nonHTMLContent:this.strip(this.props.htmlData)}
        >
          <RedditIcon size="2.5rem" round={true}/>
        </RedditShareButton>
        <LinkedinShareButton
          url={" "}
          title={"Check this Article out"}
          summary={articleContent && this.props.props.item !=undefined ?nonHTMLContent:articleContent==null && this.props.props.item !=undefined ?this.props.props.item:nonHTMLContent!=null?nonHTMLContent:this.strip(this.props.htmlData)}
          source={"Edited using Article Generator"}
        >
          <LinkedinIcon size="2.5rem" round={true}/>
        </LinkedinShareButton>
      </div>
              </Popover.Content>
            </Popover>
        );

        console.log(this.props)

        return (
            <div>
                <Modal {...this.props} animation={false}>
                
                    <Modal.Body>
                        <Editor
                            initialValue={`<p>${this.props.props.item !=undefined? this.props.props.item:this.props.htmlData}</p>`}
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
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                            <Button className="btn-lg btn-dark btn-block" variant="success">Share</Button>
                        </OverlayTrigger>

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

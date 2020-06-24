import React, { Component } from 'react'
import { Table ,Container} from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { downloadArticleActions,getArticleActions,getHtmlActions} from '../actions'
import { saveAs } from 'file-saver';
import EditArticleModal from './edit_article_modal';
import EditNameModal from './edit_name_modal';

export class PastArticlesComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            articlesData:null,
            modalShow: false,
            contentData:null,
            editModalShow: false,
            htmlData:null,
            itemId:null,
            itemName:null,
            editNameModalShow:false
        }
    }

    componentDidMount(){
        this.props.getArticleActions.getArticles(this.state)
    }

    onDownloadClick=(item)=>{
        // console.log(item.id)
        this.props.downloadArticleActions.downloadArticle(item.id)
    }

    onFileClick=(item)=>{
        //display pdf
        // console.log(item.articleFile)
        let arrrayBuffer = this.base64ToArrayBuffer(item.articleFile);
        
        let blob = new Blob([arrrayBuffer], { type: "application/pdf" });
        let link = window.URL.createObjectURL(blob);
        // console.log(link)
        window.open(link, '_blank');
    }

    base64ToArrayBuffer=(base64)=> {
        let binaryString = window.atob(base64);
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }
    

    onEditClick=(item)=>{
        this.setState({
            itemId:item.id,
        })
        
        //gets html content of article
        this.props.getHtmlActions.getHTMLText(item.id)

    }

    onEditNameClick=(item)=>{
        this.setState({
            itemId:item.id,
            itemName:item.articleName,
            editNameModalShow:true
        })
        
        //gets html content of article
        // this.props.getHtmlActions.getHTMLText(item.id)

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps)
        let newProps={}
        if (nextProps.articlesData && nextProps.articlesData !== prevState.articlesData) {
            newProps.articlesData = nextProps.articlesData
        }

        if (nextProps.htmlData && nextProps.htmlData !== prevState.htmlData) {
            newProps.htmlData = nextProps.htmlData
        }
        // if (nextProps.location.hash && (nextProps.location.hash !== prevState.hash)) {
        //     return {
        //         hash: nextProps.location.hash
        //     }
        // }
        if(newProps.articlesData){
            return{
               loaded: true,
               htmlData:newProps.htmlData,
               articlesData:newProps.articlesData,
            }
        }
        if(newProps.htmlData){
            return{
               htmlData:newProps.htmlData,
            }
        }
        // console.log(newProps)
        return {
            ...newProps
        };
    }

    componentDidUpdate(prevProps,prevState){
        console.log(prevState)
        if(this.props.contentData!=prevProps.contentData){
            var blob = new Blob([this.props.contentData], { type: "text/pdf" });
            saveAs(blob, `Article${Date()}`)
        }

        if(this.props.htmlData!=prevProps.htmlData){
            this.setState({
                editModalShow:true,
            })
        }
        
    }

    render() {
        // console.log(this.state)
        let {articlesData}=this.state
        let editModalClose = () => this.setState({ editModalShow: false });
        let editNameModalClose = () => this.setState({ editNameModalShow: false });

        return (
            <div>
                <Container>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Article Name</th>
                                <th>File(Last Modified Date)</th>
                                <th>Edit Article</th>
                                <th>Download Article</th>
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articlesData && Array.isArray(articlesData) && articlesData.map(property => {
                                return (
                                    <tr>
                                        <td>{property.articleName}{'   '}<button type="button" style={{'font-size':'20px'}} onClick={() => this.onEditNameClick(property)} className="btn btn-light btn-sm">&#9998;</button></td>
                                        <td><a href='#' onClick={()=>this.onFileClick(property)}>{property.dateTime}</a></td>
                                        <td><button type="button" onClick={() => this.onDownloadClick(property)} className="btn btn-success btn-lg">Download</button></td>
                                        <td><button type="button" onClick={() => this.onEditClick(property)} className="btn btn-secondary btn-lg">Edit</button></td>
                                        <td>{property.createdDate}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <EditArticleModal show={this.state.editModalShow} props={this.state} onHide={editModalClose}/>
                    <EditNameModal show={this.state.editNameModalShow} props={this.state} onHide={editNameModalClose}/>
                </Container>
                
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return{
        downloadArticleActions: bindActionCreators(downloadArticleActions,dispatch),
        getArticleActions:bindActionCreators(getArticleActions,dispatch),
        getHtmlActions:bindActionCreators(getHtmlActions,dispatch),
    }
}


function mapStateToProps (state){
    return{
        ...state.Article,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (PastArticlesComponent))

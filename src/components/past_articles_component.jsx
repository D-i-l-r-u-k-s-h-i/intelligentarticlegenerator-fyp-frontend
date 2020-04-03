import React, { Component } from 'react'
import { Table ,Container} from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { downloadArticleActions,getArticleActions} from '../actions'

export class PastArticlesComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            articleData:null,
            modalShow: false,
            
        }
    }

    componentDidMount(){
        this.props.getArticleActions.getArticles(this.state)
    }

    onDownloadClick=(item)=>{
        console.log(item)
        // this.props.downloadArticleActions.downloadArticle(obj)

        // var blob = new Blob([this.state.item.caption], { type: "text/pdf" });
        // saveAs(blob, `Article${Date()}`)
    }

    onFileClick=()=>{
        //display pdf
        console.log("display pdf")
    }

    onEditClick=(item)=>{
        console.log(item)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps)
        let newProps={}
        if (nextProps.articleData && nextProps.articleData !== prevState.articleData) {
            newProps.articleData = nextProps.articleData
        }
        // if (nextProps.location.hash && (nextProps.location.hash !== prevState.hash)) {
        //     return {
        //         hash: nextProps.location.hash
        //     }
        // }
        if(newProps.articleData){
            return{
               loaded: true,
               articleData:newProps.articleData,
            }
        }
        // console.log(newProps)
        return {
            ...newProps
        };
    }

    render() {
        let {articleData}=this.state

        return (
            <div>
                <Container>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>File</th>
                                <th>Edit Article</th>
                                <th>Download Article</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articleData && articleData.map(property => {
                                return (
                                    <tr>
                                        <td><a href='#' onClick={this.onFileClick}>{property.dateTime}</a></td>
                                        <td><button type="button" onClick={() => this.onDownloadClick(property)} className="btn btn-success btn-lg">Download</button></td>
                                        <td><button type="button" onClick={() => this.onEditClick(property)} className="btn btn-secondary btn-lg">Edit</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
                
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return{
        downloadArticleActions: bindActionCreators(downloadArticleActions,dispatch),
        getArticleActions:bindActionCreators(getArticleActions,dispatch),
    }
}


function mapStateToProps (state){
    return{
        ...state.Article,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (PastArticlesComponent))

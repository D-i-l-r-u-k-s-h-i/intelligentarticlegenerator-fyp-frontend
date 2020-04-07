import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { lmResultActions,getGeneratedArticleActions } from '../actions'
import { Container ,Row,Col,Form,FormGroup,Input,Label,Button,Alert} from 'reactstrap';
import {Spinner} from 'react-bootstrap'
import GeneratedComponent from './generated_component';
import EditLmResultModal from './edit_lm_result_modal';

export class HomeComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            lmData:null,
            length:null,
            temperature:null,
            samples:null,
            details:null,
            modalShow: false,
            componentShow:false,
            loading:false,
        }
    }

    handleLength=(e)=>{
        this.setState({length:e.target.value})
    }
    handleTemperature=(e)=>{
        this.setState({temperature:e.target.value})
    }
    
    handleSamples=(e)=>{
        this.setState({samples:e.target.value})
    }
    handleTextArea=(e)=>{
        this.setState({details:e.target.value})
    }

    onGenerateClick=()=>{
        this.setState({
            visible:true
        })
        this.props.lmResultActions.lmResult(this.state)// pass the text
    }

    onDismiss = () =>{
        this.setState({
            visible:false
        })
        // window.location.reload();
    }

    onSubmitClick=()=>{
        this.props.getGeneratedArticleActions.getGeneratedArticles(this.state)
        this.setState({
            loading:true
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.generatedData != prevProps.generatedData){
            console.log(this.props.generatedData)
            this.setState({
                loading:false,
                componentShow :true,
            })
        }
        
    }

    render() {

        let modalClose = () => this.setState({ modalShow: false });
        let showSpinner=()=>this.setState({loading:true});

        return (
            <div>
                <Container className="themed-container">
                    <Form>
                        <Row xs="1" sm="2" md="2">
                            <Col>
                                <FormGroup>
                                    <Label for="exampleText">Enter Article Details</Label>
                                    <Input onChange={this.handleTextArea} type="textarea" name="text" id="exampleText" />
                                </FormGroup>
                                <Button onClick={this.onGenerateClick}>Generate</Button><br/><br/>
                                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                                    {this.props.lmData!=null?null:<Spinner animation="border" />}
                                    {this.props.lmData && this.props.lmData.completed_text}
                                    <hr/>
                                    <div className="text-muted"><small>Click Submit if the sentence generated gives correct context or Press edit to give proper context.</small></div>
                                    <button type="button" onClick={() => this.setState({ modalShow: true })} class="btn btn-secondary btn-sm float-right">Edit</button>
                                    <button type="button" onClick={this.onSubmitClick} class="btn btn-info btn-sm mr-2 float-right">Submit</button>
                                    <hr/>
                                </Alert>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="length">Length</Label>
                                    <Input onChange={this.handleLength} type="number" name="length" id="examplelength" placeholder="Enter the word count" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="samples">No. of samples</Label>
                                    <Input onChange={this.handleSamples} type="number" name="samples" id="examplesamples" placeholder="Enter no. of samples to be generated" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="temperature">Linguistic Variety</Label>
                                    <Input onChange={this.handleTemperature} type="number" name="temperature" id="exampletemp" placeholder="Enter a value between 0 & 1" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                    <hr/><br/><br/><br/><br/>
                    {this.state.loading?<Spinner animation="border" />:null}
                    {this.state.componentShow ?<GeneratedComponent props={this.props.generatedData && this.props.generatedData}/>:null}
                    <EditLmResultModal show={this.state.modalShow} props={this.props.lmData && this.props.lmData.completed_text} stateAsProps={this.state} onHide={modalClose} onSubmitClickk={showSpinner}/>
                </Container>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return{
        lmResultActions: bindActionCreators(lmResultActions,dispatch),
        getGeneratedArticleActions: bindActionCreators(getGeneratedArticleActions,dispatch)
    }
}


function mapStateToProps (state){
    return{
        ...state.LMResult,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomeComponent))

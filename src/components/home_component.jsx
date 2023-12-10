import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { cancelRequestActions,getGeneratedArticleActions } from '../actions'
import { Container ,Row,Col,Form,FormGroup,Input,Label,Button,FormFeedback,FormText} from 'reactstrap';
import {Spinner} from 'react-bootstrap'
import GeneratedComponent from './generated_component';
// import EditLmResultModal from './edit_lm_result_modal';'

export class HomeComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            lmData:null,
            length:null,
            paragraphs:null,
            // temperature:null,
            samples:null,
            details:null,
            modalShow: false,
            componentShow:false,
            loading:false,
            showSpinner:false,
            validate:{
                // temperatureState:'',
                samplesState:'',
                lengthState:'',
                // paragraphState:'',
            },
            required_inputs:false,
            submit_sequence:null,
            disabled: false,
            generate_clicked:false
        }
    }

    checkRequiredInputs=()=>{
        const {details,validate}=this.state

        if(details!=null && validate.samplesState!='has-danger' && validate.lengthState!='has-danger'){
            this.setState({required_inputs:true})
            return true
        }
    }

    handleLength=(e)=>{
        const lengthRex =  /^([1-9][0-9]{0,2}|1000)$/;
        const { validate } = this.state
          if (lengthRex.test(e.target.value)) {
            validate.lengthState = 'has-success'
          } else {
            validate.lengthState = 'has-danger'
          }
        this.setState({ validate })
        this.setState({length:e.target.value})
    }
    // handleTemperature=(e)=>{
    //     const tempRex = /^(1(\.[0-8]{1,2})?|1(\.8{1,2})?)$/;
    //     const { validate } = this.state
    //       if (tempRex.test(e.target.value)) {
    //         validate.temperatureState = 'has-success'
    //       } else {
    //         validate.temperatureState = 'has-danger'
    //       }
    //     this.setState({ validate })

    //     this.setState({temperature:e.target.value})
    // }
    
    handleSamples=(e)=>{
        const sampleRex =  /^0*([1-5])$/;
        const { validate } = this.state
          if (sampleRex.test(e.target.value)) {
            validate.samplesState = 'has-success'
          } else {
            validate.samplesState = 'has-danger'
          }
        this.setState({ validate })
        this.setState({samples:e.target.value})
    }

    // handleParagraphs=(e)=>{
    //     const sampleRex =  /^[0-9]+$/;
    //     const { validate } = this.state
    //       if (sampleRex.test(e.target.value)) {
    //         validate.paragraphState = 'has-success'
    //       } else {
    //         validate.paragraphState = 'has-danger'
    //       }
    //     this.setState({ validate })
    //     this.setState({paragraphs:e.target.value})
        
    // }

    handleTextArea=(e)=>{
        this.setState({details:e.target.value})
        this.checkRequiredInputs()
    }

    onCancelClick=()=>{
        this.setState({
            disabled: false,
            generate_clicked:false,
            loading:false
        })
        this.props.cancelRequestActions.cancelRequest(this.state)
    }

    // onDismiss = () =>{
    //     this.setState({
    //         visible:false,
    //         showSpinner:false
    //     })
    //     // window.location.reload();
    // }

    onGenerateClick=()=>{
        this.setState({componentShow:false})
        let obj={
            submit_sequence:this.state.details,
            length:this.state.length,
            temperature:this.state.temperature,
            samples:this.state.samples
        }
        
        this.props.getGeneratedArticleActions.getGeneratedArticles(obj)
        this.setState({
            loading:true,
            disabled: !this.state.disabled,
            generate_clicked:true
        })
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.generatedData != prevProps.generatedData){
            console.log(this.props.generatedData)
            this.setState({
                loading:false,
                componentShow :true,
                disabled: false,
                generate_clicked:false
            })
        }
        
        // if(this.props.lmData != prevProps.lmData){
        //     this.setState({
        //         showSpinner:false
        //     })
        // }

        if(prevState.details != this.state.details && this.state.details==""){
            this.setState({
                required_inputs:false
            })
        }
        
    }
    // renderTooltip=(props)=> {
    //     return (
    //       <Tooltip id="button-tooltip" {...props}>
    //         Linguistic variety- controls the diversity/randomness of word predictions generated. High value entered will give more surprising text while low values will give more accurate and predictable text.
    //       </Tooltip>
    //     );
    //   }

    render() {

        // let modalClose = () => this.setState({ modalShow: false });
        // let showSpinner=()=>this.setState({loading:true});
        // loadProgressBar()
        console.log(this.props.generatedData)
        
        return (
            <div>
                <Container className="themed-container">
                    <Form>
                        <Row xs="1" sm="2" md="2">
                            <Col>
                                <FormGroup>
                                    <Label for="exampleText">Enter Article Details</Label>
                                    <Input onChange={this.handleTextArea} type="textarea" name="text" id="exampleText" rows="10" disabled = {(this.state.disabled)? "disabled" : ""}/>
                                </FormGroup>
                                {this.state.required_inputs ? null : <FormText className='text-white'>Add in the details to start generating the article.</FormText>}<br />
    
                                {this.state.required_inputs && this.state.generate_clicked? <div><Button onClick={this.onGenerateClick} disabled>Generate</Button><button type="button" className='btn btn-outline-secondary ml-3' onClick={this.onCancelClick}>Cancel</button></div>:this.state.required_inputs?<Button onClick={this.onGenerateClick}>Generate</Button>:<Button onClick={this.onGenerateClick} disabled>Generate</Button>}<br/><br/>
                                
                                {/* <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                                    {this.state.showSpinner?<Spinner animation="border" />:null}
                                    {this.props.lmData && this.props.lmData.completed_text}
                                    <hr/>
                                    <div className="text-muted"><small>Click Submit if the sentence generated gives correct context or Press edit to give proper context.</small></div>
                                    <button type="button" onClick={() => this.setState({ modalShow: true })} class="btn btn-secondary btn-sm float-right">Edit</button>
                                    <button type="button" onClick={this.onSubmitClick} class="btn btn-info btn-sm mr-2 float-right">Submit</button>
                                    <hr/>
                                </Alert> */}
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="length">No. of words per sample</Label>
                                    <Input onChange={this.handleLength} type="number" name="length" id="examplelength" placeholder="Enter the word count" min="0" max="2000"
                                    valid={this.state.validate.lengthState === 'has-success'} invalid={this.state.validate.lengthState === 'has-danger'} disabled = {(this.state.disabled)? "disabled" : ""}/>
                                    <FormFeedback invalid>
                                        Please enter a positive whole number less than or equal to 2000
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="samples">No. of samples</Label>
                                    <Input onChange={this.handleSamples} type="number" name="samples" id="examplesamples" placeholder="Enter no. of samples to be generated" min="1"
                                    valid={this.state.validate.samplesState === 'has-success'} invalid={this.state.validate.samplesState === 'has-danger'}disabled = {(this.state.disabled)? "disabled" : ""}/>
                                    <FormFeedback invalid>
                                        Please enter a positive whole number less than 6
                                    </FormFeedback>
                                </FormGroup>
                                {/* <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip}
                                >
                                    <FormGroup>

                                        <Label for="temperature">Linguistic Variety</Label>
                                        <Input onChange={this.handleTemperature} type="number" name="temperature" id="exampletemp" placeholder="Enter a value between 1 & 1.8" min="1.0" step="0.1" max="1.8"
                                            valid={this.state.validate.temperatureState === 'has-success'} invalid={this.state.validate.temperatureState === 'has-danger'} />
                                        <FormFeedback invalid>
                                            Please enter only decimals between 1.0 & 1.8 up to 2 decimal places
                                    </FormFeedback>


                                    </FormGroup>
                                </OverlayTrigger> */}
                                {/* <FormGroup>

                                    <Label for="paragraphs">No. of Paragraphs</Label>
                                    <Input onChange={this.handleParagraphs} type="number" name="paragraphs" id="examplepara" placeholder="Enter No. of samples" min="1" step="1" max="10"
                                        valid={this.state.validate.paragraphState === 'has-success'} invalid={this.state.validate.paragraphState === 'has-danger'} disabled = {(this.state.disabled)? "disabled" : ""}/>
                                    <FormFeedback invalid>
                                        Please enter a positive whole number less than 10
                                    </FormFeedback>


                                </FormGroup> */}
                            </Col>
                        </Row>
                    </Form>
                    <hr/><br/><br/><br/>
                    {this.state.loading?<div className="text-center"><br/><Spinner animation="border" /><br/><br/><br/></div>:null}
                    {this.props.generatedData && Array.isArray(this.props.generatedData.generated_text) && this.state.componentShow ?<GeneratedComponent props={this.props.generatedData && this.props.generatedData} details= {this.state.details}/>:null}
                    {/* <EditLmResultModal show={this.state.modalShow} props={this.props.lmData && this.props.lmData.completed_text} stateAsProps={this.state} onHide={modalClose} onSubmitClickk={showSpinner}/> */}
                </Container>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return{
        cancelRequestActions: bindActionCreators(cancelRequestActions,dispatch),
        getGeneratedArticleActions: bindActionCreators(getGeneratedArticleActions,dispatch)
    }
}


function mapStateToProps (state){
    return{
        ...state.LMResult,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomeComponent))

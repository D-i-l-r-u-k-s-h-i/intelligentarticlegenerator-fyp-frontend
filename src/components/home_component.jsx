import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { lmResultActions,getGeneratedArticleActions } from '../actions'
import { Container ,Row,Col,Form,FormGroup,Input,Label,Button,Alert,FormFeedback,FormText} from 'reactstrap';
import {Spinner,OverlayTrigger,Tooltip} from 'react-bootstrap'
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
            showSpinner:false,
            validate:{
                temperatureState:'',
                samplesState:'',
                lengthState:'',
            },
            required_inputs:false,
            submit_sequence:null
        }
    }

    checkRequiredInputs=()=>{
        const {details,validate}=this.state

        if(details!=null && validate.samplesState!='has-danger' && validate.temperatureState!='has-danger' && validate.lengthState!='has-danger'){
            this.setState({required_inputs:true})
            return true
        }
    }

    handleLength=(e)=>{
        const lengthRex =  /^[0-9]+$/;
        const { validate } = this.state
          if (lengthRex.test(e.target.value)) {
            validate.lengthState = 'has-success'
          } else {
            validate.lengthState = 'has-danger'
          }
        this.setState({ validate })
        this.setState({length:e.target.value})
    }
    handleTemperature=(e)=>{
        const tempRex = /^(0(\.[0-9]{1,2})?|1(\.0{1,2})?)$/;
        const { validate } = this.state
          if (tempRex.test(e.target.value)) {
            validate.temperatureState = 'has-success'
          } else {
            validate.temperatureState = 'has-danger'
          }
        this.setState({ validate })

        this.setState({temperature:e.target.value})
    }
    
    handleSamples=(e)=>{
        const sampleRex =  /^[0-9]+$/;
        const { validate } = this.state
          if (sampleRex.test(e.target.value)) {
            validate.samplesState = 'has-success'
          } else {
            validate.samplesState = 'has-danger'
          }
        this.setState({ validate })
        this.setState({samples:e.target.value})
    }
    handleTextArea=(e)=>{
        this.setState({details:e.target.value})
        this.checkRequiredInputs()
    }

    onGenerateClick=()=>{
        this.setState({
            visible:true,
            showSpinner:true
        })
        this.props.lmResultActions.lmResult(this.state)// pass the text
    }

    onDismiss = () =>{
        this.setState({
            visible:false,
            showSpinner:false
        })
        // window.location.reload();
    }

    onSubmitClick=()=>{
        this.setState({componentShow:false})
        let obj={
            submit_sequence:this.props.lmData && this.props.lmData.completed_text,
            length:this.state.length,
            temperature:this.state.temperature,
            samples:this.state.samples
        }
        
        this.props.getGeneratedArticleActions.getGeneratedArticles(obj)
        this.setState({
            loading:true
        })
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.generatedData != prevProps.generatedData){
            console.log(this.props.generatedData)
            this.setState({
                loading:false,
                componentShow :true,
            })
        }
        
        if(this.props.lmData != prevProps.lmData){
            this.setState({
                showSpinner:false
            })
        }

        if(prevState.details != this.state.details && this.state.details==""){
            this.setState({
                required_inputs:false
            })
        }
        
    }
    renderTooltip=(props)=> {
        return (
          <Tooltip id="button-tooltip" {...props}>
            Linguistic variety- controls the diversity/randomness of word predictions generated. High value entered will give more surprising text while low values will give more accurate and predictable text.
          </Tooltip>
        );
      }

    render() {

        let modalClose = () => this.setState({ modalShow: false });
        let showSpinner=()=>this.setState({loading:true});

        console.log(this.props.generatedData)
        
        return (
            <div>
                <Container className="themed-container">
                    <Form>
                        <Row xs="1" sm="2" md="2">
                            <Col>
                                <FormGroup>
                                    <Label for="exampleText">Enter Article Details</Label>
                                    <Input onChange={this.handleTextArea} type="textarea" name="text" id="exampleText" rows="5"/>
                                </FormGroup>
                                {this.state.required_inputs ? null : <FormText className='text-white'>Add in the details to start generating the article.</FormText>}<br />
    
                                {this.state.required_inputs ? <Button onClick={this.onGenerateClick}>Generate</Button>:<Button onClick={this.onGenerateClick} disabled>Generate</Button>}<br/><br/>
                                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                                    {this.state.showSpinner?<Spinner animation="border" />:null}
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
                                    <Input onChange={this.handleLength} type="number" name="length" id="examplelength" placeholder="Enter the word count" min="0"
                                    valid={this.state.validate.lengthState === 'has-success'} invalid={this.state.validate.lengthState === 'has-danger'}/>
                                    <FormFeedback invalid>
                                        Please enter a positive whole number
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="samples">No. of samples</Label>
                                    <Input onChange={this.handleSamples} type="number" name="samples" id="examplesamples" placeholder="Enter no. of samples to be generated" min="1"
                                    valid={this.state.validate.samplesState === 'has-success'} invalid={this.state.validate.samplesState === 'has-danger'}/>
                                    <FormFeedback invalid>
                                        Please enter a positive whole number
                                    </FormFeedback>
                                </FormGroup>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip}
                                >
                                    <FormGroup>

                                        <Label for="temperature">Linguistic Variety</Label>
                                        <Input onChange={this.handleTemperature} type="number" name="temperature" id="exampletemp" placeholder="Enter a value between 0 & 1" min="0.0" step="0.1" max="1"
                                            valid={this.state.validate.temperatureState === 'has-success'} invalid={this.state.validate.temperatureState === 'has-danger'} />
                                        <FormFeedback invalid>
                                            Please enter only decimals between 0 & 1 up to 2 decimal places
                                    </FormFeedback>


                                    </FormGroup>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Form>
                    <hr/><br/><br/><br/>
                    {this.state.loading?<div className="text-center"><br/><Spinner animation="border" /><br/><br/><br/></div>:null}
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

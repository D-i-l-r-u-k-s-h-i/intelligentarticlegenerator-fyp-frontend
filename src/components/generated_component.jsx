import React, { Component } from 'react'
import { Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption} from 'reactstrap';
import {Container ,Row,Col} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter} from 'react-router-dom'
import { saveArticleActions} from '../actions'
import { saveAs } from 'file-saver';

import items from '../data/items'

export class GeneratedComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            activeIndex:0,
            animating:false,
            items:items.data,
            item:items.data[0]
        }
    }

    onDownloadClick=()=>{
        var blob = new Blob([this.state.item.caption], { type: "text/pdf" });
        saveAs(blob, `Article${Date()}`)
    }

    onEditClick=()=>{
        
    }

    onSaveClick=()=>{
        // console.log(this.state.item.caption)
        this.props.saveArticleActions.saveArticle(this.state.item.caption)
    }

    render() {
        let {animating,activeIndex,items}=this.state

        const next = () => {
            if (animating) return;
            const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
            this.setState({
                activeIndex:nextIndex,
                item:this.state.items[nextIndex]
            })
            // setActiveIndex(nextIndex);
          }
        
          const previous = () => {
            if (animating) return;
            const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
            this.setState({
                activeIndex:nextIndex,
                item:this.state.items[nextIndex]
            })
            // setActiveIndex(nextIndex);
          }
        
          const goToIndex = (newIndex) => {
            if (animating) return;
            this.setState({
                activeIndex:newIndex,
                item:this.state.items[newIndex]
            })
            // setActiveIndex(newIndex);
          }

        
          const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={() => this.setState({ animating: false })}
                    onExited={() => this.setState({ animating: false })}
                    className="custom-tag"
                    tag="div"
                    key={item.id}

                >
                    {/* <img src={item.src} alt={item.altText} /> */}
                    <CarouselCaption captionText={<div class="ex1">{item.caption}<br/>{item.caption}<br/>{item.caption}</div>}/>
                </CarouselItem>
            );
          });

        return (
            <div>
                <Container className="themed-container">
                    <h1>Generated Text</h1> <br/>
                    <Row >
                        <Col xs={10}>
                            <div> 
                                <style>
                                    {
                                        `.custom-tag {
                                            max-width: 100%;
                                            height: 600px;
                                            background: #d6d6d6;
                                        }
                                        div.ex1 {
                                            width: 100%;
                                            height: 500px;
                                            overflow: scroll;
                                            text-align: justify;
                                            text-justify: inter-word;
                                            color: black;
                                        }`
                                    }
                                </style>
                                <Carousel
                                    activeIndex={activeIndex}
                                    next={next}
                                    previous={previous}
                                >
                                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                                </Carousel>
                            </div>
                            <br/><br/><br/><br/>
                        </Col>
                        <Col>
                            <button type="button" onClick={this.onDownloadClick} className="btn btn-primary btn-lg">Download</button><br/><br/>
                            <button type="button" onClick={this.onEditClick} className="btn btn-secondary btn-lg">Edit</button><br/><br/>
                            <button type="button" onClick={this.onSaveClick} className="btn btn-warning btn-lg">Save</button><br/><br/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
Carousel.defaultProps = { 
    indicators: true, // default: true
    controls: true, // default: true
    autoPlay: false, 
    interval: false
} 
function mapDispatchToProps (dispatch){
    return{
        saveArticleActions: bindActionCreators(saveArticleActions,dispatch),
        // downloadArticleActions: bindActionCreators(downloadArticleActions,dispatch)
    }
}


function mapStateToProps (state){
    return{
        ...state.Article,
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (GeneratedComponent))

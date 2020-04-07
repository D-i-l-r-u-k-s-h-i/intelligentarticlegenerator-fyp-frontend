import React, { Component } from 'react'
import { Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption} from 'reactstrap';
import {Container ,Row,Col} from 'react-bootstrap'
import { saveAs } from 'file-saver';
import SaveArticleNameModal from './save_article_name_modal';
import EditArticleModal from './edit_article_modal';

export class GeneratedComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            articleid:0,
            activeIndex:0,
            animating:false,
            items:this.props.props && this.props.props,
            item:this.props.props && this.props.props[0],
            modalShow: false,
            editModalShow: false,
        }
    }

    onDownloadClick=()=>{
        var blob = new Blob([this.state.item.caption], { type: "text/pdf" });
        saveAs(blob, `Article${Date()}`)
    }

    render() {
        let {animating,activeIndex,items}=this.state
        let modalClose = () => this.setState({ modalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        console.log(this.props)

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
                    <CarouselCaption captionText={<div class="ex1">{item.caption}</div>}/>
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
                            <button type="button" onClick={() => this.setState({ editModalShow: true })} className="btn btn-secondary btn-lg">Edit</button><br/><br/>
                            <button type="button" onClick={() => this.setState({ modalShow: true })} className="btn btn-warning btn-lg">Save</button><br /><br />
                            
                            <SaveArticleNameModal show={this.state.modalShow} props={this.state} onHide={modalClose}/>
                            <EditArticleModal show={this.state.editModalShow} props={this.state} onHide={editModalClose}/>
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
export default GeneratedComponent

import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { TabGroup, VideoBox ,VideoPlayer} from "./Toolbox.jsx";
import videojs from 'video.js'
import * as HLS from 'videojs-contrib-hls';

class Article_VideoPlay extends React.Component {
    //mounting
    constructor(props) {
        super(props);
        this.state = {
            pageTokenList: [],
            nextPageToken: "",
            vedioList: [],
            vedioBoxList: null,
            tabClickID: 1,
            videoOpt:this.createVideoOption()
        };

       
    }

    createVideoOption = ()=>{
        return {
            autoplay:false,
            controls:true,
            fluid:true,
            aspectRatio: '16:8',
            sources:[
                {
                    src:"https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
                    type:"application/x-mpegURL"
                }
            ]
        };
    }

    render(){
        return <div className="article_video">
                <VideoPlayer {...this.state.videoOpt} />
                <div className="videoContent">                   
                    <h2 className="title">{this.props.location.state.title}</h2>
                    <h4 className="subTitle">
                        <i className="fa fa-eye"></i> 
                        <span className="video-views">2,1111,233。views</span>
                        <span className="video-update">{this.props.location.state.publishedAt}</span>
                    </h4>
                    <hr></hr>
                    <p>
                        {this.props.location.state.description}
                    </p>
                </div>
        </div>;
    }
}

export {Article_VideoPlay}
import React from "react"
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import {TabGroup, TabGroupmMobile ,VideoBox } from "./Toolbox.jsx";

class ArticleHome extends React.Component {
    //mounting
    constructor(props) {
        super(props);
        this.state = {
            pageTokenList : [],
            nextPageToken : "" ,
            videoList: [],
            videoBoxList: null,
            tabClickID:1,
            unmounting:false
        };
        this.info ={
            pageVideoMax: 12,
            maxVideoCount : 100
        };
        this.info.maxPageCount = parseInt(this.info.maxVideoCount /this.info.pageVideoMax) + (this.info.maxVideoCount %this.info.pageVideoMax > 0?1:0);
        this.info.lastPageVideoCount = this.info.maxVideoCount %this.info.pageVideoMax ;
    }

    getVideoList = async (pageToken, maxResults) => {
        const d = new URLSearchParams();
        d.set("chart","mostPopular");
        d.set("maxResults",maxResults);
        d.set("key","AIzaSyAoJvf5_dKImsCwimX2lYsetDv85QKSfRc");
        if(pageToken){
            d.set("pageToken",pageToken);
        }
        const url = encodeURI(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&${d.toString()}`);
        const reqInfo = {
            method: "GET"
        };
       
        try{
            const res = await fetch(url, reqInfo);
            if (res.status !== 200)
                return null
            const result = await res.json();
            console.log(result);
            return result;
        }
        catch(e){
            console.error(e);
            return null;
        }

    };

    convertDurationTime = (duration)=>{
        var t ="PT15H4M42S"

        const dtime = duration.replace("PT","");
        const ret =  dtime.replace(/(.+?)[H|M|S]/gi,(s)=>{
            const num = parseInt(s.replace(/[A-Z]/,""));
            if(num < 10){
                return `0${num}:`;
            }
            return `${num}:`;
        });

        return ret.substring(0 , ret.length -1);

    };
    getVideoInfoList = (list)=>{
        const ret = [];
        list.map((item)=>{
            const content = item.contentDetails;
            const tmp = {
                id: item.id,
                title: item.snippet.title,
                description:item.snippet.description,
                imgUrl: item.snippet.thumbnails.standard || item.snippet.thumbnails.default,
                publishedAt:item.snippet.publishedAt,
                duration: this.convertDurationTime(content.duration)
            };
            ret.push(tmp);
        });

        return ret;
    };

    

    getNowPageID = (id)=>{
        if(id === "left"){
            return this.state.tabClickID -1 ;
        }
        else if(id === "right"){
            return this.state.tabClickID + 1 ;
        }else{
            return id ;
        }       
    }

    tabOnClick = async (e ,id)=>{
        const pageID = this.getNowPageID(id);
        const ptList = this.state.pageTokenList;
        let pageToken = "";

        if(pageID > 1){
            if(ptList[pageID -1]){
                pageToken = ptList[pageID -1]
            }
            else{
                pageToken = this.state.nextPageToken;
                ptList[pageID -1] = pageToken;
            }             
        }
        this.setContent(pageToken , pageID ,ptList);
    }
    
    onCollectionClick =(e , id)=>{
        const cId = this.props.selectCollectionIndex(id);
        if(cId === -1){
            
            const collectItem =  this.state.videoList.filter((item , i)=>{
                return item.id === id
            });
            this.props.saveCollection(collectItem[0]);     
        }
        else{
            this.props.deleteCollection(id); 
        }
        
        this.setState({videoList:this.state.videoList});
    };

    setContent = async (pageToken  ,pageID ,ptList)=>{
        let maxResult = this.info.pageVideoMax;
        if(parseInt(pageID) === this.info.maxPageCount){
            maxResult = this.info.lastPageVideoCount;
        }
        const list =  await this.getVideoList(pageToken,maxResult);
        const vList = this.getVideoInfoList(list.items);
   
        const stateInfo ={
            videoList : vList,
            nextPageToken : list.nextPageToken,
            pageTokenList : ptList,
            tabClickID : pageID
        };       
        this.setState(stateInfo);
    }
    render() {
        console.log(this.props);
        console.log("Is unmounting",this.state.unmounting)
        return  <article>
                    <div className="videoList">
                        {this.state.videoBoxList}
                    </div>
                 
                    <TabGroup count={this.info.maxPageCount} clickEvent={this.tabOnClick} activeID={this.state.tabClickID}/>
                    <TabGroupmMobile count={this.info.maxPageCount} clickEvent={this.tabOnClick} activeID={this.state.tabClickID}/>
                 </article>

    }
    //mounting 
    async componentDidMount() {
        this.setContent(null , 1 ,this.state.pageTokenList);
    }
    //updating
    shouldComponentUpdate(nextProps, nextState) {
    
        const bBoxList = this.props.createVideoBox(nextState.videoList , this.onCollectionClick);
        nextState.videoBoxList = bBoxList;
        return true;
    }
    
}
export { ArticleHome }
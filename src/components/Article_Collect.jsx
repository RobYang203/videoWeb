import React from "react"
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { TabGroup, TabGroupmMobile,VideoBox } from "./Toolbox.jsx";
class ArticleCollect extends React.Component {
     //mounting
     constructor(props) {
        super(props);
        this.state = {
            videoList :null,
            videoBoxList:[],
            pageCount:0,
            nowPageID:1
        };
    }

    filterPageVideoList = (list , nowPageID)=>{
        const startIndex = (nowPageID -1)* 6;
        return Object.assign([],list).splice(startIndex , 6);
    }
    getNowPageID = (id)=>{
        if(id === "left"){
            return this.state.nowPageID === 1? 1 :this.state.tabClickID -1 ;
        }
        else if(id === "right"){
            return this.state.nowPageID !== this.state.pageCount? this.state.pageCount:this.state.tabClickID + 1 ;
        }else{
            return id ;
        }       
    }
    onTabClick = (e, id) => {
        const pageID = this.getNowPageID(id);
        this.setNowPageVideoList(pageID);    
    }
    setNowPageVideoList = (pageID)=>{
        const allVlist = this.props.getAllCollection();
        const vList = this.filterPageVideoList(allVlist , pageID);
        
        this.setState({
            videoList: vList,
            nowPageID:pageID
        });
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
        this.setNowPageVideoList(this.state.nowPageID);
    };

    render() {
        console.log(this.props.location);
        return <article>
                <div className="videoList">
                    {this.state.videoBoxList.length === 0 ? <div className="noInfo">No Collection</div>:this.state.videoBoxList}
                </div>              
                {this.state.pageCount ===0?null:<TabGroup count={this.state.pageCount} clickEvent={this.onTabClick} activeID={this.state.nowPageID}/>}
                {this.state.pageCount ===0?null:<TabGroupmMobile count={this.state.pageCount} clickEvent={this.onTabClick} activeID={this.state.nowPageID}/>}              
            </article>

    }

    //mounting 
    componentDidMount() {
        this.setNowPageVideoList(this.state.nowPageID);
    }

    //updating
    shouldComponentUpdate(nextProps, nextState) { 
        const bBoxList = nextProps.createVideoBox(nextState.videoList , this.onCollectionClick);
        nextState.videoBoxList = bBoxList;
        const allList = this.props.getAllCollection();
        nextState.pageCount = parseInt(allList.length /6) + (allList.length %6 > 0 ?1:0)
        return true;
    }


     //unmount
     componentWillUnmount(){
        console.log(" Unmounting");
    }
}
export { ArticleCollect }
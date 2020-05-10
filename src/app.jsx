import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header.jsx'
import { ArticleHome } from './components/Article_Home.jsx'
import { ArticleCollect } from './components/Article_Collect.jsx'
import { Article_VideoPlay} from './components/Article_VideoPlay.jsx'
import { Nav } from './components/Nav.jsx'
import {TabGroup, VideoBox } from "./components/Toolbox.jsx";

import '../res/css/main.css'
export default class App extends React.Component {
    //mounting
    constructor(props) {
        super(props);
        this.state = {
            videoList : null,
            pageTokenList : [],
            nextPageToken : "" ,
            menuCmd: "open"
        };
        
        this.collectionList = JSON.parse(window.localStorage.getItem("allCollection"))|| [];
    }


    createVideoBox = (list , onCollectionClick) => {
        const ret = [];
        list.map((item, i) => {
            const cId = this.selectCollectionIndex(item.id);
            const isCollection = cId !== -1;
            ret.push(<VideoBox key={item.id} {...item} isCollection={isCollection} clickEvent={onCollectionClick} />);
        });
        return ret;
    };

    onMenuClick = (e)=>{
        let ret = "";
        switch(this.state.menuCmd){
            case "open":
                ret = "zoomOut";
                break;
            case "zoomOut":
                ret = "open";
                break;
        }
        this.setState({menuCmd:ret});
       //browserHistory.push("/home")
    };
    getAllCollection = ()=>{
        return this.collectionList;
    }
    saveCollection = (item)=>{
        this.collectionList.push(item);
        window.localStorage.setItem("allCollection",JSON.stringify(this.collectionList));
    };
    selectCollectionIndex= (id)=>{
        const i  = this.collectionList.findIndex((item , i)=>{
            return item.id === id ;
        });
        return i;
    };
    deleteCollection = (id)=>{
        const index = this.selectCollectionIndex(id);
        if(index === -1)
            return;
        this.collectionList.splice(index ,1);
        window.localStorage.setItem("allCollection",JSON.stringify(this.collectionList));
    };
    //mounting & updating
    static getDerivedStateFromProps(nextProps, preState) {

        return preState;
    }

    //mounting & updating
    render() {
        return (
            <BrowserRouter>
                <Header onMenuClick={this.onMenuClick} />
                <div className="content-area">
                    <Nav  menuCmd={this.state.menuCmd} />
                    <div className="article-border">
                        
                        <Route exact path={["/home/:pageID","/home","/"]}  render={(props)=>
                            (<ArticleHome {...props} 
                                deleteCollection={this.deleteCollection}
                                selectCollectionIndex={this.selectCollectionIndex}
                                saveCollection={this.saveCollection}
                                createVideoBox={this.createVideoBox}
                                />)
                        } />
                        <Route path="/collect" render={(props)=>
                            ( <ArticleCollect {...props}  
                                getAllCollection={this.getAllCollection}
                                deleteCollection={this.deleteCollection}
                                selectCollectionIndex={this.selectCollectionIndex}
                                saveCollection={this.saveCollection}
                                createVideoBox={this.createVideoBox}
                            />)
                        } />
                        <Route path="/video" render={(props)=>
                            ( <Article_VideoPlay {...props}  
                                getAllCollection={this.getAllCollection}
                                deleteCollection={this.deleteCollection}
                                selectCollectionIndex={this.selectCollectionIndex}
                                saveCollection={this.saveCollection}
                                createVideoBox={this.createVideoBox}
                            />)
                        } />
                    </div>

                </div>

            </BrowserRouter>
        );
    }

    //mounting 
    componentDidMount() {
        // const list =  await this.getVideoList();
        // const vList = this.getVideoInfoList(list.items);
        // const stateInfo ={
        //     videoList : vList,
        //     nextPageToken : list.nextPageToken 
        // };
        // // this.history.push({
        // //     pathname:"/home",
        // //     state:vList
        // // });
        // this.setState(stateInfo);
    }

    //updating
    shouldComponentUpdate(nextProps, nextState) {

        return true;
    }

    getSnapshotBeforeUpdate(preProps, preState) {
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    //Unmounting
    componentWillUnmount() {

    }


}
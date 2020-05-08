import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import {Header} from './components/Header.jsx'
import {Article} from './components/Article.jsx'
import {Nav} from './components/Nav.jsx'

import './res/css/main.css'
export default class App extends React.Component{
    //mounting
    constructor(props){
        super(props);

    }




    //mounting & updating
    static getDerivedStateFromProps(nextProps,preState){

        return preState;
    }
    
    //mounting & updating
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Title title="Menus"/>
                    <ul>
                        <li>
                            <Link to="/home">GO HOME</Link>
                        </li>
                        <li>
                            <Link to="/Collet">About</Link>
                        </li>
                        <li>
                            <Link to={
                               { 
                                    pathname:"/about",
                                    g:{t:"1234"}
                                }
                            }>About</Link>
                        </li>
                    </ul>
     
                </div>
            </BrowserRouter>
        );
    }

    //mounting 
    componentDidMount(){

    }

    //updating
    shouldComponentUpdate(nextProps,nextState){

        return true;
    }

    getSnapshotBeforeUpdate(preProps,preState){
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        
    }

    //Unmounting
    componentWillUnmount(){

    }


}
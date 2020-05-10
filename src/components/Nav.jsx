import React from "react"
import { Link } from 'react-router-dom'
class Nav extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            menuClass : "",
            homeObj : null,
            collectObj : null,
            insideStatus: "open", 
            isLink: ""
        };
        console.log("Nav Build")
        this.collectionList = [];
    }
    setLinkObject = (path , list)=>{
        return {
            pathname: `/${path}`,
            state:list
        }
    };

  
    onLinkClick = ()=>{
        this.setState({isLink:"linkClick"});
    }
    //mounting & updating
    static getDerivedStateFromProps(nextProps, preState) {
        if(preState.insideStatus === "close"){
            preState.menuClass = "";
            preState.insideStatus = "open";
        }else{
            preState.menuClass = "menu-zoomOut close-animation";
            preState.insideStatus = "close"
        }
        preState.isLink= "";
        return preState;
    }
 
    render() {

        return <nav className={this.state.menuClass}>
            <ul>
                <li>
                    <Link to={"/home"} className="menuList-btn" onClick={this.onLinkClick}>
                        <span className="menuBox menu-icon"><i className="fa fa-home"></i></span>
                        <span className="menuBox menu-text">HOME</span>
                    </Link>
                </li>
                <li>
                    <Link to="/collect" className="menuList-btn"  onClick={this.onLinkClick}>
                        <span className="menuBox menu-icon"><i className="fa fa-list"></i></span>
                        <span className="menuBox menu-text">Collect</span>
                    </Link>
                </li>
            </ul>
        </nav>
    }


    //updating
    shouldComponentUpdate(nextProps, nextState) {
        // nextState.homeObj = this.setLinkObject("home");
        // nextState.collectObj = this.setLinkObject("collect");
        return true;
    }


}
export { Nav }
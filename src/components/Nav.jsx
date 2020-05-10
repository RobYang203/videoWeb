import React from "react"
import { Link } from 'react-router-dom'
class Nav extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            menuClass : "",
            homeObj : null,
            collectObj : null 
        };
        console.log("Nav Build")
        this.collectionList = [];
        this.mainWebUrl = location.href;
    }
    setLinkObject = (path , list)=>{
        return {
            pathname: `/${path}`,
            state:list
        }
    };

    saveCollection = (item)=>{
        this.collectionList.push(item);
    };
    selectCollectionIndex= (id)=>{
        const i  = this.collectionList.findIndex((item , i)=>{
            return item.id === id ;
        });
        return i;
    };
    deleteCollection = (id)=>{
        const index = this.selectCollection(id);
        if(index === -1)
            return;
        this.collectionList.splice(index ,1);
    };

    //mounting & updating
    static getDerivedStateFromProps(nextProps, preState) {
        if(nextProps.menuCmd === "zoomOut"){
            preState.menuClass = "menu-zoomOut";
        }else{
            preState.menuClass = "";
        }
        return preState;
    }

    render() {

        return <nav className={this.state.menuClass}>
            <ul>
                <li>
                    <Link to={`{${this.mainWebUrl}/home}`} className="menuList-btn">
                        <span className="menuBox menu-icon"><i className="fa fa-home"></i></span>
                        <span className="menuBox menu-text">HOME</span>
                    </Link>
                </li>
                <li>
                    <Link to={`{${this.mainWebUrl}/collect}`} className="menuList-btn">
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
import React from "react"
import {Link} from 'react-router-dom'
import logo from "../../res/picture/logo.png"
class Header extends React.Component {
    render(){
        return <header>
                <div className="menuBtn" onClick={ (e)=>{this.props.onMenuClick(e)}} >
                    <i className="fa fa-bars fa-2x"></i>
                </div>
                <Link to="/" >
                    <img src={logo}/>
                </Link>
               
            </header>
    }
}
export {Header}
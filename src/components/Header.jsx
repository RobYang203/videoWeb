import React from "react"
import {Link} from 'react-router-dom'
class Header extends React.Component {
    render(){
        return <header>
                <div classNamw="menuBtn">
                    <i className="fa fa-bars fa-2x"></i>
                </div>
            </header>
    }
}
export {Header}
import React,{Component} from 'react'
import {Link} from 'react-router'
import AddUser from '../forms/addUser'

class Header extends Component{
    render(){
        return(
                <header>
                  <div className="container containerDashboard">
                    <div className="mainMenu">
                      <ul>
                      <Link to="/story/1" activeClassName="active"><li><i className="fas fa-folder-open"></i><span className="mainMenuText">Board</span></li></Link>
                      <Link to="/timeline" activeClassName="active"><li><i className="fas fa-thumbs-up"/><span className="mainMenuText">Timeline</span></li></Link>
                      </ul>
                    </div>
                    <div className="profilewidget">
                      <AddUser/>
                    </div>
                  </div>
                </header>
        )
    }
}
export default Header
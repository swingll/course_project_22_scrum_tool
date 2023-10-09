import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddUser from '../forms/addUser';
import { signout } from '../../states/user/service';
import { useSignout } from '../../states/user/hooks';

function Header() {
  const [setLogout] = useSignout();

  const csignout = () => {
    signout().then((res) => {
      if (res.status === 200) { 
        setLogout();
      }
    }).catch((err) => {
      const { response } = err
      console.log(response)
    })
  }

  return (
    <header>
      <div className="container containerDashboard">
        <div className="mainMenu">
          <ul>
            <Link to="/story/1"><li><i className="fas fa-folder-open"></i><span className="mainMenuText">Projects</span></li></Link>
            <Link to="/about"><li><i className="fas fa-thumbs-up" /><span className="mainMenuText">About</span></li></Link>
            <Link to="/timeline"><li><i className="fas fa-thumbs-up"/><span className="mainMenuText">Timeline</span></li></Link>
            <a rel="noopener noreferrer" target="_blank" href="https://github.com/mreorhan/Scrum-Task-Management-with-ReactJS-Express-Server"><li><i className="fas fa-code-branch" /><span className="mainMenuText">Fork Me on Github</span></li></a>
          </ul>
        </div>
        <div className="profilewidget">
          {/* <AddUser /> // TODO: create user by admin */}
          <a onClick={() => csignout()}>Logout</a>
        </div>
      </div>
    </header>
  )
}
export default Header
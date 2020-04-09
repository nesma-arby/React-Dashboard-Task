import React from "react";
import { NavLink  } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import logo from '../logo.png';


const Sidebar = () => (

<div> 

  <img src={logo} alt='logo' className='logo'/>

  <div className='navLinks'>
    <NavLink exact className="btn-add" to="/" activeClassName="active"> <GroupIcon /> Requested </NavLink >
    <NavLink exact className="btn-add" to="/accepted" activeClassName="active"> <GroupIcon /> Accepted </NavLink >
    <NavLink exact className="btn-add" to="/rejected" activeClassName="active"> <GroupIcon /> Rejected </NavLink >
  </div>

  </div>


);

export default Sidebar;
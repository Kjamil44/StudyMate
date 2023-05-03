import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../App.css';
import Button from '../components/button/Button';
import { alignPropType } from 'react-bootstrap/esm/types';
import studyMateLogo  from '../assets/studymate2.png'

const RootLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    // handle logout logic here
  };

    return (
      <div className="App">
      <Navbar className="d-lg-flex justify-content-lg-end" bg="dark" expand="lg">
        <Navbar.Brand href="/subjects" className="text-white ms-3 d-lg-none">Study Mate</Navbar.Brand>
        <div className='position-relative mx-auto'>
          <img className='position-relative' draggable="false" style={{height: "30px"}} src={studyMateLogo}/>
        </div>
        <Navbar.Toggle onClick={toggleSidebar} className="bg-white me-3 d-lg-none" />
        <NavDropdown align={"end"} title="User" id="basic-nav-dropdown-start" className="text-white d-none d-lg-inline me-3">
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
      <div className={`sidebar${showSidebar ? ' show' : ''}`}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/subjects" className="bg-white text-dark mx-4 rounded rounded-3 mb-3">Subjects</Nav.Link>
          <Nav.Link as={Link} to="/notes" className="bg-white text-dark mx-4 rounded rounded-3 mb-3">Notes</Nav.Link>
          <Button label="Logout" className="mt-3 text-dark bg-white mx-4 rounded rounded-3 d-lg-none" onClick={handleLogout}/>
        </Nav>
      </div>
      <div className="default-layout-content">
        <main className='bg-white'>
          <Outlet />
        </main>
      </div>
    </div>
    );
  };
  
  export default RootLayout;
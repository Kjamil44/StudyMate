import { useEffect, useState } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import studyMateLogo from '../assets/studymate2.png';
import Button from '../components/button/Button';
import { GetUserReponse, UserApi } from '../api';

const imgStyle = {
  filter: "invert(100%) sepia(100%) saturate(0%) brightness(100%) contrast(100%)",
  height: "34px",
}

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const { subject } = useParams();
  const [user, setUser] = useState<GetUserReponse>();

  useEffect(() => {
    if (location.pathname === '/login') {
      return;
    }

    if (!localStorage.getItem('userId')) {
      navigate('/login');
    }
  }, [location, navigate]);

  useEffect(() => {
    const getUserData = () => {
      UserApi.getUser(localStorage.getItem('userId') ?? "")
        .then((response: any) => response.data)
        .then((data: any) => data)
        .then(setUser);
    };

    getUserData();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

    return (
      <div>
      <Navbar className="ms-auto d-flex justify-content-between" expand="lg" style={{width: "100%", boxShadow: "0px 0px 4px black", backgroundColor: "#3e5853"}}>
        <div>
      <Navbar.Brand href="/subjects" className="text-white ms-3 d-lg-none">Study Mate</Navbar.Brand>
      </div>
          <div className='position-relative ms-5 ps-3' style={{height: "40px", display: "flex", alignItems: "center"}}>
            <img  className='position-relative' draggable="false" alt='' style={imgStyle} src={studyMateLogo}/>
          </div>
          <Navbar.Toggle onClick={toggleSidebar} className="bg-white me-3 d-lg-none" />
        
        <NavDropdown align={"end"} title={user?.name + " " + user?.surname} id="basic-nav-dropdown-start" className="text-white d-none d-lg-inline me-3">
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
      <div className={`sidebar${showSidebar ? ' show' : ''}`}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/subjects" className="button__sidenav mx-4 rounded rounded-3 mb-3 w-75 font-weight">Subjects</Nav.Link>
            {subject && <Nav.Link as={Link} to={`/subjects/${subject}/tasks`} className="button__sidenav mx-4 rounded rounded-3 mb-3 w-75 font-weight">Tasks</Nav.Link>}
          <Nav.Link as={Link} to="/notes" className="button__sidenav mx-4 rounded rounded-3 mb-3 w-75 font-weight">Notes</Nav.Link>
          
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
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navbar.scss";

export function NavBar() {
  let user = localStorage.getItem("user");

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open("/", "_self");
    props.onLoggedOut(user);
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className='main-view-nav'
      //   collapseOnSelect
      //   expand='xxl'
      //   variant='dark'
    >
      <Container>
        <Navbar.Brand className='navbar-logo' href='/'>
          MyFlixx Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />

        <Nav className='me-auto'>
          {isAuth() && (
            <Nav.Link className='nav-text' as={Link} to={`/users/${user}`}>
              {user}
            </Nav.Link>
          )}
          {isAuth() && (
            <Button
              className='logout nav-text'
              variant='link'
              onClick={handleLogOut}
            >
              Logout
            </Button>
          )}
          {!isAuth() && (
            <Nav.Link className='nav-text' href='/'>
              Sign in
            </Nav.Link>
          )}
          {!isAuth() && (
            <Nav.Link className='nav-text' href='/register'>
              Sign up
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

// <Navbar className='main-view-nav' fluid>
// <Container className='nav-container' fluid>
//   <Navbar.Brand className='nav-text nav-logo' href='#home'>
//     MyFlixx Movies
//   </Navbar.Brand>

//   <Nav className='nav-main'>
//     <Nav.Link
//       className='nav-text'
//       href='https://myfavflixdb.herokuapp.com/users/'
//     >
//       Movies
//     </Nav.Link>
//     <Nav.Link className='nav-text' href='#features'>
//       Profile
//     </Nav.Link>
//     <Nav.Link className='nav-text' href='#pricing'>
//       Login
//     </Nav.Link>
//     {/* this dropdown is not necessary */}
//     <NavDropdown
//       className='nav-text'
//       id='nav-dropdown-dark-example'
//       title='Account'
//       menuVariant='dark'
//     >
//       <NavDropdown.Item
//         className='nav-text'
//         href='#action/3.1'
//         //see how this works below
//         onClick={() => {
//           this.onLoggedOut();
//         }}
//       >
//         Logout
//       </NavDropdown.Item>
//     </NavDropdown>
//   </Nav>
// </Container>
// </Navbar>

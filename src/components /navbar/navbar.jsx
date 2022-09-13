// import React from "react";
// import { Container, Navbar, Nav } from "react-bootstrap";

// export function Nabar({ user }) {
//   //sign out method
//   const onLoggedOut = () => {
//     loclaStorage.clear();
//     window.open("/", "_self");
//   };

//   //retrieves token
//   const isAuth = () => {
//     if (typeof window == "undefined") {
//       return false;
//     }
//     if (localStorage.getItem("token")) {
//       return localStorage.getItem("token");
//     } else {
//       return false;
//     }
//   };

//   <Navbar
//     className='main-nav'
//     sticky='top'
//     bg='dark'
//     expand='lg'
//     variant='dark'
//   >
//     <Container>
//       <Navbar.Brand className='navbar-logo' href='/'>
//         myFlixCinema
//       </Navbar.Brand>

//       <Navbar.Toggle aria-controls='responsive-navbar-nav' />
//       <Navbar.Collapse id='responsive-navbar-nav'>
//         <Nav className='ml-auto'>
//           {isAuth() && <Nav.Link href={"/users/${user}"}>{user}</Nav.Link>}
//           {isAuth() && (
//             <Button
//               variant='link'
//               onClick={() => {
//                 this.onLoggedOut();
//               }}
//             >
//               Logout
//             </Button>
//           )}
//           {!isAuth() && <Nav.Link href='/'>Login</Nav.Link>}
//           {!isAuth() && <Nav.Link href='/register'>Sign-up</Nav.Link>}
//         </Nav>
//       </Navbar.Collapse>
//     </Container>
//   </Navbar>;
// }

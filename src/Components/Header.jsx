import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <div>
        <Navbar className='header_main'>
            <Container>
            <Navbar.Brand href="/">Student Management System</Navbar.Brand>
            <Nav className="me-auto flex">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/addstudent">Add Student</Nav.Link>
                <Nav.Link href="/studentlist">Student List</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

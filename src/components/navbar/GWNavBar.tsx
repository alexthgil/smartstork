import { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class GWNavBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Make Link Game</Nav.Link>
                            <Nav.Link as={NavLink} to="/coupleslist">Couples</Nav.Link>
                            <Nav.Link as={NavLink} to="/sections">Sections</Nav.Link>
                            <Nav.Link as={NavLink} to="/storage">Controls</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default GWNavBar;
import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actions';

class Header extends Component {

    onLogOutClick = () => {
        this.props.onLogout();
    }

    renderNavbar = () => {
        if(this.props.auth.username !== "") {
            return (<Navbar fixedTop={true} inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Cinema Bertasbih</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Movie List" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/movie1">Hacksaw Ridge</Link></MenuItem>
                            <MenuItem eventKey={3.2}><Link to="/movie2">Spider-Man: Homecoming</Link></MenuItem>
                            <MenuItem eventKey={3.3}><Link to="/movie3">Avengers: Infinity War</Link></MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={4} title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
                            <MenuItem eventKey={4.1}>Profile</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={4.2} onSelect={this.onLogOutClick}>Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>);
        }

        return (<Navbar fixedTop={true} inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Cinema Bertasbih</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown eventKey={3} title="Movie List" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}><Link to="/movie1">Hacksaw Ridge</Link></MenuItem>
                        <MenuItem eventKey={3.2}><Link to="/movie2">Spider-Man: Homecoming</Link></MenuItem>
                        <MenuItem eventKey={3.3}><Link to="/movie3">Avengers: Infinity War</Link></MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        <Link to="/login">Login</Link>
                    </NavItem>
                    <NavItem eventKey={2}>
                        <Link to="/register">Register</Link>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>);
    }
    render() {
        return( 
            this.renderNavbar()
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onLogout })(Header);

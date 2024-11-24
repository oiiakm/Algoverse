import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        const navbarStyles = {
            backgroundColor: '#343a40',
            padding: '15px 30px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        };

        const brandStyles = {
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#ff4e50',
        };

        const navLinkStyles = {
            fontSize: '1.1rem',
            color: '#fff',
            transition: 'color 0.3s ease',
        };

        const activeLinkStyles = {
            color: '#3498db',
            fontWeight: '600',
        };

        return (
            <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyles}>
                <a className="navbar-brand" href="#" style={brandStyles}>Algoverse</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item active">
                            <a className="nav-link" href="#" style={{ ...navLinkStyles, ...activeLinkStyles }}>About <span className="sr-only">(current)</span></a>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#" style={navLinkStyles}>Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={navLinkStyles}>Contact</a>
                        </li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
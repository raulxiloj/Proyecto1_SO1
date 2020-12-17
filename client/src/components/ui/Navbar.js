import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Sistemas Operativos 1</Link>

            <div className="navbar-collapse w-100 order-3 dualcollapse2">
                <ul className="navbar-nav ml-auto">
                    <NavLink activeClassName="active" className="nav-item nav-link" exact to="/">Home</NavLink>
                    <NavLink activeClassName="active" className="nav-item nav-link" exact to="/monitor">Monitor</NavLink>
                </ul>
            </div>

        </nav>
    )

}
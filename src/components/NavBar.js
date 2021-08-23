import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Cart from './Cart';
import Shop from './Shop';
import SignUp from './SignUp';

const NavBar = () => {
    return (
        <Router>
            <header className="nav-header">
                <nav id ="navBar">
                    <a id ="logo">LOGO</a>
                    <ul id="nav-menu">
                        <Link to="/" id="link-nav">Home</Link>
                        <Link to="/cart" id="link-nav">Cart</Link>
                        <Link to="/signUp" id="link-nav">SignUp</Link>
                    </ul>
                </nav>
            </header>
           <Switch>
               <Route exact path="/">
                   <Shop></Shop>
                </Route>
                <Route path="/cart">
                    <Cart></Cart>
                </Route>
                <Route path="/signUp">
                 <SignUp></SignUp>
                </Route>

           </Switch>
        </Router>
    );
};

export default NavBar;
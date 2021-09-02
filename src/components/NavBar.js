import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { useHistory } from 'react-router';
import Cart from './Cart';
import Shop from './Shop';
import SignUp from './SignUp';
import SignIn from './SignIn'
import { auth } from '../firebase';
import { Button } from '@material-ui/core';

const NavBar = () => {
    let history = useHistory()
    function logOut(){
        auth.signOut().then(
            
            alert("User has logged out.")
        )
    }
    return (
        <Router>
            <header className="nav-header">
                <div className="fixed-header">
                    <nav id="navBar">
                        <a id="logo">LOGO</a>
                        <ul id="nav-menu">
                            <Link to="/home" id="link-nav">Home</Link>
                            <Link to="/cart" id="link-nav">Cart</Link>
                            <Link to="/signUp" id="link-nav">SignUp</Link>
                            <Button onClick={()=>logOut()}>
                                LogOut
                            </Button>
                            
                        </ul>
                    </nav>
                </div>
            </header>
            <Switch>
                <Route exact path="/home">
                    <Shop></Shop>
                </Route>
                <Route path="/cart">
                    <Cart></Cart>
                </Route>
                <Route path="/signUp">
                    <SignUp></SignUp>
                </Route>
                <Route path="/signIn">
                    <SignIn></SignIn>
                </Route>

            </Switch>
        </Router>
    );
};

export default NavBar;
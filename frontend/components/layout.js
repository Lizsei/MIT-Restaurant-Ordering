/* /components/Layout.js */

import React, { useState, useContext, useEffect } from "react";   // Modified this line to import useState and useEffect
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem, Alert } from "reactstrap";    // Modified this line to import Alert
import AppContext from "./context";

const Layout = (props) => {
const [showSuccessMessage, setShowSuccessMessage] = useState(false); //Added this line for the success message state
const title = "Welcome to ZipLocalDish";
const {user} = useContext(AppContext);

// Added this useEffect block to trigger the success message when a user is successfully registered
useEffect(() => {
  if (user) {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000); // Hide after 5 seconds
  }
}, [user]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
      {showSuccessMessage && <Alert color="success">ZIP LOCAL DISH Welcomes You! Your Account is Ready!</Alert>}     {/* Added this line to show the success message */}

        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
          `}
        </style>
        <Nav className="navbar bg-primary">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">Home</a>
            </Link>
          </NavItem>
          <NavItem>  {/* Added this part for the app name */}
            <span style={{ color: 'white', marginLeft: '30px' }}></span>
          </NavItem>
          <NavItem className="ml-auto">
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href="/register">
                <a className="nav-link"> Sign up</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">Sign in</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
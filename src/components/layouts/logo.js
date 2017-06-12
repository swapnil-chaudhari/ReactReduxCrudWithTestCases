import React from 'react';

const Logo = () =>
    <div className="navbar-header">
        <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-ex1-collapse"
        >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="index.html">React Redux Demo App</a>
    </div>;

export default Logo;

import React from 'react';

const SideBar = () =>
    <div className="collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav side-nav">
            <li className="active">
                <a href="#"><i className="fa fa-fw fa-dashboard"></i> Dashboard</a>
            </li>
            <li>
                <a href="categories"><i className="fa fa-fw fa-table"></i> Categories</a>
            </li>
        </ul>
    </div>;

export default SideBar;

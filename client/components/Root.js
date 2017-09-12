import React from 'react';
import Navbar from './Navbar';

const Root = ({ children }) => (
  <div id="main" className="container-fluid">
    <Navbar />
    { children }
  </div>
);

export default Root;

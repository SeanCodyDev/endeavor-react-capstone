import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";
import Title from './title';
import Button from './button';


export default function Navbar(props) {

const NavUl = styled.ul`
  float: right;
  margin: 0;

`;

    return(
      <NavUl>
        <li>
          	<Button>LOG IN</Button>
        </li>
      </NavUl>
    );


};
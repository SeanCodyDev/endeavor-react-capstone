import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";
import Title from './title';
import Button from './button';
import Navbar from './navbar';


export default function Header(props) {

const Header = styled.div`
  background-color: #FFFFFF;
  width: 100%;
  position: fixed;
 
`;

    return(
        <Header>
        	<a href="#">
        		<Title>Endeavor</Title>
        	</a>
        	<Navbar />
        </Header>
    );


};
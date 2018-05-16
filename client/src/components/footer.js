import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import styled from "styled-components";

//import components
import Title from './title';
import Button from './button';
import Row from './row';
import ListItem from './list-item'
import NavList from './nav-list';


const FooterWrapper = styled.div`
	display: block;
	background-color: #212121;
	color: #FFF;
	margin-top: 30px;
	text-align: center;
`;

export default function Footer(props) {

    return(
    	<FooterWrapper>
    		<Row>
	    		<Title color='#FFF' display='block' float='none'>Endeavor</Title>
		    </Row>
		    <Row>
		    	<NavList paddingLeft='0'>
		    		<ListItem float='none'><Link to="/"><Button color='#FFF' background='#212121'>Home</Button></Link></ListItem>
			        <ListItem float='none'><Link to="/"><Button color='#FFF' background='#212121'>Privacy</Button></Link></ListItem> 
			        <ListItem float='none'><Link to="/"><Button color='#FFF' background='#212121'>Terms</Button></Link></ListItem>
		        </NavList>
		    </Row>
    	</FooterWrapper>

    );


};
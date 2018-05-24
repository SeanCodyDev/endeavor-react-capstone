//import libraries
import React from 'react'
import {Link} from 'react-router-dom';
import styled from "styled-components";

//import components
import Button from './button';
import Row from './row';
import ListItem from './list-item'

//import styles
import './footer.css';


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
	    		<h2 className="footer-title">Endeavor</h2>
		    </Row>
		    <Row>
		    	<ul>
		    		<ListItem float='none'><Link to="/"><Button color='#FFF' background='#212121' padding="10px 20px">Home</Button></Link></ListItem>
			        <ListItem float='none'><Link to="/"><Button color='#FFF' background='#212121' padding="10px 20px">Privacy</Button></Link></ListItem> 
			        <ListItem float='none'><Link to="/"><Button color='#FFF' background='#212121' padding="10px 20px">Terms</Button></Link></ListItem>
		        </ul>
		    </Row>
    	</FooterWrapper>

    );


};
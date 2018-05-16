import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";

const ListItem = styled.li`
	float: ${props => props.float || 'left'};
	display: ${props => props.display || 'inline-block'};

`;

export default ListItem;

import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";

const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.nav ? '#FFFFFF' : 'white'};
  color: ${props => props.nav ? '#000000' : 'palevioletred'};
  float: ${props => props.floatLeft ? 'left': 'none'}
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000000;
  border-radius: 3px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  width: ${props => props.fullWidth ? '100%' : 'auto'}
`;

export default Button;

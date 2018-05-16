import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";

const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.background || '#FFF'};
  float: ${props => props.floatLeft ? 'left': 'none'}
  font-size: 1em;
  margin: ${props => props.margin || '1em'};
  padding: ${props => props.padding || '20px'};
  border: ${props => props.border ? '2px solid #000000' : 'none'};
  border-radius: 3px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  width: ${props => props.fullWidth ? '100%' : 'auto'}
  color: ${props => props.color || '#000'};
  cursor: pointer;
`;

export default Button;

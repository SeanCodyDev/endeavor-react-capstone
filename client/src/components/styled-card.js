import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";

const StyledCard = styled.div`
  border-radius: 5px
  background-color: white;
  padding: 15px;
  margin-left: 25%;
  width: 50%;
  text-align: ${props => props.leftAlign ? 'left': 'center'}
`;

export default StyledCard;
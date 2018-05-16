import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";

const Row = styled.div`
    margin-top: ${props => props.margin-top || "20px"};
`;

export default Row;

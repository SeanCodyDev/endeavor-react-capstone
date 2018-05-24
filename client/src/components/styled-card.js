import styled from "styled-components";

const StyledCard = styled.div`
  border-radius: 5px
  background-color: white;
  padding: 15px;
  margin: auto;
  width: 90%;
  text-align: ${props => props.leftAlign ? 'left': 'center'}
`;

export default StyledCard;
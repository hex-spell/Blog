import styled from "styled-components";

export const Button = styled.button`
  border-radius: none;
  border: 5px dotted black;
  color: white;
  background-color: blue;
  font-family: "Press Start 2P";
  padding: 10px;
  cursor: pointer;
  margin-left: 15px;
  font-size: 1.2rem;
  transition: background-color 400ms linear;
  &:hover {
    border: 5px dotted white;
  }
`;

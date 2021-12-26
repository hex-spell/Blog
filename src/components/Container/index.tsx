import React from "react";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 15px;
  z-index: 1;
`;

const ContainerContent = styled.div`
  min-width: 380px;
  max-width: 80%;
  @media (max-width: 880px) {
    max-width: 99%;
    min-width: unset;
  }
`;

export const Container: React.FC = ({ children }) => {
  return (
    <ContainerWrapper>
      <ContainerContent>{children}</ContainerContent>
    </ContainerWrapper>
  );
};

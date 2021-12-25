import React from "react";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;

const ContainerContent = styled.div`
  min-width: 300px;
  max-width: 80%;
`;

export const Container: React.FC = ({ children }) => {
  return (
    <ContainerWrapper>
      <ContainerContent>{children}</ContainerContent>
    </ContainerWrapper>
  );
};

import React, { ComponentPropsWithoutRef } from "react";
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


export const Container: React.FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  style,
}) => {
  return (
    <ContainerWrapper>
      <ContainerContent style={style}>{children}</ContainerContent>
    </ContainerWrapper>
  );
};



export const CenteredContainer: React.FC = ({ children }) => (
  <Container
    style={{
      height: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </Container>
);

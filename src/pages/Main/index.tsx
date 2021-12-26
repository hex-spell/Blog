import React, { useEffect, useState } from "react";
import { usePostsListWithoutContent } from "queries";
import { Storage } from "aws-amplify";
import { Card, Container, Description, Title } from "components";

export const Main: React.FC = () => {
  const { loading, error, items } = usePostsListWithoutContent();
  return (
    <Container>
      {items &&
        items.map(({ title, createdAt, description, image }) => (
          <div style={{ marginBottom: "30px" }}>
            <Card>
              <Title>{title}</Title>
              <Description>{description}</Description>
              {image && <img src={image} />}
            </Card>
          </div>
        ))}
    </Container>
  );
};

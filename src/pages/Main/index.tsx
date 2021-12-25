import React from "react";
import { usePostsListWithoutContent } from "queries";
import { Card, Container, Description, Title } from "components";

export const Main: React.FC = () => {
  const { loading, error, items, meta } = usePostsListWithoutContent();

  return (
    <Container>
      {items &&
        items.map(({ title, createdAt, description }) => (
          <div style={{ marginBottom: "30px" }}>
            <Card>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </Card>
          </div>
        ))}
    </Container>
  );
};

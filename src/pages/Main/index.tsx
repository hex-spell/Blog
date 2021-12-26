import React from "react";
import { usePostsListWithoutContent } from "queries";
import { Container, Article } from "components";

export const Main: React.FC = () => {
  const { items } = usePostsListWithoutContent();
  return (
    <Container>
      {items &&
        items.map(({ title, description, image, createdAt }, index) => (
          <Article
            title={title}
            description={description}
            imageSrc={image}
            inverted={index % 2 !== 0}
            key={index}
            createdAt={createdAt}
          />
        ))}
    </Container>
  );
};

import { Title, Description, Date as DateText, Card } from "components";
import styled from "styled-components";

const ArticleContainer = styled(Card)<{ inverted?: boolean }>`
  display: flex;
  flex-direction: ${({ inverted }) => (inverted ? "row-reverse" : "row")};
  padding: 15px;
  margin: 30px;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
  gap: 15px;
`;

const ArticleImage = styled("img")`
  max-width: 300px;
  max-height: 300px;
  image-rendering: crisp-edges;
  @media (max-width: 400px) {
    max-width: 100%;
  }
  @media (min-width: 1750px) {
    max-width: 400px;
    max-height: 400px;
  }
`;

const ArticleContent = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;

interface IProps {
  title: string;
  description?: string | null;
  imageSrc?: string | null;
  inverted?: boolean;
  createdAt: string;
}

export const Article: React.FC<IProps> = ({
  title,
  description,
  imageSrc,
  inverted,
  createdAt,
}) => {
  return (
    <ArticleContainer inverted={inverted}>
      {imageSrc && <ArticleImage src={imageSrc} />}
      <ArticleContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <div style={{ flexGrow: 1 }} />
        <DateText>{new Date(createdAt).toDateString()}</DateText>
      </ArticleContent>
    </ArticleContainer>
  );
};

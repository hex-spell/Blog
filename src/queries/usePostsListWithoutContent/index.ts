import { Post } from "API";
import { useListQuery } from "hooks";

// I should find a way to make these two together, without repetition

// 1. type for intellisense
export type PostWithoutContent = Pick<
  Post,
  "title" | "image" | "id" | "description" | "createdAt" | "updatedAt"
>;

// 2. query for graphql
export const usePostsListWithoutContent = (
  config?: QueryHookConfig<PostWithoutContent>
) =>
  useListQuery<PostWithoutContent>(
    `{
    listPosts {
      items {
        createdAt
        description
        id
        title
        updatedAt
        image
      }
    }}
  `,
    {
      s3Dirs: ["image"],
      ...config,
    }
  );

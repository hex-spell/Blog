import { Post } from "API";
import { useListQuery, UseListQueryCallbacks } from "hooks";

// I should find a way to make these two together, without repetition

// 1. type for intellisense
export type PostWithoutContent = Pick<
  Post,
  "title" | "id" | "description" | "createdAt" | "updatedAt"
>;

// 2. query for graphql
export const usePostsListWithoutContent = (
  callbacks: UseListQueryCallbacks<PostWithoutContent>
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
      }
    }}
  `,
    callbacks
  );

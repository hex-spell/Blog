import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";

export interface ListQueryType<Entity> {
  [key: string]:
    | {
        __typename: string;
        nextToken?: string | null;
        items: Array<Entity | null>;
      }
    | null
    | undefined;
}

export interface UseListQueryCallbacks<Entity> {
    onSuccess?: (response: Entity[]) => void;
    onSuccessFullQuery?: (response: ListQueryType<Entity>) => void;
    onEmpty?: () => void;
    //TODO: implement more data usage on failure failure
    onFailure?: () => void;
  }

export function useListQuery<Entity>(
  query: string,
  { onSuccess, onSuccessFullQuery, onEmpty, onFailure }: UseListQueryCallbacks<Entity>,
  deps?: React.DependencyList
) {
  useEffect(() => {
    (async () => {
      const fetchedPosts = (await API.graphql(graphqlOperation(query))) as {
        data: ListQueryType<Entity>;
      };

      if (!fetchedPosts || !fetchedPosts.data) {
        onFailure && onFailure();
        return;
      }

      //I should check if this is always true
      const queryName = Object.keys(fetchedPosts.data)[0];

      if (!("items" in fetchedPosts.data[queryName]!)) {
        onEmpty && onEmpty();
        return;
      }

      onSuccess && onSuccess(fetchedPosts.data[queryName]!.items as Entity[]);
      onSuccessFullQuery && onSuccessFullQuery(fetchedPosts.data);
    })();
  }, deps || []);
}

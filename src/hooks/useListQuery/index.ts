import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";

/**
 * accepts optional callbacks and returns states
 */

export function useListQuery<Entity>(
  query: string,
  callbacks?: Partial<QueryCallbacks<Entity>>,
  deps?: React.DependencyList
): QueryHookResponse<Entity> {
  const { onEmpty, onSuccess, onFailure, onLoadFinished } = callbacks || {};

  const [loading, setLoading] = useState<boolean>(true);

  const [response, setResponse] = useState<Pick<
    QueryHookResponse<Entity>,
    "items" | "meta" | "error"
  > | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedPosts = (await API.graphql(graphqlOperation(query))) as {
          data: ListQueryType<Entity>;
        };

        if (!fetchedPosts || !fetchedPosts.data) throw new Error("no data");

        //I should check if this is always true
        const queryName = Object.keys(fetchedPosts.data)[0];

        if (!("items" in fetchedPosts.data[queryName]!)) {
          onEmpty && onEmpty();
          setResponse({ ...response, items: [], meta: null });
          return;
        }

        const items = fetchedPosts.data[queryName]!.items as Entity[];

        const { __typename, nextToken } = fetchedPosts.data[queryName]!;

        console.log(fetchedPosts.data);

        const meta = { __typename, nextToken };

        onSuccess && onSuccess({ items, meta });

        setResponse({ items, meta });
      } catch {
        onFailure && onFailure();
        setResponse({
          error: "unhandled exception in useListQuery",
        });
      } finally {
        onLoadFinished && onLoadFinished();
        setLoading(false);
      }
    })();
  }, deps || []);

  return { ...response, loading };
}

import { rejects } from "assert";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { clog } from "helpers";
import { useEffect, useState } from "react";

export function useListQuery<Entity>(
  query: string,
  config?: QueryHookConfig<Entity>
): QueryHookResponse<Entity> {
  const [hookResponse, setResponse] = useState<QueryHookResponse<Entity>>({
    loading: true,
    error: "",
    items: [],
  });

  useEffect(() => {
    (async () => {
      let response = hookResponse;
      try {
        const fetchedPosts = (await API.graphql(graphqlOperation(query))) as {
          data: ListQueryType<Entity>;
        };

        clog(fetchedPosts, config?.logging);

        if (!fetchedPosts || !fetchedPosts.data) throw new Error("no data");

        //I should check if this is always true
        const queryName = Object.keys(fetchedPosts.data)[0];

        if (!("items" in fetchedPosts.data[queryName]!)) {
          response = { ...response, items: [] };
          return;
        }

        const items = fetchedPosts.data[queryName]!.items as Entity[];

        response = { ...response, items };

        //change graphql field from s3 file dir to s3 link
        if (config?.s3Dirs) {
          const itemsStorageResolved: Promise<Entity>[] = items.map(
            (item) =>
              new Promise((resolve) => {
                Promise.all(
                  config!
                    .s3Dirs!.filter((dir) => Boolean(item[dir]))
                    .map(
                      (key) =>
                        new Promise((resolve) => {
                          const dir = item[key] as unknown as string;
                          Storage.get(dir).then((value) =>
                            resolve([key, value])
                          );
                        })
                    )
                ).then((keyValuePairs: any) =>
                  resolve({ ...item, ...Object.fromEntries(keyValuePairs) })
                );
              })
          );
          const resolved = await Promise.all(itemsStorageResolved);
          response = { ...response, items: resolved };
        }
      } catch (err) {
        response = {
          ...response,
          items: [],
          error: "unhandled exception in useListQuery",
        };
        clog(err, config?.logging);
      } finally {
        clog(response, config?.logging);
        setResponse({ ...response, loading: false });
      }
    })();
  }, config?.deps || []);

  return hookResponse;
}

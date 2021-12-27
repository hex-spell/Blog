import { API, graphqlOperation, Storage } from "aws-amplify";
import { clog } from "helpers";
import { useEffect, useState } from "react";

async function resolveStorage<Entity>(
  items: Entity[],
  fields: (keyof Entity)[]
): Promise<Entity[]> {
  const promises = items.map(
    (item) =>
      new Promise((resolve) => {
        Promise.all(
          fields
            .filter((dir) => Boolean(item[dir]))
            .map(
              (key) =>
                new Promise((resolve) => {
                  const dir = item[key] as unknown as string;
                  Storage.get(dir).then((value) => resolve([key, value]));
                })
            )
        ).then((keyValuePairs: any) =>
          resolve({ ...item, ...Object.fromEntries(keyValuePairs) } as Entity)
        );
      })
  );
  return (await Promise.all(promises)) as Entity[];
}

export function useListQuery<Entity>(
  query: string,
  config?: QueryHookConfig<Entity>
): QueryHookResponse<Entity> {
  const [hookResponse, setResponse] = useState<QueryHookResponse<Entity>>({
    loading: true,
    error: "",
    items: [],
  });

  const { deps, logging, s3Dirs, nextToken } = config!;

  useEffect(() => {
    (async () => {
      let response = hookResponse;
      try {
        const fetchedPosts = (await API.graphql(graphqlOperation(query))) as {
          data: ListQueryType<Entity>;
        };

        clog(fetchedPosts, logging);

        if (!fetchedPosts || !fetchedPosts.data) throw new Error("no data");

        //I should check if this is always true
        const queryName = Object.keys(fetchedPosts.data)[0];

        if (!("items" in fetchedPosts.data[queryName]!)) {
          response = { ...response, items: [] };
          return;
        }

        const items = fetchedPosts.data[queryName]!.items as Entity[];

        response = { ...response, items };

        if (typeof nextToken !== "undefined") {
          response = { ...response, nextToken: fetchedPosts.data.nextToken };
        }
        //change graphql field from s3 file dir to s3 link
        if (s3Dirs) {
          response = {
            ...response,
            items: await resolveStorage(items, s3Dirs),
          };
        }
      } catch (err) {
        response = {
          ...response,
          items: [],
          error: "unhandled exception in useListQuery",
        };
        clog(err, logging);
      } finally {
        clog(response, logging);
        setResponse({ ...response, loading: false });
      }
    })();
  }, [query]);

  return hookResponse;
}

interface ListQueryResponse<Entity> extends ListQueryMetadata {
  items?: Array<Entity | null>;
}

interface ListQueryType<Entity> {
  [key: string]: ListQueryResponse<Entity> | null | undefined;
}

interface QueryHookResponse<Entity> {
  error?: string | null;
  loading: boolean;
  items?: Entity[] | null;
}

interface QueryHookConfig<Entity> {
  logging?: boolean;
  deps?: React.DependencyList;
  s3Dirs?: (keyof Entity)[];
}

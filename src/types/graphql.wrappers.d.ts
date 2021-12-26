interface ListQueryResponse<Entity> extends ListQueryMetadata {
  items?: Array<Entity | null>;
}

interface ListQueryType<Entity> {
  [key: string]: ListQueryResponse<Entity> | null | undefined;
  nextToken?: string | null;
}

interface QueryHookResponse<Entity> {
  error?: string | null;
  loading: boolean;
  items?: Entity[] | null;
  nextToken?: string | null;
}

interface QueryHookConfig<Entity> {
  logging?: boolean;
  deps?: [];
  s3Dirs?: (keyof Entity)[];
  nextToken?: boolean;
}

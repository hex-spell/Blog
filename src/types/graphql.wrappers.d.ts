interface ListQueryMetadata {
  __typename: string;
  nextToken?: string | null;
}

interface ListQueryResponse<Entity> extends ListQueryMetadata {
  items?: Array<Entity | null>;
}

interface ListQueryType<Entity> {
  [key: string]: ListQueryResponse<Entity> | null | undefined;
}

interface QueryCallbacks<Entity> {
  onSuccess?: (response: { items: Entity[]; meta: ListQueryMetadata }) => void;
  onEmpty?: () => void;
  //TODO: implement more data usage on failure failure
  onFailure?: () => void;
  onLoadFinished?: () => void;
}

interface QueryHookResponse<Entity> {
  error?: string | null;
  loading: boolean;
  items?: Entity[] | null;
  meta?: ListQueryMetadata | null;
}

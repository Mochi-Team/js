export type PagingID = string;

export type Paging<T> = {
  id: PagingID;
  previousPage?: PagingID;
  nextPage?: PagingID;
  items: T[];
};

/**
 * A fetchable playlist
 *
 * @remarks
 * This type is used as away for it to retrieve all paging contents in another request.
 * If the {@link items} property is undefined, then it notifies the system that there
 * needs to be a paging request to retrieve the items.
 */
export type FetchedPaging<T> = {
  id: PagingID;
  previousPage?: PagingID;
  nextPage?: PagingID;
  displayName?: string;
  items?: T[];
};

// type Fetched<T> = T | undefined

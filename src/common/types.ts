export type PagingID = string;

/**
 * A paging
 *
 * @remarks
 * This type is used as away for it to retrieve all paging contents in another request.
 * If the {@link items} property is `undefined/null`, then it notifies the system that there
 * needs to be a paging request to retrieve the items.
 *
 * By returning an empty array, it means there is no items available.
 */
export type Paging<T> = {
  id: PagingID;
  previousPage?: PagingID;
  nextPage?: PagingID;
  title?: string;
  items: T[];
};

/**
 * A fetchable paging
 *
 * @remarks
 * This type is used as away for it to retrieve all paging contents in another request.
 *
 * It is recommended to return a paging whenever possible so the user has a choice to skip to a certain pagination.
 *
 * If the {@link items} property is `undefined/null`, then it notifies the system that there
 * needs to be a paging request to retrieve the items.
 *
 * By returning an empty array, it means there is no items available.
 */
export type FetchedPaging<T> = {
  id: PagingID;
  previousPage?: PagingID;
  nextPage?: PagingID;
  title?: string;
  items?: T[];
};

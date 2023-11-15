import { FetchedPaging, Paging, PagingID } from '../../common/types';

export type RepoMetadata = {
  name: string;
  author: string;
  description?: string;
  icon?: string;
};

type SearchFilterID = string;

export type SearchFilter = {
  id: SearchFilterID;
  displayName: string;
  multiselect: boolean;
  required: boolean;
  options: SearchFilterOption[];
};

type SearchFilterOptionID = string;

export type SearchFilterOption = {
  id: SearchFilterOptionID;
  displayName: string;
};

export type SearchQuery = {
  query: string;
  page?: PagingID;
  filters: SearchQueryFilter[];
};

export type SearchQueryFilter = {
  id: SearchFilterID;
  optionIds: [SearchFilterOptionID];
};

type DiscoverListingID = string;

export type DiscoverListing = {
  id: DiscoverListingID;
  title: string;
  type: DiscoverListingType;
  orientation: DiscoverListingOrientationType;
  paging: Paging<Playlist>;
};

export enum DiscoverListingType {
  default,
  rank,
  featured,
}

export enum DiscoverListingOrientationType {
  portrait,
  landscape,
}

export type DiscoverListingsRequest = {
  listingId: DiscoverListingID;
  page: PagingID;
};

export type PlaylistID = string;

export type Playlist = {
  id: PlaylistID;
  title?: string;
  posterImage?: string;
  bannerImage?: string;
  url: string;
  status: PlaylistStatus;
  type: PlaylistType;
};

export enum PlaylistStatus {
  unknown,
  upcoming,
  ongoing,
  completed,
  paused,
  cancelled,
}

export enum PlaylistType {
  video,
  image,
  text,
}

export type PlaylistDetails = {
  synopsis?: string;
  altTitles: string[];
  altPosters: string[];
  altBanners: string[];
  genres: string[];
  yearReleased?: number;
  ratings?: number;
  previews: PlaylistPreview[];
  // TODO: allow adding content support in one request
};

export type PlaylistPreview = {
  title?: string;
  description?: string;
  thumbnail?: string;
  link: string;
  type: PlaylistPreviewType;
};

export enum PlaylistPreviewType {
  video,
  image,
}

type PlaylistItemID = string;

export type PlaylistItem = {
  /**
   * The unique identifier for this item.
   */
  id: PlaylistItemID;

  /**
   * The title for this item.
   *
   * @remarks
   * If left undefined, the number will be used and based on the content type it will rename to:
   * - Video: Episode {@link PlaylistItem.number}
   * - Text & Image: Chapter {@link PlaylistItem.number}
   */
  title?: string;

  /**
   * An optional description for this content.
   */
  description?: string;

  /**
   * An optional thumnail
   *
   * @remarks
   * Must be a valid string-url.
   */
  thumbnail?: string;

  /**
   * The item number
   *
   * @remarks
   * For video content, this is usually referred as the episode number.
   * For books this is refered to as chapter number.
   */
  number: number;

  /**
   * The date this item was released.
   */
  timestamp?: Date;

  /**
   * Any additional tags.
   */
  tags: string[];

  /**
   * The variant type of this item.
   *
   * @remarks
   * Some sources may contain various Playlist items with the same item number, but
   * are distinguished by the variant type. For books, this could be used as way to distinguish
   * other languages.
   *
   * For videos, this could be used as a way to choose different languages.
   */
  variant: PlaylistItemVariant;
};

export type PlaylistItemVariant = {
  /**
   * An identifier for this variant.
   */
  id: string;

  /**
   * The display title for this variant.
   */
  title: string;
};

export type PlaylistGroupID = string;

export type PlaylistItemsOptions =
  | PlaylistItemsOptionFetchGroup
  | PlaylistItemsOptionFetchPage;

/**
 * Fetch group and its pagings.
 *
 * @remarks
 * This must return a {@link PlaylistItemsResponseGroups} type or it will throw an error.
 */
export type PlaylistItemsOptionFetchGroup = {
  type: 'group';
  groupId: PlaylistGroupID;
};

/**
 * Fetch paging items from its specific group.
 *
 * @remarks
 * This must return a {@link PlaylistItemsResponsePagings} type or it will throw an error.
 */
export type PlaylistItemsOptionFetchPage = {
  type: 'page';
  groupId: PlaylistGroupID;
  pageId: PagingID;
};

export type PlaylistItemsResponse =
  | PlaylistItemsResponseGroups
  | PlaylistItemsResponsePagings;

export type PlaylistItemsResponseGroups = {
  type: 'groups';

  /**
   * All groups available for a playlist in ascending order.
   *
   * @remarks
   * It should always returns all available groups regardless if it's able to fetch all pagings.
   * This allows the user to choose which pagings it should load for the group.
   */
  items: PlaylistGroup[];
};

export type PlaylistItemsResponsePagings = {
  type: 'pagings';

  /**
   * All {@link PlaylistItem | PlaylistItems} pagings for a specified group.
   *
   * @see {@link PlaylistGroup.pagings}
   */
  items: Paging<PlaylistItem>[];
};

export type PlaylistGroup = {
  /**
   * The id for this group
   */
  id: PlaylistGroupID;

  /**
   * The group number.
   *
   * @remarks
   * This should be the number that comes after "Season {number}" or "Volume {number}". If {@link altTitle} is defined,
   * then it will use that instead.
   */
  number: number;

  /**
   * An alternative title for the group
   *
   * @remarks
   * This displays the title for this group, e.g. Season X, or Volume X.
   *
   * If `null`, it will use the {@link PlaylistGroup.number}.
   */
  altTitle?: string;

  /**
   * An array of all pagings available for {@link PlaylistItem | PlaylistItems}. Must be in ascending order.
   *
   * @remarks
   * Some sources may only allow retrieving content one page at a time, so having pagination helps with
   * requests.
   *
   * If {@link pagings} is null, then it assumes that it will require another request to retrieve contents.
   *
   * Setting an empty array assumes there's no items available for this group.
   */
  pagings?: FetchedPaging<PlaylistItem>[];
};

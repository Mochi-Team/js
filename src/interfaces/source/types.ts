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
};

export type PlaylistGroupID = string;

export type PlaylistItemsOptions =
  | PlaylistItemsOptionFetchGroup
  | PlaylistItemsOptionFetchPage;

/**
 * Fetch group and its pagings with variant type.
 */
export type PlaylistItemsOptionFetchGroup = {
  type: 'group';
  groupId: PlaylistGroupID;
};

/**
 * Fetch variant's pagings from the specific group and variant.
 */
export type PlaylistItemsOptionFetchVariant = {
  type: 'variant';
  groupId: PlaylistGroupID;
  variantId: PlaylistGroupVariantID;
};

/**
 * Fetch paging items from its specific group, variant and page.
 */
export type PlaylistItemsOptionFetchPage = {
  type: 'page';
  groupId: PlaylistGroupID;
  variantId: PlaylistGroupVariantID;
  pageId: PagingID;
};

export type PlaylistItemsResponse = PlaylistGroup[];

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
   * All available variants from this group.
   *
   * @remarks
   * Some sources may contain various Playlist items with the same item number, but
   * are distinguished by the variant type. This could be used as way to distinguish
   * other languages, and it could also distinguish {@link PlaylistItem} from other sources.
   *
   * You should always return all variants available. If the content requires a new request to fetch
   * the variants, set null as the value for {@link PlaylistGroupVariant.pagings}.
   *
   * By specifying null/undefined, it means that it requires a new request to retrive contents.
   *
   * If it is initialized but no variants are provided, it is assumed that there is no contents for this group.
   */
  variants?: PlaylistGroupVariant[];
};

export type PlaylistGroupVariantID = string;

export type PlaylistGroupVariant = {
  /**
   * An identifier for this variant.
   */
  id: PlaylistGroupVariantID;

  /**
   * The display title for this variant.
   */
  title: string;

  /**
   * All available pagings for this variant.
   *
   * @remarks
   * Some sources may require a new request to retrieve all pagings for this variant. By setting `undefined/null`,
   * it means it requires a new request to fetch these contents.
   *
   * If it returns an empty array, it signifies there is no content available for this playlist.
   *
   * @see {@link FetchedPaging}
   */
  pagings?: FetchedPaging<PlaylistItem>[];
};

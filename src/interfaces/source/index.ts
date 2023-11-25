export * from './types';

import { Paging } from '../../common/types';
import {
  SearchFilter,
  SearchQuery,
  Playlist,
  DiscoverListing,
  PlaylistDetails,
  DiscoverListingsRequest,
  PlaylistID,
} from './types';

/**
 * The entry point to developing a Source Module.
 *
 * @remarks
 * A meta module may implement one or many of the content interface.
 *
 * @public
 */
export abstract class SourceModule {
  /**
   * The metadata for this module
   */
  abstract readonly metadata: {
    /**
     * An optional unique identifier.
     *
     * @remarks
     * By default, this identifier is generated automatically based on the {@link SourceModule.metadata | name}
     * property. If you change your display name, it is recommended to also set a stable identifier
     * to avoid unmached modules.
     */
    readonly id?: string;

    /**
     * The display name of this module
     */
    readonly name: string;

    /**
     * A description of this module.
     */
    readonly description?: string;

    /**
     * The icon of this module.
     *
     * @remarks
     * This must be a valid remote url or a file location relative to '/res/'
     */
    readonly icon?: string;

    /**
     * The version of the module.
     *
     * @remarks
     * The version must follow SemVer 2.0 specifications.
     */
    readonly version: string;
  };

  /**
   * Retrieves search filters used for a seach query.
   *
   * @returns The search filters available for this module.
   */
  abstract searchFilters(): Promise<SearchFilter[]>;

  /**
   * Searches for playlists based on the given query.
   *
   * @param query - A search query
   * @returns A pagination with playlist items.
   */
  abstract search(query: SearchQuery): Promise<Paging<Playlist>>;

  /**
   * Retrieves discover listings from the module.
   *
   * @remarks
   * This method, by default, should return all available discover listings.
   * If a request is provided, then it must return the specified listing in the array.
   *
   * @param request - the request.
   * @returns An array of discover listings.
   */
  abstract discoverListings(
    request?: DiscoverListingsRequest
  ): Promise<DiscoverListing[]>;

  /**
   * Retrieves a playlist details based on the playlist id.
   *
   * @param id - The playlist id.
   * @returns The playlist details for this module.
   */
  abstract playlistDetails(id: PlaylistID): Promise<PlaylistDetails>;
}

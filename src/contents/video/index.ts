export * from './types';

import {
  PlaylistID,
  PlaylistItemsOptions,
  PlaylistItemsResponse,
} from '../../interfaces/source/types';
import {
  PlaylistEpisodeSourcesRequest,
  PlaylistEpisodeSource,
  PlaylistEpisodeServerRequest,
  PlaylistEpisodeServerResponse,
} from './types';

/**
 * This interface allows retrieving video content from a playlist.
 */
export type VideoContent = {
  /**
   * Retrieve playlist items.
   *
   * @remarks
   * For a video playlist, the playlist items would be episodes/videos. Each response contains groups,
   * and each group can contain zero to many variations of playlist items.
   *
   * @param playlistId - The playlist id
   * @param options - The options for retrieving content. If `undefined`, then it must return a {@link PlaylistItemsResponseGroups} type
   * with all available groups.
   */
  playlistEpisodes(
    playlistId: PlaylistID,
    options?: PlaylistItemsOptions
  ): Promise<PlaylistItemsResponse>;

  /**
   * Retrieves an episode's available sources and servers.
   *
   * @param req
   */
  playlistEpisodeSources(
    req: PlaylistEpisodeSourcesRequest
  ): Promise<PlaylistEpisodeSource[]>;

  /**
   * Retrieves server's information.
   *
   * @param req
   */
  playlistEpisodeServer(
    req: PlaylistEpisodeServerRequest
  ): Promise<PlaylistEpisodeServerResponse>;
};

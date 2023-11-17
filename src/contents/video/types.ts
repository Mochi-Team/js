export type PlaylistEpisodeSourcesRequest = {
  playlistId: string;
  episodeId: string;
};

export type PlaylistEpisodeSource = {
  id: string;
  displayName: string;
  description?: string;
  servers: PlaylistEpisodeServer[];
};

export type PlaylistEpisodeServer = {
  id: string;
  displayName: string;
  description?: string;
};

export type PlaylistEpisodeServerRequest = {
  playlistId: string;
  episodeId: string;
  sourceId: string;
  serverId: string;
};

export type PlaylistEpisodeServerResponse = {
  links: PlaylistEpisodeServerLink[];
  subtitles: PlaylistEpisodeServerSubtitle[];
  skipTimes: PlaylistEpisodeServerSkipTime[];
  headers: Record<string, string>;
};

export type PlaylistEpisodeServerLink = {
  url: string;
  quality: PlaylistEpisodeServerQualityType;
  format: PlaylistEpisodeServerFormatType;
};

export enum PlaylistEpisodeServerQualityType {
  auto,
  q360p,
  q480p,
  q720p,
  q1080p,
}

export enum PlaylistEpisodeServerFormatType {
  hsl,
  dash,
}

export type PlaylistEpisodeServerSubtitle = {
  url: string;
  name: string;
  format: PlaylistEpisodeServerSubtitleFormat;
  default: boolean;
  autoselect: boolean;
};

export enum PlaylistEpisodeServerSubtitleFormat {
  vtt,
  ass,
  srt,
}

export type PlaylistEpisodeServerSkipTime = {
  startTime: number;
  endTime: number;
  type: PlaylistEpisodeServerSkipType;
};

export enum PlaylistEpisodeServerSkipType {
  opening,
  ending,
  recap,
}

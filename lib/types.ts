export interface Drama {
  id: string;
  title: string;
  poster: string;
  badge?: string;
  rating?: string;
  views?: string;
}

export interface DramaDetail extends Drama {
  synopsis?: string;
  genres?: string[];
  totalEpisodes?: number;
}

export interface Episode {
  id: string;
  episode: number;
  title?: string;
}

export interface StreamInfo {
  url: string;
  type?: string;
}

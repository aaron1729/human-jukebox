export {};

declare global {

  type Song = {
    album_name: string,
    artist: string,
    displayed: boolean,
    familiarity: number | null,
    name: string,
    popularity: number,
    preview_url: string,
    spotify_id: string,
    repertoire_index?: number
  }

  type Playlist = {
    playlistName: string,
    playlistSpotifyId: string,
    playlistSpotifyUrl: string
  }
  
    // in comparison with privateMusicianInfo, this is (purposely) missing: access, handle, and spotify_id
    type Update = {
        bio?: string
        display_name?: string,
        instagram?: string,
        instagram_show?: boolean,
        spotify_playlist_id?: string,
        spotify_playlist_name?: string,
        spotify_playlist_url?: string,
        venmo?: string,
        venmo_show?: boolean,
        handle?: string,
        email?: string,
      };

    type PublicMusicianInfo = {
      handle: string,
      bio?: string,
      display_name?: string,
      instagram_show?: boolean,
      instagram?: string,
      venmo_show?: boolean,
      venmo?: string,
      spotify_playlist_id?: string,
      spotify_playlist_name?: string,
      spotify_playlist_url?: string,
      loading?: boolean
    };

    // for musician private page; this is a subset of the keys in an object of type Update
    type SmallTextField = 'display_name' | 'instagram' | 'venmo' | 'handle' | 'email';
    type LargeTextField = 'bio'

}